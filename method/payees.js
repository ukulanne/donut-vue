'use strict'

const clc = require ('cli-color')
const sqlite3 = require ('sqlite3').verbose ()

const {sleep} = require ('../lib/helper.js')

//const METHOD_LIMIT_CALL = 600
//const METHOD_LIMIT_TIME = 60000

const METHOD_LIMIT_CALL = 600
const METHOD_LIMIT_TIME = 5000

const {Method, Environments} = require ('method-node')

const method = new Method({
  apiKey: process.env.METHOD_API_KEY,
  env: Environments.dev,
})

exports.add = async (db, payees, merchantsMap, employeesMap, accountsMap) =>{
  let apiLimit = 0
  let el = payees.length

  console.log (payees [0])
  
  console.log ("💵Payee.js")
  
  for (let i = 0; i < el; i++){
    let panda='panda'
    if (apiLimit >= METHOD_LIMIT_CALL){
      console.log (clc.red (`[SLEEP] 💤 We have reached the API limit so we are waiting i=${i}...😴`))
      await Promise.all ([sleep (METHOD_LIMIT_TIME)])
      console.log ("[SLEEP] We can proceed")
      apiLimit = 0
      i--
    }

    else {
      //console.log ("[DB] Query and insert account if needed")
      let p = payees [i]
      //console.log (p)
      let mid = merchantsMap.get (p.Payee.PlaidId)
      let hid = employeesMap.get (p.DunkinId)
      let an  = p.Payee.LoanAccountNumber
      let amount = p.Amount.replace (/\$/g, '')
      let payorId = accountsMap.get (p.PayorId)
      let lid
      
      db.get ('select * from StudentLoan where accountNumber=? and merchantId=?',
              [an, mid], 
             async (err, row) => {
                if (err) {
                  console.error (err.message)
                  throw (err)
                }

                if (row){
                  //console.log (clc.blue (`Account with LoanAccountNumber ${an} already in DB`))
                  
                  //console.log ('row here') 
                  //console.log (row)
                  lid = row.id 
                 
                }
                else {
                  //console.log (clc.yellow (`Account with LoanAccountNumber ${an} not in DB`))

                  //Insert on method and then insert on our cache DB
                  // Escape strings for SQL using two quotes

                  //lid = `en-${uuidv4 ()}` //dummy for now. this should come from method  API
                  const account = await method.accounts.create ({
                    holder_id: hid,
                    liability: {
                      mch_id: mid,
                      number: an.toString ()
                    }
                  })

                  lid = account.id
                  
                  //console.log (`insert into StudentLoan VALUES ('${lid}', '${an}', '${hid}', '${mid}')`),
                  db.run (`insert into StudentLoan VALUES ('${lid}', '${an}', '${hid}', '${mid}')`,
                          (err, data) => {
                            
                            if (err){
                              console.log (err)
                              throw (err)
                              console.log ('panda')
                              console.log (data)
                              
                            }

                            //console.log (clc.green (`Row inserted with LoanAccountNumber ${an}`))
                                                        
                          })
                }
                
                //console.log (`Payment id: ${lid} holder_id ${hid} Account Number: ${an} merchantId${mid}`)
              //  let pyd = `py-${uuidv4 ()}` //dummy for now. this should come from method  API
               let payment = await method.payments.create({
                 amount: amount * 100,
                 source: payorId,
                 destination: lid,
                 description: 'Loan Pmt',
               })
               
                //start of isnert payment
                //console.log (`insert into Payment VALUES ('${payment.id}', '${payorId}', '${lid}', '${amount}')`)
                db.run (`insert into Payment VALUES ('${payment.id}', '${payorId}', '${lid}', ${amount})`,
                          (err, data) => {
                            
                            if (err){
                              console.log (err)
                              throw (err)
                            }

                            console.log (clc.blue ("[SMS] SMS text has been sent"))
                            

                
              })
                //enf of payment insert!!!
              })//db.get
     
     
      
     
    }//else
   
        
    apiLimit +=  2
  }
  return 
}
