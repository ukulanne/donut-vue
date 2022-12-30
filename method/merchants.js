'use strict'

const clc = require ('cli-color')
const sqlite3 = require ('sqlite3').verbose ()

const {sleep} = require ('../lib/helper.js')

const METHOD_API_CONST = require ('./methodApiConstants')

const METHOD_LIMIT_CALL = METHOD_API_CONST.METHOD_LIMIT_CALL
const METHOD_LIMIT_TIME = METHOD_API_CONST.METHOD_LIMIT_TIME

const {Method, Environments} = require ('method-node')

const method = new Method ({
  apiKey: process.env.METHOD_API_KEY,
  env: Environments.dev,
})

exports.add = async (db, merchants) =>{
  let merchantsMap = new Map ()
  let apiLimit = 0
  let el = merchants.length
  console.log ("🍩 mwechant.js")
  
  for (let i = 0; i < el; i++){
    
    if (apiLimit >= METHOD_LIMIT_CALL){
      console.log (clc.red ("[SLEEP]  We have reached the API limit so we are waiting..."))
      await Promise.all ([sleep (METHOD_LIMIT_TIME)])
      console.log ("[SLEEP] We can proceed")
      apiLimit = 0
      i--
    }

    else {
      console.log ("[DB] Query and insert merchants if needed")
      let m = merchants [i]
      
      db.get ('select * from Merchant where PlaidId=?', [m.PlaidId],
              (err, row) => {
                if (err) {
                  console.error (err.message)
                  throw (err)
                }
                
                
                if (row){
                  console.log (clc.blue (`Merchant with PlaidId ${m.PlaidId} already in DB`))
                  merchantsMap.set (m.PlaidId, row.merchantId)
                }
                else {
                  
                  console.log (clc.yellow (`Merchant with merchantId ${m.PlaidId} not in DB`))
                  
                  method.merchants.list ({"provider_id.plaid": m.PlaidId})
                    .then (a => {
                      let sl = a.filter (item => item.types [0] === 'student_loan') [0]
                      
                   //   console.log (`insert into Merchant VALUES ('${m.PlaidId}', '${sl.mch_id}')`)
                      
                       db.run (`insert into Merchant VALUES ('${m.PlaidId}', '${sl.mch_id}')`,
                          (err) => {
                            if (err){
                              console.log (err)
                              throw (err)
                            }
                            
                            console.log (clc.green (`Row inserted with  MerchantId ${sl.mch_id} and PlaidId ${m.PlaidId}`))
                            merchantsMap.set (m.PlaidId, sl.mch_id)
                            
                          }) //db.run
                      

                    }) //then 
                 
                }
                
              })
    }
    
    console.log (`Value of i ${i} and apiLimit ${apiLimit}`)
    apiLimit++
  }
  return merchantsMap
}
