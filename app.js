    const express = require('express')
    const https = require('https')
    const bodyParser = require('body-parser')

    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))

    //Abrindo o servidor
    app.get("/" ,((req, res) => {

        res.sendFile(__dirname +'/index.html')
       
        }))
       
    app.post("/" ,((req, res) => {
             
        console.log('posted')
       
        const query = req.body.nomeCidade
        const key = '3c1ad84d85a76604f5c3bba12ccf8b15&units'
        const unidade = 'metric'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}=${unidade}`
        
        //Solicitando/GET a API
        https.get(url, (httpRes) => {

            //Pegando as informações da API
            httpRes.on('data', (data) => {
                
                //Passando as informações para JSON
                const dataClima = JSON.parse(data)

                console.log(dataClima)

                const temp = dataClima.main.temp
                            
                res.write(`<h1>A temperatura em ${query} é ${temp}<h1>`)
                res.write(`<h3>Clck here to see other cities temperature<h3>`)
                res.write(`<img src="http://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png" alt="">`)
                res.send()
            })

        })

    }))    

    app.listen(3000, (() => {

        console.log('Servidor Acessado')

    }))