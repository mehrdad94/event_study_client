export const isObjectEmpty = obj => {
  for (let key in obj) {
    if(obj.hasOwnProperty(key))return false
  }
  return true
}

export const downloadJsonText = (filename, data) => {
  const blob = new Blob([data], { type: 'application/json' })

  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename)
  }
  else{
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = filename
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}
