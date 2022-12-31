import axios from 'axios'
import fileSaver from 'file-saver'
import { cloneDeep } from 'lodash'
import moment from 'moment-timezone'

//import {onMounted} from 'vue'

export default {
  name: 'Donut',
  props: {
    msg: String,
  },
  data () {
    return {
      panda: 'Anne Summers',
      file: '',
      periods: ['California', 'Colorado'],
      selectedPeriods: [],
      tab: "one",
      reportType:  "payments.created.current",
      accountTotals: [],
      branchTotals: [],
      branches: [],
      employees: [],
      cycles: [],
      dialog: false,
      payRollFlag: false,
      payRollStats: "pn",
    }
  },

  watch: {
      dialog (val) {
        if (!val) return

        //setTimeout(() => (this.dialog = false), 4000)
      },
  },

  methods: {

    onSelect (){
      let file = this.$refs.file.files [0]
      this.file = file //"dunkin.xml"

    },

    async onSubmit (){
      let formData = new FormData ()
      

      if (!this.file){
        alert ("Please choose an XML file")
        return
      }
      this.dialog = true
      formData.append ('file', this.file)
      console.log ('onSubmit')
      try {
        await axios.post ('/api/upload', formData)
          .then (response => {
            let data = response.data
            this.dialog = false
            this.payRollStats = data
            
            console.log (this.payRollStats)
            
            if (confirm (`Would you like to proceed?:\nPayment rows: ${data.paymentRows}\nTotal Employees ${data.employees}\nPayor Accounts: ${data.payors}\nMerchants: ${data.merchants}`)){
             
              this.makePayments ()
            }
            
            this.payRollFlag = true
          })
      }
      catch (err){
        console.log (err)
      }
    },

       makePayments (){
         axios
           .post (`/api/payments`)
           .then(response => {
           
           //  console.log (response.data)
             alert ('The payment batch job has been submitted succesfully. You will receove an email when all payments are processed in a few hours.')
           })
       },
    
    testMessage (){
      console.log (`🐼 The best panda  is ${this.panda}`)

      axios
        .get (`/api/chocoDonut`)
        .then(response => {
          console.log ('🍩 panda')
          console.log (response)
        })
    },

    async getAccountTotals (){
      console.log (`Get account totals`)
      await axios
        .get (`/api/accountTotals`, { params: {selected: this.selectedPeriods} })   
        .then (response => {
          this.accountTotals = response.data.rows
         
          console.log ('🍩 Account totals')
        })
    },

    async getPayPeriods (){
      await axios
        .get (`/api/payPeriods`)
        .then (response => {
          this.periods = response.data.rows.map (x => x.paymentTS)
          console.log ('🍩 Pay Periods')
        })
    },

    async getBranchTotals (){
      console.log (`Get branch totals`)
      await axios
        .get (`/api/branchTotals`)
        .then (response => {
          this.branchTotals = response.data.rows
          
          console.log ('🍩 Branch totals')
        })
    },
    
   async getEmployees (){
      console.log (`🍩 Get employees`)

      await axios
        .get (`/api/employees`)
        .then (response => {
          //console.log (response.data.rows)
          this.employees = response.data.rows
          console.log ('panda employee')
        })
    },

    async methodReport (){
      
      await axios
        .get (`/api/methodReport?reportType=${this.reportType}`)
        .then (response => {
          let csv = response.data
          let timeStamp = moment ().format ('YYYY-MM-DD')
          let fileName = `${this.reportType}_${timeStamp}.csv`
          let blob  = new Blob ([csv], { type: "text/plain;charset=utf-8" })
          
            fileSaver (blob, fileName)
         
        })
      
     
    },
  
    
    async onCsvExport (objs, type){
      const ls = cloneDeep (objs)
      const timeStamp = moment ().format ('YYYY-MM-DD')
      const fileName = `${type}_${timeStamp}.csv`

      const json2csv = data => {
        let csv = data.map (row => Object.values (row))
        csv.unshift (Object.keys (data [0]))
        
        return `"${csv.join ('"\n"').replace (/,/g, '","')}"`;
      }
      
      try {
        let csv = json2csv (ls)
        let blob  = new Blob ([csv], { type: "text/plain;charset=utf-8" })

        fileSaver (blob, fileName)
      } catch (err) {
        console.error (err)
      }
    }

  },

  mounted(){
    console.log ('🐼❤️🍩☕')
    this.getPayPeriods ()
  },
  /*
  setup (){
    onMounted (() => {
      console.log ('panda onMounted()')
    })
  },
  */
}
