const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/books', require('./routes/books'))

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' })
})

app.get('/modules', (req, res) => {
    res.render('modules', { title: 'Modules' })
})

app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Example app listening on port ${ PORT }`)
})

