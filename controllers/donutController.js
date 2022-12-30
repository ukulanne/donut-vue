'use strict'

const sqlite3 = require ('sqlite3').verbose ()

exports.getChocoDonut = async (req, res, next) => {  

  console.log ('🍩')

  res.end (JSON.stringify ({status: "ok", donut: "🍩" }))
  
}


exports.getEmployees = async (req, res, next) => {  

  console.log ('🍩 Employees')

  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    console.log ('Connected to the Dunkin database.')
  })
  
  let query = 'select * from Employee LIMIT 200'
  
   db.all (query, [], (err, rows)=>{

    if (err){
      console.log (err)
      throw err
    }

     res.end (JSON.stringify ({rows}))

   })
}

exports.getAccountTotals = async (req, res, next) => {  

  console.log ('🍩 getAccountTotals')

  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    console.log ('Connected to the Dunkin database.')
  })
  
  let query = `select DunkinId, AccountNumber, ABARouting, SUM(Amount) as TOTAL  from Account, Payment 
                WHERE Account.DunkinId = Payment.source
                GROUP BY DunkinId`
  
   db.all (query, [], (err, rows)=>{

    if (err){
      console.log (err)
      throw err
    }
    
     res.end (JSON.stringify ({rows}))

   })
}
  
 
  

