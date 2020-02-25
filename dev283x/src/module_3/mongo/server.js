const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')

const url = 'mongodb://localhost:27017/edx-course-db'
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

mongodb.MongoClient.connect(url, (error, db) => {
    if (error) process.exit(1)

    app.get('/accounts', (req, res) => {
        db.collection('accounts')
            .find({}, { sort: { _id: -1 } })
            .toArray((error, accounts) => {
                if (error) next(error)
                res.send(accounts)
            })
    })

    app.post('/accounts', (req, res) => {
        const account = req.body
        db.collection('accounts')
            .insers(account, (error, result) => {
                if (error) next(error)
                res.send(result)
            })
    })

    app.put('/accounts/:id', (req, res) => {
        db.collection('accounts')
            .update(
                { _id: mongodb.ObjectID(req.params.id) },
                { $set: req.body },
                (error, result) => {
                    if (error) next(error)
                    res.send(result)
                })
    })

    app.delete('/accounts/:id', (req, res) => {
        db.collection('accounts')
            .remove({ _id: mongodb.ObjectID(req.params.id) }, (error, result) => {
                if (error) next(error)
                res.send(result)
            })
    })

    app.listen(3000)
})