import fs from 'fs'

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

function writeFile(destination, source) {
    return new Promise((resolve, reject) => {
        fs.writeFile(destination, source, err => {
            if (err)
                reject(err)
            else
                resolve("written success")
        })
    })
}

export default { readFile, writeFile }