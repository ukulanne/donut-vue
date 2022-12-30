const sqlite3 = require ('sqlite3').verbose ()

const db = new sqlite3.Database ('dunkin.db', err => {
  if (err){ 
  console.error (err.message)
  }
  console.log ('Connected to the Dunkin database.')
})



db.run (`CREATE TABLE IF NOT EXISTS Employee(
    DunkinId  TEXT PRIMARY KEY, 
    Eid  TEXT,                 
    DunkinBranch TEXT,         
    FirstName TEXT,            
    LastName TEXT,           
    DOB TEXT,                
    PhoneNumber INTEGER)`, (err) => {
      if (err) {
        console.log (err)
        throw err
      }

      console.log ('Table Employee  was created')
      
    })


db.run (`CREATE TABLE IF NOT EXISTS Account(
    DunkinId  TEXT PRIMARY KEY, 
    Aid TEXT,
    HolderId TEXT,
    ABARouting TEXT,
    AccountNumber TEXT)`, (err) => {
      if (err) {
        console.log (err)
        throw err
      }

      console.log ('Table Account  was created')
      
    })

db.run (`CREATE TABLE IF NOT EXISTS Merchant(
         PlaidID TEXT PRIMARY KEY, merchantId TEXT)`,
        (err) => {
          if (err) {
            console.log (err)
            throw err
          }

          console.log ('Table Merchant  was created')
      
        })

db.run (`CREATE TABLE IF NOT EXISTS StudentLoan(
         id TEXT PRIMARY KEY,
         accountNumber TEXT,
         holderId TEXT,
         merchantId TEXT)`,
        (err) => {
          if (err) {
            console.log (err)
            throw err
          }

          console.log ('Table StudentLoan  was created')
      
        })
// Source and destination are ids from method
db.run (`CREATE TABLE IF NOT EXISTS Payment(
         id TEXT PRIMARY KEY, 
         source TEXT,
         destination TEXT,
         branch TEXT,
         amount NUMBER,
         paymentTS TEXT)`,
        (err) => {
          if (err) {
            console.log (err)
            throw err
          }

          console.log ('Table Payment was created')
      
        })


//INSERT INTO table_name VALUES (value1, value2, value3, ...);
/*
sql =   "insert into StudentLoan VALUES ('en-b7568c5f-62ab-493b-93de-278d95996b7e,
'4807469', 'en-9bb327cc-f03d-4752-81a6-a46e2683702c', 'mch_307596')"

sql2 = `insert into Employee VALUES ("EMP-1234", 'en-123456', 'BRC1234',
         'Kevin', 'Doyle', '1997-03-18', '+15121231111'`

db.run (sql,
        (err, data) => {
          
          if (err){
            console.log (err)
            throw (err)
          }

          console.log (data)
          
        })


        

*/
