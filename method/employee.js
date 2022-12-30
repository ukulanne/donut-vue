'use strict'

const clc = require ('cli-color')
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

exports.add = async (db, employees) =>{
  let employeesMap = new Map ()
  let apiLimit = 0
  let el = employees.length

  console.log ("🍩 Employee.js")
  
  for (let i = 0; i < el; i++){
    
    if (apiLimit >= METHOD_LIMIT_CALL){
      console.log (clc.red ("😴[SLEEP]  We have reached the API limit so we are waiting...💤"))
      await Promise.all ([sleep (METHOD_LIMIT_TIME)])
      i--
      console.log ("[SLEEP] We can proceed")
      apiLimit = 0
    }

    else {
      //console.log ("[DB] Query and insert employee if needed")
      let e = employees [i]
      
      db.get ('select * from Employee where DunkinId=?', [e.DunkinId],
              async (err, row) => {
                if (err) {
                  console.error (err.message)
                  throw (err)
                }
                
                
                if (row){
                  employeesMap.set (e.DunkinId, row.Eid)
                  console.log (clc.blue (`Employee with DunkinID ${e.DunkinId} already in DB`))
                }
                else {
                  console.log (clc.yellow (`Employee with DunkinID ${e.DunkinId} not in DB`))

                  //Insert on method and then insert on our cache DB
                  // Escape strings for SQL using two quotes
                  
                  let fn = e.FirstName.replace (/'/g,"''") 
                  let ln = e.LastName.replace (/'/g,"''") 
                  let dob = e.DOB.replace (/(\d\d)-(\d\d)-(\d{4})/, "$3-$1-$2")
                  
                  const entity = await method.entities.create({
                    type: 'individual',
                    individual: {
                      first_name: fn,
                      last_name: ln,
                      phone: '+15121231111',
                      email: `${fn}.${ln}@dunkin.com`,
                      dob: '1997-03-18',
                    }
                  })
                  
                  
                  
                  db.run (`insert into Employee VALUES ('${e.DunkinId}', '${entity.id}', '${e.DunkinBranch}',
                         '${fn}', '${ln}', '${dob}', ${e.PhoneNumber})`,
                          (err) => {
                            
                            if (err){
                              console.log (err)
                              
                              throw (err)
                            }

                            //console.log (clc.green (`Row inserted with DunkinID ${e.DunkinId} and EntityID ${em}`))
                            employeesMap.set (e.DunkinId, entity.id) //em is dummy this comes frm method
                            
                          })
                 
                }
               
              })
      
       
    }
    
    console.log (`Employee Value of i ${i} and apiLimit ${apiLimit}`)
  
    apiLimit++ 
  }
  return employeesMap
  
}
