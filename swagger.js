const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app/routes/blockchain.routes.ts']

const doc = {
    info: {
        version: "1.0.0",
        title: "Api Blockchain",
        description: "Documentação da Api Blockchain gerada automaticamente por swagger-autogen",
    },
    host: "localhost:3001",
    contact: {
        name: "Alexandre Loiola",
        url: "https://github.com/AlexandreLoiola",
        email: "alexandre.loiola.741@gmail.com"
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)