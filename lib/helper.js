"use strict"

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
