<template>

<div class='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
            <div class='flex flex-col'>
                
                <router-link
                        to="/"
                        class='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                          onClick={handleCloseSidebar}                                       
                        >
                         <img :src="logoApp" alt="logo" class='w-full'/>
                </router-link>                          
                
                
            
                <div class='flex flex-col gap-5'>
                     
                <router-link
                        to="/"
                        v-bind:class="isActive ? isActiveStyle : isNotActiveStyle"
                        @click="handleCloseSidebar"                                       
                        >                         
                        <v-icon name="hi-solid-home" fill="black"/>                      
                         Home
                </router-link>
                                             
               
                    <h3 class='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
                 
                      <router-link v-for="(category, key) in categories.slice(0, categories.length -1)" :key="key" 
                        v-bind:to="'/category/'+category.name"
                        v-bind:class="isActive ? isActiveStyle : isNotActiveStyle"
                        onClick={handleCloseSidebar}                            
                        >
                          {{category.name}}
                             </router-link>
                         
                </div>
                </div>
                <div v-if="user">
                    <router-link 
                        v-bind:to="'/user-profile/'+user._id"
                        class='flex  my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
                        onClick={handleCloseSidebar}             
                        >
                        <img :src="user.image" class="w-10 h-10 rounded-full" alt='user-profile'/>
                        <p>{{user.userName}}</p>
                             </router-link>

                </div>
 
            </div>



</template>


<script default>
  import logo from '../assets/logo.png'
  import  {HiSolidHome}  from "oh-vue-icons/icons";
  import store from '../store/index'

export default{

    props: {
        user: {},
     
    },
  
    data(){
        return {
        logoApp : 'src/assets/logo.png',
        isActiveStyle: 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black',
        isNotActiveStyle : 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize',
        categories : [
                {name: 'Animals'},
                {name: 'Wallpappers'},
                {name: 'Photography'},
                {name: 'Gaming'},
                {name: 'Coding'},
                {name: 'Other'},

]

        }



    },

    methods: {
        handleCloseSidebar(){
            
          if(this.$store.getters.sidebar){
            store.commit("setToggleSidebar", false);     
          }    
        }
    }


    





}



</script>