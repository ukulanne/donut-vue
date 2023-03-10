'use strict'

/* Time-stamp: <2023-01-02 09:55:39 anne> */

const clc = require ('cli-color')
const moment  =  require ('moment-timezone')
const sqlite3 = require ('sqlite3').verbose ()

const {sleep} = require ('../lib/helper.js')

const METHOD_API_CONST = require ('./methodApiConstants')

const METHOD_LIMIT_CALL = METHOD_API_CONST.METHOD_LIMIT_CALL
const METHOD_LIMIT_TIME = METHOD_API_CONST.METHOD_LIMIT_TIME


const {Method, Environments} = require ('method-node')

const method = new Method({
  apiKey: process.env.METHOD_API_KEY,
  env: Environments.dev,
})

exports.add = async (db, payees, merchantsMap, employeesMap, accountsMap) =>{
  let apiLimit = 0
  let el = payees.length
  let timestamp =  moment ().format ('YYYY-MM-DD')
  
  console.log ("💵Payee.js")
  
  for (let i = 0; i < el; i++){
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
      let mid = merchantsMap.get (p.Payee.PlaidId)
      let hid = employeesMap.get (p.DunkinId)
      let branchId = p.BranchId
      let an  = p.Payee.LoanAccountNumber
      let amount = parseFloat (p.Amount.replace (/\$/g, '')).toFixed (2)
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
                 
                  lid = row.id 
                 
                }
                else {
                  //console.log (clc.yellow (`Account with LoanAccountNumber ${an} not in DB`))

                  //Insert on method and then insert on our cache DB
                  // Escape strings for SQL using two quotes

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
                            }

                            //console.log (clc.green (`Row inserted with LoanAccountNumber ${an}`))
                                                        
                          })
                }
                
               try {
                 let payment = await method.payments.create ({
                   amount: Math.round (amount * 100),
                   source: payorId,
                   destination: lid,
                   description: 'Loan Pmt',
                 })
                 
                 db.run (`insert into Payment VALUES ('${payment.id}', '${payorId}', '${lid}', '${branchId}', ${amount}, '${timestamp}')`,
                         (err, data) => {
                           
                           if (err){
                             console.log (err)
                             throw (err)
                           }
                           
                           console.log (clc.blue ("[SMS] SMS text has been sent"))
                           
                           
                           
                         })
                 
                 
               }catch (error){
                 console.log (`payee.js method.payment.create `)
                 console.log (error)
               }
               
              })//db.get
   
    }//else
   
        
    apiLimit +=  2
  }

  console.log ('🍩 Payments done 🍩')
  
  return 
}
