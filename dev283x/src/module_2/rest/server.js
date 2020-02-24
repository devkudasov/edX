const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorhandler = require('errorhandler')

const store = {
    accounts: []
}

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

app.post('/accounts', (req, res) => {
    const account = {
        id: store.accounts.length + 1,
        ...req.body
    }

    store.accounts.push(account)

    res.status(201).send(store.accounts[store.accounts.length - 1])
})

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id - 1] = req.body
    res.status(200).send(store.accounts[req.params.id - 1])
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id - 1, 1)
    res.status(204).send()
})

app.listen(3333, () => console.log('Server started at http://localhost:3333'))