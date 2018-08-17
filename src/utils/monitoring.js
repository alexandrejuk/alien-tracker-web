import {
  map,
  prop,
  pipe,
  pathOr,
  path,
  assoc,
  assocPath,
  propEq,
  filter,
} from 'ramda'

import getDistance from '../helpers/getDistanceGeolocations'

const statuses = {
  PENDENTE: 'pendente',
  PAUSE_ATIVIDADE: 'pausado',
  INICIO_ATIVIDADE: 'execucao',
  FIM_ATIVIDADE: 'concluido',
  INICIO_DESLOCAMENTO: 'execucao',
  FIM_DESLOCAMENTO: 'execucao',
  CANCELA_ATIVIDADE: 'concluido',
  CRIAR_ATIVIDADE: 'execucao',
}

const getRefinedStatus = status => statuses[status]

const filterActivities = pipe(
  map((atividade) => {
    const newStatus = getRefinedStatus(atividade.status)
    return assoc('_filteredStatus', newStatus, atividade)
  }),
  filter(propEq('_filteredStatus', 'execucao'))
)

const getTechnicianClientLocation = path([
  'currentActivity',
  'externalService',
  'client',
  'location',
])

const addDistance = technicalWithDistance => technicalWithDistance
  .map((technician) => {
    const clientLocation = getTechnicianClientLocation(technician)
    const technicianLocation = path(['location'], technician)

    if (clientLocation && technicianLocation) {
      const { latitude: lat1, longitude: lon1 } = technicianLocation
      const [lat2, lon2] = clientLocation

      let distance = parseFloat(getDistance(lat1, lon1, lat2, lon2)).toFixed(2)

      if (distance > 1) {
        distance = `${distance}km`
      } else {
        distance = `${distance}m`
      }

      return assocPath(
        ['currentActivity', 'externalService', 'distance'],
        distance,
        technician
      )
    }

    return technician
  })

const getActivities = async (connectaAPI) => {
  const { atividades } = await connectaAPI.get(
    'monitoramentos',
    { params: { createdAt: new Date() } }
  )

  return filterActivities(atividades)
}

const matchActivityTechnical = (technicianId, activities) => activities
  .find(activity => activity.funcionario_id === technicianId) || {}

const addActivity = async (technical, connectaAPI) => {
  const activities = await getActivities(connectaAPI)

  return technical
    .map((technician) => {
      const {
        status = 'PENDENTE',
        atendimento_id = '', // eslint-disable-line
      } = matchActivityTechnical(technician.id, activities)

      return assoc(
        'currentActivity',
        {
          status,
          id: atendimento_id,
        },
        technician
      )
    })
}

const addCall = async (technical, connectaAPI) => {
  const { atendimentos } = await connectaAPI.get('atendimentos', {
    params: { data_atendimento: new Date() },
  })

  return technical.map((technician) => {
    const activityId = technician.currentActivity.id
    const currentAttendance = atendimentos.find(propEq('_id', activityId))

    return assocPath(
      ['currentActivity', 'externalService'],
      {
        client: {
          name: pathOr('Sem Cliente', ['cliente', 'nome_razao_social'], currentAttendance), // eslint-disable-line
          documentId: pathOr('', ['cliente', 'cnpj_cpf'], currentAttendance),
          location: path(['location', 'coordinates'], currentAttendance),
        },
        distance: '0m',
      },
      technician
    )
  })
}

const addLocation = async (technical, monitoringAPI) => {
  const locations = await monitoringAPI.get('locations')

  return technical.map(technician => ({
    ...technician,
    location: locations.find(propEq('tecnico_id', technician.id)),
  }))
}

const getMonitoringData = async (technician, connectaAPI, monitoringAPI) => {
  const technicalWithActivite = await addActivity(technician, connectaAPI)
  const technicalWithActiviteWithCall = await addCall(
    technicalWithActivite,
    connectaAPI
  )
  const technicalWithLocation = await addLocation(
    technicalWithActiviteWithCall,
    monitoringAPI
  )
  const technicalWithDistance = await addDistance(technicalWithLocation)

  const locations = technicalWithDistance.filter(prop('location'))

  return {
    locations,
    tecnicos: technicalWithDistance,
  }
}

export { getMonitoringData } // eslint-disable-line
