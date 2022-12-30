#!/usr/bin/node

const sqlite3 = require ('sqlite3').verbose ()

const db = new sqlite3.Database ('dunkin.db', err => {
  if (err){ 
  console.error (err.message)
  }
  console.log ('Connected to the Dunkin database.')
})

const queries = [{query: `select count(*) from Employee`,    table: "Employees"},
                 {query: `select count (*) from Account`,    table: 'Account'},
                 {query: `select count(*) from Merchant`,    table: 'Merchant'},
                 {query: `select count(*) from StudentLoan`, table: 'StudentLoan'},
                 {query: `select count(*) from Payment`,     table: 'Payment'}]



queries.forEach (atom =>{
  db.all (atom.query, [], (err, rows)=>{
    
    if (err){
      console.log (err)
      throw err
    }
    
    rows.forEach (row => { 
      console.log (`Count on Table ${atom.table}`)
      console.log (row)
    })
    
  })
})
                                  
