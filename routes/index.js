'use strict'

const express = require ('express')
const fs = require ('fs')

const multer = require ('multer')

const upload = multer ()

const donutController  = require ('../controllers/donutController')
const methodController = require ('../controllers/methodController')

const router = express.Router ()

router.use (express.static ('./client/build/'))

router.route ('/api/upload').post (upload.single ('file'), methodController.saveXml)

router.get (["/", "/login", "/logout"], (req, res) => { res.sendFile ("index.html", { root: "./client/build/" })})

router.get ('/api/chocoDonut', donutController.getChocoDonut)
router.get ('/api/accountTotals', donutController.getAccountTotals)
router.get ('/api/employees', donutController.getEmployees)

router.get ('/api/methodReport', methodController.getMethodReport)
router.post ('/api/payments', methodController.makePayments)            

module.exports = router
