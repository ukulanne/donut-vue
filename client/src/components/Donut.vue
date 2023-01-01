<!-- Time-stamp: <2022-12-31 23:44:17 anne> -->
<script src="./Donut.js"/>
<template>
  
  <v-card>
    
    <v-tabs
      v-model="tab"
      bg-color="orange"
      
      >
      <v-tab class="text-white" value="one" >
        Submit Payment</v-tab>
      <v-tab class="text-white" value="two" @click="getAccountTotals">Report by Account</v-tab>
      <v-tab class="text-white" value="three" @click="getBranchTotals">Report by Branch</v-tab>
      <v-tab class="text-white" value="four">Method Reports</v-tab>
      <v-tab class="text-white" value="five" @click="getEmployees">Employee Info</v-tab>
    </v-tabs>
    
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
         
          <v-form  enctype="multipart/form-data">
            <v-row no-gutters>
              <v-col cols="8">
                <v-file-input
                  chips show-size
                  prepend-icon="mdi-file"
                  label="Please upload an XML pay cicle file"
                  ref="file"
                  @change="onSelect"
                  ></v-file-input>
              </v-col>
               
             <v-col cols="4">
                 <v-sheet class="pa-2 ma-2">
                   <v-btn  :disabled="dialog" color="pink darken-2"
                           prepend-icon="mdi-upload"
                           :loading="dialog" @click="onSubmit()">
                     Upload
                   </v-btn>
                 </v-sheet>
           </v-col>
         
          </v-row>
          </v-form>

          <v-dialog
      v-model="dialog"
      :scrim="false"
      persistent
    >
      <v-card
        color="pink darken-2"
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
          <div v-if="payRollFlag">
            Payment Rows: {{payRollStats.paymentRows}}<br/>
            Unique Employees: {{payRollStats.employees}}<br/>
            Unique Payors: {{payRollStats.payors}}<br/>
            Unique Merchants: {{payRollStats.merchants}}<br/>
          </div>
           
                
        </v-window-item>
        
        <v-window-item value="two">
          <v-row no-gutters>
            <v-col cols="12"   sm="4">
              <v-sheet class="ma-2 pa-2">
               
              </v-sheet>
            </v-col>

              <v-col cols="12"   sm="4">
      
              <v-sheet class="ma-2 pa-2">
                <v-select
                clearable
                  label="Select one or more pay periods"
                  v-model="selectedPeriods"
                :items="periods"
                multiple
                ></v-select>
              </v-sheet>
            </v-col>
            
        
           <v-col cols="12"   sm="4">
              
            <div align="right">
              
              <v-btn 
                ripple
                flat
                tile 
                right 
                color="pink darken-2"
                class="white--text"
                @click="onCsvExport(accountTotals, 'accountTotals')"  
                aria-label="Download CSV"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                  CSV
                
              </v-btn>
              
                <v-btn 
                  
                  ripple 
                  right 
                  tile 
                  color="pink darken-2" 
                  @click="getAccountTotals()" 
                  aria-label="Load Account Totals"
                  prepend-icon="mdi-database-search"
                  >Load
                 
                </v-btn>
            </div>
           </v-col>
          </v-row>
          <!--{{employees}}-->
           <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          DunkinId
        </th>
        <th class="text-left">
          Account Number
        </th>
        <th class="text-left">
          ABA Routing
        </th>
        <th class="text-left">
          Total
        </th>
        <th>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in accountTotals"
        :key="item.DunkinId"
      >
        <td>{{ item.DunkinId}} {{item.LastName}}</td>
        <td>{{ item.AccountNumber }}</td>
        <td>{{ item.ABARouting }}</td>
        <td>${{ item.TOTAL.toFixed(2) }}</td>
        <td> <v-btn  color="pink darken-2"> More info </v-btn></td>
      </tr>
    </tbody>
  </v-table>

        

          
        </v-window-item>
        
        <v-window-item value="three">
             <v-row no-gutters>
            <v-col cols="12"   sm="4">
              <v-sheet class="ma-2 pa-2">
               
              </v-sheet>
            </v-col>

              <v-col cols="12"   sm="4">
      
              <v-sheet class="ma-2 pa-2">
                <v-select
                clearable
                  label="Select one or more pay periods"
                  v-model="selectedPeriods"
                :items="periods"
                multiple
                ></v-select>
              </v-sheet>
            </v-col>
            
        
           <v-col cols="12"   sm="4">
              
            <div align="right">
              
              <v-btn 
                ripple
                flat
                tile 
                right 
                color="pink darken-2"
                class="white--text"
                @click="onCsvExport(branchTotals, 'branchTotals')"  
                aria-label="Download CSV"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                  CSV
                
              </v-btn>
              
                <v-btn 
                  
                  ripple 
                  right 
                  tile 
                  color="pink darken-2" 
                  @click="getBranchTotals()" 
                  aria-label="Load Account Totals"
                  prepend-icon="mdi-database-search"
                  >Load
                 
                </v-btn>
            </div>
           </v-col>
          </v-row>
           

          <!--{{employees}}-->
           <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          Branch        </th>
        <th class="text-left">
         DATE
        </th>
        <th class="text-left">
          TOTAL
        </th>
       <th>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in branchTotals"
        :key="item.branch"
      >
        <td>{{ item.branch }}</td>
        <td>{{ item.date }}</td>
        <td>${{ item.TOTAL.toFixed(2) }}</td>
        <td> <v-btn  color="pink darken-2"> More info </v-btn></td>
      </tr>
    </tbody>
  </v-table>

      
        </v-window-item>
        <v-window-item value="four">
           <div align="right">
            
              <v-btn 
                ripple
                flat
                tile 
                right 
                color="pink darken-2"
                class="white--text"
                @click="methodReport"  
                aria-label="Download CSV"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                  CSV
                
              </v-btn>
             
          </div>
          
          <br/>
          <v-radio-group  v-model="reportType" inline>
            <v-radio label="Current Created Reports" value="payments.created.current"  color="pink darken-2"></v-radio>
            <v-radio label="Previous Current Reports" value="payments.created.previous" color="pink darken-2"></v-radio>
            <v-radio label="Current Updated Reported" value="payments.updated.current" color="pink darken-2"></v-radio>
            <v-radio label="Previous Updated Reported" value="payments.updated.previous" color="pink darken-2"></v-radio>
           
           
          </v-radio-group>
         Please choose one of the following reports. A CSV download should start after a few moments
        </v-window-item>
        <v-window-item value="five">
           <v-row no-gutters>
            <v-col cols="12"   sm="4">
              <v-sheet class="ma-2 pa-2">
               
              </v-sheet>
            </v-col>

              <v-col cols="12"   sm="4">
      
              <v-sheet class="ma-2 pa-2">
                <v-select
                clearable
                  label="Select one or more pay periods"
                  v-model="selectedPeriods"
                :items="periods"
                multiple
                ></v-select>
              </v-sheet>
            </v-col>
            
        
           <v-col cols="12"   sm="4">
              
            <div align="right">
              
              <v-btn 
                ripple
                flat
                tile 
                right 
                color="pink darken-2"
                class="white--text"
                @click="onCsvExport(employees, 'employees')"  
                aria-label="Download CSV"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                  CSV
                
              </v-btn>
              
                <v-btn 
                  
                  ripple 
                  right 
                  tile 
                  color="pink darken-2" 
                  @click="getEmployees()" 
                  aria-label="Load Account Totals"
                  prepend-icon="mdi-database-search"
                  >Load
                 
                </v-btn>
            </div>
           </v-col>
          </v-row>
          

       
           <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          Employee Name
        </th>
        <th class="text-left">
          Dunkin ID
        </th>
        <th class="text-left">
          DOB
        </th>
        <th class="text-left">
          Branch
        </th>
        <th>
          Total Payments
          </th>
        <th>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in employees"
        :key="item.DunkinId"
      >
        <td>{{ item.FirstName}} {{item.LastName}}</td>
        <td>{{ item.DunkinId }}</td>
        <td>{{ item.DOB }}</td>
        <td>{{ item.DunkinBranch }}</td>
        <td>${{ item.TOTAL.toFixed(2) }}</td>
        <td> <v-btn  color="pink darken-2"> More info </v-btn></td>
      </tr>
    </tbody>
  </v-table>

           
        </v-window-item> 

        
      </v-window>
    </v-card-text>
  </v-card>

  
</template>

