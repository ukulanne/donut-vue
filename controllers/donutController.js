'use strict'

/* Time-stamp: <2022-12-31 00:29:10 anne> */

const sqlite3 = require ('sqlite3').verbose ()

const {stringJoin}  = require ('../lib/helper.js')

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
    //console.log ('Connected to the Dunkin database.')
  })
  
  let query = `select FirstName, LastName, DunkinId, DOB, DunkinBranch, SUM(AMOUNT) as TOTAL 
               from Employee, Payment, studentloan 
               where employee.eid = studentloan.holderid and studentloan.id= payment.destination
               group by dunkinid limit 300`
  
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
  console.log (req.query)
  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    //console.log ('Connected to the Dunkin database.')
  })

  let selected = req.query.selected
  let queryTail =  selected ? `AND paymentTS in (${stringJoin (selected)})` : ''
  
  let query = `select DunkinId, AccountNumber, ABARouting, SUM(Amount) as TOTAL  from Account, Payment 
                WHERE Account.Aid = Payment.source ` + queryTail  + ` GROUP BY DunkinId`
      
   db.all (query, [], (err, rows)=>{

    if (err){
      console.log (err)
      throw err
    }
   
     res.end (JSON.stringify ({rows}))

   })
}

exports.getBranchTotals = async (req, res, next) => {  

  console.log ('🍩 getBranchTotals')

  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    //console.log ('Connected to the Dunkin database.')
  })
  
  let query = `select branch, paymentTS as date, SUM(amount) as TOTAL
               from Payment group by branch`
  
   db.all (query, [], (err, rows)=>{

    if (err){
      console.log (err)
      throw err
    }
    
     res.end (JSON.stringify ({rows}))

   })
}


exports.getPayPeriods = async (req, res, next) => {  

  console.log ('🍩 getPayPeriods')

  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    //console.log ('Connected to the Dunkin database.')
  })
  
  let query = `select distinct paymentTS from Payment`
  
   db.all (query, [], (err, rows)=>{

    if (err){
      console.log (err)
      throw err
    }
    
     res.end (JSON.stringify ({rows}))

   })
}
  
  

  

