const csv = require('csvtojson/v2')

export const readAsText = file => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = resolve
        fileReader.onerror = reject
        fileReader.readAsText(file)
    })
}

export const csvToJson = file => {
    return new Promise((resolve, reject) => {
        readAsText(file)
          .then(data => {
              csv()
                .fromString(data.target.result)
                .then(resolve)
                .catch(reject)
          }).catch(reject)
    })
}
