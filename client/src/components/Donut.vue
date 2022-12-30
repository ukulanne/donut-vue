<script src="./Donut.js"/>
<template>
  
  <v-card>
    
    <v-tabs
      v-model="tab"
      bg-color="orange"
      
      >
      <v-tab class="text-white" value="one">Submit Payment</v-tab>
      <v-tab class="text-white" value="two">Report by Account</v-tab>
      <v-tab class="text-white" value="three">Report by Branch</v-tab>
      <v-tab class="text-white" value="four">Method Reports</v-tab>
      <v-tab class="text-white" value="five">Employee Info</v-tab>
    </v-tabs>
    
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
         
          <v-form  enctype="multipart/form-data">
           <v-row no-gutters>
             <v-col cols="8">
                <v-file-input
            chips show-size
            prepend-icon="mdi-xml"
            label="XML File"
            ref="file"
            @change="onSelect"
                  ></v-file-input>
             </v-col>
               
             <v-col cols="4">
                 <v-sheet class="pa-2 ma-2">
                   <v-btn  :disabled="dialog" color="pink darken-2"
                           :loading="dialog" @click="onSubmit()">
                     Submit
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
                  prepend-icon="mdi-reload"
                  >Load
                 
                </v-btn>
          </div>

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
          <!-- start of three -->
          <v-row no-gutters>
            <v-col cols="8">
              <v-sheet class="pa-2 ma-2">
                <v-select
                  label="Please select a Pay Period"
                  :items="['November 18, 2022', 'December 2, 2022', 'December 16, 2022', 'December 30, 2022']"
                  ></v-select>
              </v-sheet>
            </v-col>
            
            <v-col cols="4">
              <v-sheet class="pa-2 ma-2">
                <v-btn @click="testMessage">Make Report</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
         
          
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Branch
                </th>
                <th class="text-left">
                  Total of Employees
                </th>
                <th class="text-left">
                  Total Payments
                </th>
                <th>
                  </th>
              </tr>
            </thead>
            <tbody>
        <!--     <tr
                v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>-->
    </tbody>
  </v-table>
          
          <!--endof three-->
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
              <!--
              <v-btn 
                  
                  ripple 
                  right 
                  tile 
                  color="pink darken-2" 
                  @click="" 
                  aria-label="Load Employees"
                  prepend-icon="mdi-reload"
                  >Load
                 
              </v-btn>
              -->
          </div>
          
          
         <!-- {{reportType}} -->
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
                  aria-label="Load Employees"
                  prepend-icon="mdi-reload"
                  >Load
                 
                </v-btn>
          </div>

          <!--{{employees}}-->
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
        <td> <v-btn  color="pink darken-2"> More info </v-btn></td>
      </tr>
    </tbody>
  </v-table>

           
        </v-window-item> 

        
      </v-window>
    </v-card-text>
  </v-card>

  
</template>

