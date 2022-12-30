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
  
    <v-btn icon>
      <v-icon>mdi-help-circle</v-icon>
    </v-btn>
  
           
    <v-btn icon>
      <v-avatar color="pink darken-2">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>          
    </v-btn>
    
    
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
      🍩 Ⓒ {{ new Date().getFullYear() }} — <strong>Dunkin' Donuts 🍩</strong>
    </div>
  </v-footer>
  
</v-app>
</template>

<script setup>
 import Donut from '@/components/Donut.vue'
</script>
