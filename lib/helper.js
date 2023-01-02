'use strict'

/* Time-stamp: <2023-01-02 15:34:28 anne> */

exports.removeDups = (ls, key) =>{
  let uniqueIds = []

  let unique = ls.filter (element => {
    let isDuplicate = uniqueIds.includes (element [key])

    if (!isDuplicate) {
      uniqueIds.push (element [key])

      return true
    }

    return false
  })

  return unique
}

exports.sleep = ms => new Promise (r => setTimeout (r, ms))

exports.stringJoin = ls => {
    let str = ''

    ls.forEach (x => str+=`'${x}' ,`)
      
    return str.slice (0, -1)  
  }

const min2ms = m => m * 60000

exports.timer = (size, m) => {

  if (size <= m.METHOD_LIMIT_CALL)
    return m.METHOD_LIMIT_TIME * min2ms (3)
  else {
    let s = (size / m.METHOD_LIMIT_CALL).toFixed (2)
   
    return  (m.METHOD_LIMIT_TIME * s) + min2ms (3)
  }

}
