

<template>
    <div class='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div class='hidden md:flex h-screen flex-initial'>
   
        <Sidebar :user="userInfo"></Sidebar>
      </div>
      <div class='flex md:hidden flex-row'>
              <div class='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                <v-icon class="cursor-pointer" @click="setToggleSidebar(true)" scale="2" name="hi-menu"/>
                
                <router-link to="/">
                  <img :src="logoApp" alt='logo' class='w-28'/>
                </router-link>
                <router-link :to="'user-profile/'+user_id">
                  <img v-bind:src="userInfo.image" alt='logo' className='w-28 rounded-full' referrerpolicy="no-referrer"/>

                </router-link> 
              </div>
          
                <div v-if="this.$store.getters.sidebar" class='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
                  <div class='absolute w-full flex justify-end items-center p-2'>
                    <v-icon class="cursor-pointer" name="io-close-circle" scale="2" @click="setToggleSidebar(false)" fill="black"/>
                  </div>
                  <Sidebar :user="userInfo"></Sidebar>
                </div>

 
            
                    
    </div>
      <div class='pb-2 flex-1 h-screen overflow-y-scroll'>
        <router-view></router-view>        
      </div>
    </div>
 
</template>


<script default>
import Sidebar from '../components/Sidebar.vue';
import Feed from '../components/Feed.vue';
import {ref } from 'vue'
import store from '../store/index'
import Pins from  './Pins.vue'
 

import Spinner from '../components/Spinner.vue'

export default{
    components:{
      Sidebar : Sidebar,
      Pins: Pins,
      Spinner: Spinner,
      Feed: Feed
    },

    data(){
      return{
        logoApp : '/src/assets/logo.png',  
        userInfo: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
      }
      
    },

    methods: {
      setToggleSidebar(state){
         store.commit("setToggleSidebar", state);   
       
      },

      


    } 

    
    
  
}
 
</script>
