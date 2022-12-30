'use strict'

const clc     = require ('cli-color')
const fs      = require ('fs')
const sqlite3 = require ('sqlite3').verbose ()

const METHOD_API_CONST = require ('../method/methodApiConstants')

const METHOD_LIMIT_CALL = METHOD_API_CONST.METHOD_LIMIT_CALL
const METHOD_LIMIT_TIME = METHOD_API_CONST.METHOD_LIMIT_TIME


const account   = require ('../method/account') 
const employee  = require ('../method/employee.js') 
const merchants = require ('../method/merchants') 
const payees    = require ('../method/payees.js') 


const {removeDups, sleep} = require ('../lib/helper.js')

const {XMLParser} = require ('fast-xml-parser')
const options = { ignoreAttributes : false}
const parser  = new XMLParser (options)

const {Method, Environments} = require ('method-node')

const method = new Method({
  apiKey: process.env.METHOD_API_KEY,
  env: Environments.dev,
})


exports.getMethodReport = async (req, res, next) => {  

  let type = req.query.reportType
  
  console.log (`🍩 Get Method Reports ${type}`)
          
  let report = await method.reports.create ({ type: type })
      .then (async report => res.end (JSON.stringify (await method.reports.download (report.id))))
   
}

exports.saveXml =  (req, res, next) => {

  let str = req.file.buffer.toString ('utf8')

  console.log ('🍩 Downloading XML file...')
  console.log (str.substring (0, 20))
  
  fs.writeFileSync ('controllers/dunkin.xml', str)

  let jsonObj = parser.parse (str)
  let rows = jsonObj.root.row

  let allEmployees = rows.map (({ Employee }) => Employee)
  let employees = removeDups (allEmployees, 'DunkinId')
  let el = employees.length
  let allPayors = rows.map (({Payor}) => Payor)
  let payors = removeDups (allPayors, 'DunkinId')
  let allPlaids = rows.map (({Payee}) => Payee)
  let plaidIds = removeDups (allPlaids, 'PlaidId')
  
  console.log (`Payment Rows: ${rows.length}`)
  console.log (`Unique Employees: ${el}`)
  console.log (`Unique Payors: ${payors.length}`) 
  console.log (`Unique Merchants: ${plaidIds.length}`)
  
  res.end (JSON.stringify ({
    paymentRows: rows.length,
    employees: el,
    payors: payors.length,
    merchants: plaidIds.length
  }))
    

}

exports.makePayments = async (req, res, next) => {
  const db = new sqlite3.Database ('db/dunkin.db', err => {
    if (err){
      console.error (err.message)
    }
    console.log ('Connected to the Dunkin database.')
  })
  
  fs.readFile ('controllers/dunkin.xml', 'utf8',  async (err, data) =>{
    if (err) {
      return console.log (err)
    }

    res.end (JSON.stringify ({status: "ok", donut: "🍩" }))
    
    console.log ("🍩   Parsing XML...")
    
    let jsonObj = parser.parse (data)
    //let rows = jsonObj.root.row
    let rows = jsonObj.root.row.slice (0, 100)

    //console.log (rows.length)
   //console.log (rows [0])
  
    let allPayors = rows.map (({Payor}) => Payor)
    let payors = removeDups (allPayors, 'DunkinId')
  
    let accountsMap =  await account.add (db, payors)
    
   
    await Promise.all ([sleep (METHOD_LIMIT_TIME * 1)])
    console.log (`💰 Number of Dunkin Checking accounts ${accountsMap.size} 💰`) //we cache the accounts to speed things up
    
    let allEmployees = rows.map (({ Employee }) => Employee)
    let employees = removeDups (allEmployees, 'DunkinId')
    let el = employees.length

    let allPlaids = rows.map (({Payee}) => Payee)
    let allPayees = rows.map (i => {return {DunkinId: i.Employee.DunkinId,
                                            BranchId: i.Employee.DunkinBranch,
                                            Payee: i.Payee,
                                            PayorId: i.Payor.DunkinId,
                                            Amount: i.Amount}})
    let plaidIds = removeDups (allPlaids, 'PlaidId')
    let studentLoans = removeDups (allPayees, 'LoanAccountNumber')

    //console.log (allPayees [0])
    
    let merchantsMap = await merchants.add (db, plaidIds)

    //we cache merchants to speed things up
    
    await Promise.all ([sleep (METHOD_LIMIT_TIME * 2)])

    console.log (merchantsMap)
    
    let employeesMap = await employee.add (db, employees)

                        //await Promise.all ([sleep (60000 * 3)])
   // await Promise.all ([sleep (METHOD_LIMIT_TIME * 3)])
    await Promise.all ([sleep (METHOD_LIMIT_TIME)])

    console.log (`😁 Employees ${employeesMap.size} 😁`)
    
    await payees.add (db, allPayees, merchantsMap, employeesMap, accountsMap)
  
   // await Promise.all ([sleep (60000 * 9)])
    //  await Promise.all ([sleep (METHOD_LIMIT_TIME * 5)])
    //  
    console.log (`Payment Rows: ${rows.length}`)
    console.log (`Unique Employees: ${el}`)
    console.log (`Unique Payors: ${payors.length}`) 
    console.log (`Unique Merchants: ${plaidIds.length}`)
    
 
  })
}
