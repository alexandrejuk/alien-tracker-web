## Currently we have the following data:

* https://github.com/black-atom/funcionario-microservice/blob/master/models/funcionario.js
* https://github.com/black-atom/atendimento-microservice/blob/master/models/atendimentos.js
* https://github.com/black-atom/log-microservice/blob/master/api/models/atividadeSchema.js

Funcionarios has many activities and one activity can belong to an atendimento

```js
const technician: {
  name: "Vitor",
  currentActivity: {
    status: [
      'PENDENTE',
      'PAUSE_ATIVIDADE',
      'INICIO_ATIVIDADE',
      'FIM_ATIVIDADE',
      'INICIO_DESLOCAMENTO',
      'FIM_DESLOCAMENTO',
      'CANCELA_ATIVIDADE'
    ],
    externalService: {
      client: {
        docum: 'dsadsadsa',
        name: 'Microsoft'
      }
      distance: '32 km'
    }
  }
}
```
