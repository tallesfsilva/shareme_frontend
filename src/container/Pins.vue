<template>

<div class='px-2 md:px-5'>
        <div class='bg-gray-50'>
             <Navbar searchTerm="searchTerm" :user="userInfo"></Navbar>
        </div>
 
        <div class='h-full '>
            <router-view></router-view>  
        </div>
      
    </div>

</template>


<script default>

import Navbar from '../components/Navbar.vue'
import CreatePin from '../components/CreatePin.vue'

export default{

    props:{
        user:{}
    },

    components:{
        Navbar: Navbar,
        CreatePin: CreatePin
    },

    data(){

        return{
            userInfo: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
        }
    }





}




</script>