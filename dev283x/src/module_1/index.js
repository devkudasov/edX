const http = require('http')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')

const downloadPage = (url = 'http://nodeprogram.com') => {
    const fetch = (url, callback) => {
        http.get(url, response => {
            let buff = ''

            response.on('data', data => buff += data)
            response.on('end', () => callback(null, buff))
        }).on('error', callback)
    }

    const folderName = uuid()
    fs.mkdirSync(path.join(__dirname, folderName))

    fetch(url, (err, data) => {
        if (err) return console.error(err)

        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)

        console.log('Downloading is done in folder ', folderName)
    })
}

downloadPage(process.argv[2])