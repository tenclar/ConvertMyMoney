const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const path = require('path')

const convert = require('./lib/convert')

const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.render('home')
})
app.get('/cotacao', (req, res) =>{
    const {cotacao, quantidade } = req.query
    const conversao =convert.convert(cotacao, quantidade)
    res.render('cotacao', {
        cotacao: convert.toMoney(cotacao),
        quantidade :convert.toMoney(quantidade),
        conversao: convert.toMoney(conversao)
    })
})


app.listen(port,(err) =>{

    if(err){
        console.log('Não Foi possivel iniciar o Servidor')
    }else {
        console.log('servidor Rodando')
    }
})