const mongodb = require('mongodb')
const async = require('async')

const dataFile = require('./customer-data.json')
const addrFile = require('./address-data.json')

const url = 'mongodb://localhost:27017'
const dbName = 'migration-db'

const __createTasks = (db, count) => (
    __getTaskData(count).map(taskData => done => {
        if (!taskData.length) {
            done(null)
        } else {
            db.collection('customers').insertMany(taskData, (error, result) => {
                if (error) done(error, null)
                else done(null, result)
            })
        }
    })
)

const __getTaskData = count => {
    if (isNaN(count)) {
        count = 100
        console.log(`You provide invalid count number. Data is copying by ${count} items per transaction`)
    } else {
        count = parseInt(count)
    }

    const tasksData = []

    while (dataFile.length) {
        const dataPart = dataFile.splice(0, count)
        const addrPart = addrFile.splice(0, count)

        tasksData.push(dataPart.map((item, index) => ({ ...item, ...addrPart[index] })))
    }

    return tasksData
}

mongodb.MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        async.parallel(
            __createTasks(client.db(dbName), process.argv[2]),
            (error, result) => {
                if (error) {
                    console.error(error)
                    process.exit(1)
                }

                client.close()
                console.log('Done!!!')
            }
        )
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })