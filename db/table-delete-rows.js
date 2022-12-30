#!/usr/bin/node

const sqlite3 = require ('sqlite3').verbose ()

const db = new sqlite3.Database ('dunkin.db', err => {
  if (err){ 
  console.error (err.message)
  }
  console.log ('Connected to the Dunkin database.')
})



const queries = [{query: `delete from Employee`,    table: "Employees"},
                 {query: `delete from Account`,    table: 'Account'},
                 {query: `delete from Merchant`,    table: 'Merchant'},
                 {query: `delete from StudentLoan`, table: 'StudentLoan'},
                 {query: `delete from Payment`,     table: 'Payment'}]



queries.forEach (atom =>{
  db.run (atom.query, [], (err, rows)=>{
    
    if (err){
      console.log (err)
      throw err
    }

    console.log (`Table ${atom.table} is empty`)
    
    
  })
})
                                  
