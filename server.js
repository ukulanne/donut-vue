 'use strict'

/* Time-stamp: <2023-01-02 21:06:42 anne> */

const bodyParser     = require ('body-parser')
const chalk          = require  ('colors')
const compression    = require ('compression')
const express        = require ('express')
const figlet         = require ('figlet')
const helmet         = require ('helmet')
const methodOverride = require ('method-override')
const swaggerUi      = require ('swagger-ui-express')

const router         = require ('./routes/index')
const swaggerDoc     = require ('./swagger.json')

const app = express ()
const HOST = 'localhost'
const PORT = 3000

app.use (express.static (__dirname + '/public/', { index: false } ))

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
)

app.use (bodyParser.urlencoded  ({ extended:true }))
app.use (compression ())
app.use (bodyParser.json ())
app.use (methodOverride ())

app.use ('/', router)

app.get('/panda', (req, res) => {
    res.send ('Panda')
})


process.on ('SIGINT', () => {
  console.log (`${chalk.bgRed ('[SIGINT]')}`)
   process.exit () 
})

process.on ('uncaughtException',  err => {
  console.log (`${chalk.bgRed ('[EXCEPTION]')}`)
})

process.on('unhandledRejection', (reason, promise) => {
  //console.log (`${chalk.bgRed ('[Rejection]')} ${reason} `)
})

new Promise((resolve, reject) => {
  reject('error')
}).catch((error) => {})


app.use ('/api-docs', swaggerUi.serve, swaggerUi.setup (swaggerDoc))

const server = app.listen (PORT, () => {
  figlet ('Dunkin\' Donuts', (err, data) => {

    console.log (data)
    console.log ('🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩')
    console.log (`${chalk.bgGreen ('[START]')} 🍩  Server started on host: ${HOST} 🍩`)
    console.log (`${chalk.bgGreen ('[START]')} 🍩 Server started on port: ${PORT}       🍩`)
    console.log (`${chalk.bgGreen ('[START]')} 🍩 Donut Server debug port: ${process.debugPort}      🍩`)
    console.log (`${chalk.bgBlue ('[INFO]')} 🍩 Server started with pid: ${process.pid}      🍩` )
    console.log (`${chalk.bgBlue ('[INFO]')} 🍩 Server running under: ${process.platform} ${process.arch}     🍩`)
    console.log (`${chalk.bgBlue ('[INFO]')} 🍩 Server started on ${process.env.CLOUD_ENV} environment 🍩`)
    console.log (`${chalk.bgBlue ('[INFO]')} 🍩 Nodejs path: ${process.title}                   🍩`)
    console.log (`${chalk.bgBlue ('[INFO]')} 🍩 Nodejs version: ${process.version}            🍩`)
    console.log ('🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩')
                 
  })
})

server.timeout = 0
server.keepAliveTimeout = 0
  
//server.keepAliveTimeout = (60 * 1000) + 1000;
//server.headersTimeout = (60 * 1000) + 2000;

/*
console.log (`Server timeout ${server.timeout}`)
console.log (`Server timeout ${server.headersTimeout}`)
console.log (`Server keep alive timeout ${server.keepAliveTimeout}`)
*/


