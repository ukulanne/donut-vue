'use strict'

const clc = require ('cli-color')
const sqlite3 = require ('sqlite3').verbose ()

const {sleep} = require ('../lib/helper.js')

const {Method, Environments} = require ('method-node')

const method = new Method({
  apiKey: process.env.METHOD_API_KEY,
  env: Environments.dev,
})


const DUNKIN_CORP = require ('./corporation')
const DUNKIN_CORP_ID = DUNKIN_CORP.id

const METHOD_API_CONST = require ('./methodApiConstants')

const METHOD_LIMIT_CALL = METHOD_API_CONST.METHOD_LIMIT_CALL
const METHOD_LIMIT_TIME = METHOD_API_CONST.METHOD_LIMIT_TIME

exports.add = async (db, accounts) =>{
  let accountsMap = new Map ()
  let apiLimit = 0
  let el = accounts.length

  console.log ("🍩 Account.js")
  
  for (let i = 0; i < el; i++){
    
    if (apiLimit >= METHOD_LIMIT_CALL){
      console.log (clc.red ("[SLEEP]  We have reached the API limit so we are waiting..."))
      await Promise.all ([sleep (METHOD_LIMIT_TIME)])
      console.log ("[SLEEP] We can proceed")
      apiLimit = 0
      i--
    }

    else {
      
      let a = accounts [i]
      
      db.get ('select * from Account where DunkinId=?', [a.DunkinId],
              async (err, row) => {
                if (err) {
                  console.error (err.message)
                  throw (err)
                }
                
                
                if (row){
                  console.log (clc.blue (`Account with DunkinID ${a.DunkinId} already in DB`))
                  accountsMap.set (a.DunkinId, row.Aid)
                }
                else {
                  console.log (clc.yellow (`Account with DunkinID ${a.DunkinId} not in DB`))
                  
                  let account = await method.accounts.create ({
                    holder_id: DUNKIN_CORP_ID,
                    ach: {
                      routing: a.ABARouting.toString (),
                      number: a.AccountNumber.toString (),
                      type: 'checking',
                    },
                    })
                  
                  db.run (`insert into Account VALUES ('${a.DunkinId}', '${account.id}', '${DUNKIN_CORP_ID}',
                         '${a.ABARouting}', '${a.AccountNumber}')`,
                          async (err) => {
                            
                            if (err){
                              console.log (err)
                              throw (err)
                            }

                            console.log (clc.green (`Row inserted with DunkinID ${a.DunkinId} and EntityID ${account.id}`))
                            accountsMap.set (a.DunkinId, account.id)
                            
                          })
                }
                
              })
      

    }
    
    console.log (`Account.js Value of i ${i} and apiLimit ${apiLimit}`)
    apiLimit++
  }
  return accountsMap
}
