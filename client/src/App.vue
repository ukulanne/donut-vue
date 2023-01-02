<!-- Time-stamp: <2023-01-02 15:35:10 anne> -->
  
<template>
<v-app>
  <v-app-bar
    color="pink darken-2"
    >
    
    
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    
    <v-app-bar-title>🍩 Dunkin' Donuts Student Loans Benefit App</v-app-bar-title>
    
    <v-spacer></v-spacer>
  
    <v-btn icon @click="help()">
      <v-icon>mdi-help-circle</v-icon>
    </v-btn>
  
           
  <!--  <v-btn icon> -->
       <v-menu
        min-width="200px"
        rounded
      >
       <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
      <v-avatar color="pink darken-2">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>          
 </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="pink darken-2"
              ><br/>
                <span class="text-h5">🍩</span>
              </v-avatar>
              <h4>Anne Summers</h4>
              <p class="text-caption mt-1">
               <i> anne@dunkin.com </i>
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                 color="pink darken-2"
                prepend-icon="mdi-account-cog"
              >
                Preferences
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                
                 color="pink darken-2"
                prepend-icon="mdi-logout"
              >
                Logout
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
</v-menu>
 <!--    </v-btn> -->
    
    
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> 
  </v-app-bar>

  
  <v-main>
    <Donut />
  </v-main>

  <v-footer class="d-flex flex-column">
    <div class="bg-orange accent4 w-100 text-center px-4">
      <strong>Dunkin' done easy</strong>
      <v-spacer></v-spacer>
    </div>
    
    <div class="px-4 py-2 bg-pink darken-2 text-center w-100">
      🍩 Ⓒ {{ new Date().getFullYear() }} — <strong>Anne Summers 🍩</strong>
    </div>
  </v-footer>
  
</v-app>
</template>

<script setup>
import Donut from '@/components/Donut.vue'

/*  export default {
    data: () => ({
      user: {
        initials: 'AS',
        fullName: 'Anne Summers',
        email: 'anne@dunkin.com',
      },
  }),
  methods:{
    help () { alert ('Please email help@dunkin.com') }
  }
  }*/
</script>
