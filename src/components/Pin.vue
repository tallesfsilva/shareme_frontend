<template>
 <div class='m-2'>
        <div
         v-on:mouseenter="setpostHovered(true)"
         v-on:mouseleave="setpostHovered(false)"
         @click=" this.$router.push('/pin-detail/'+pin._id)"
         class="relative cursor-zoom-in w-auto hover:shadow-lg roundedlg overflow-hidden transition-all duration-500 ease-in-out"
        >
            <img class='rounded-lg w-full' alt='user-post' :src="pin.image" style="width:250px"/>
   
                <div v-if="postHovered" class='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                style="heigth:100">
                <div class='flex items-center justify-between'>
                    <div class='flex gap-2'>
                        <a
                         v-bind:href="pin?.image+'?dl='"
                         download
                         @click="(e)=> e.stopPropagation(0)"
                         class="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                        >
                        <v-icon name="bi-cloud-download-fill"/>
                        </a>
                    </div>
                   
                        <button v-if="pin?.saved?.length "
                         type='button'
                         @click="(e)=>{e.stopPropagation()}"
                        class='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none'
                        >
                           {{ pin?.saved?.length }} Saved
                        </button>                        
                        <button v-else
                            type='button'
                            @click="(e)=>{e.stopPropagation();savePin(pin?._id)}"
                            
                            class='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none'
                            >Save</button>
                     
                </div>
                <div v-if="pin.destination" class='flex justify-between items-center gap-2 w-full'>
            
                    <a
                        v-bind:href="pin?.destination"
                        @click="(e)=> e.stopPropagation(0)"
                        rel='noreferrer'
                        class='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                    >
                    <v-icon name="bi-arrow-up-right-circle-fill"/>
                    {{pin?.destination.length > 15 ? pin?.destination.slice(0,15) : pin?.destination}}

                    </a>
               
                   
                        <button v-if="pin?.postedBy?.user.idGoogle == userInfo?._id"
                        type='button'
                        @click="(e)=> {e.stopPropagation(); deletePin(pin?._id)}"
                            
                       
                        class='bg-white p-2 opacity-70 hover:opacity-100 font-bold px-2 py-2 text-dark rounded-3xl hover-shadow-md outlined-none'
                        >
                          <v-icon name="md-delete"/>
                        </button>
               

                </div>
           </div>
   
        </div>
        <router-link
            v-bind:to="'user-profile/'+userInfo?._id" 
            class="flex gap-2 mt-2 items-center"  
            >
            <img class='w-8 h-8 rounded-full object-cover'
                 v-bind:src="userInfo.image"
                 alt="user-profile"
                 referrerpolicy="no-referrer"
            />
            <p class='font-semibold capitalize'>{{pin?.postedBy?.user.name}}</p>

    </router-link>
    </div>

</template>



<script default>

import axios from 'axios'
import store from '../store'
 
import Feed from '../components/Feed.vue'

export default{


    props:{
        pin:{type:Object}
    },

    data(){

        return{
            postHovered: false,
            alreadySaved : false,//!!(pin?.saved.filter((item)=> item.postedBy?.idGoogle === userInfo._id))?.length,
            userInfo: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
        }
    },

    methods:{
        setpostHovered(state){
            this.postHovered = state;
        },

        
       
        async deletePin(pinId){

        try {
            if(pinId){
                const res = await axios.post('http://localhost:3001/pin/delete/'+pinId);
              
                if(res.status===200 && res.data.msg){                    
                   store.commit('setRenderFeed', true);                  

                }
                

            }

        } catch (error) {
            throw new Error(error)
            
        }


        },

        async savePin(pinId){

                try {
                    if(pinId){

                        const saveObj = {
                            pinId : pinId,
                            postedBy: this.pin.postedBy,
                            userId: this.pin.user.idGoogle

                        }

                        const res = await axios.post('http://localhost:3001/pin/save/', saveObj);
                        console.log(res);
                        if(res.status===200 && res.data.msg){
                           store.commit('setRenderFeed', true); 
                        }
                        

                    }

                } catch (error) {
                    throw new Error(error)
                    
                }


}

    },

    computed:{
       
 

        checkUser(){
            if(!userInfo && userInfo===null)   {
                this.$router.push('/login')
            }
         }


    },
 
}



</script>