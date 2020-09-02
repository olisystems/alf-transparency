// unix time conversion
const convertUnix = (UNIX_timestamp) => {
  let newDate = new Date(UNIX_timestamp * 1000)
  let year = newDate.getFullYear()
  let month = ('0' + (newDate.getMonth() + 1)).slice(-2)
  let date = ('0' + newDate.getDate()).slice(-2)
  let hour = ('0' + newDate.getHours()).slice(-2)
  let min = ('0' + newDate.getMinutes()).slice(-2)
  let sec = ('0' + newDate.getSeconds()).slice(-2)
  let parsingTime =
    date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec
  return parsingTime
}

export default convertUnix
