<template>
     <div class='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div class='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
            <v-icon name="io-search" size="1" class='ml-1'/>
                    <input
                                   
                    />
        </div>
            <div class='flex gap-3'>
                    <router-link v-bind:to="'user-profile/'+user?._id" class="hidden md:block">
                        <img :src="user.image" alt="user" class='w-14 h-12 rounded-lg'/>
                    </router-link>
                    <router-link to='create-pin' class="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                        <v-icon name="md-addcircleoutline" fill="white"/>
                    </router-link>
            </div>
    </div>
</template>


<script default>

export default {

   

    props:{
        searchTerm : String,
        user: {}

    },

    data(){
        return{

        


        }

    }






}




</script>