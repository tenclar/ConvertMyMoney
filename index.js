const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/bcb')
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async(req, res) =>{

    const cotacao = await apiBCB.getCotacao()

    res.render('home', {
        cotacao
    })
})
app.get('/cotacao', (req, res) =>{
    const {cotacao, quantidade } = req.query
    
    if(cotacao && quantidade) {
        const conversao =convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade :convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else{
        res.render('cotacao', {
            error: 'Valores Inválidos'
        })
    }
})


app.listen(port,(err) =>{

    if(err){
        console.log('Não Foi possivel iniciar o Servidor')
    }else {
        console.log('servidor Rodando')
    }
})