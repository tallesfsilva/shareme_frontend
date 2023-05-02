<template>
    <masonry
  v-bind:cols="{
   default: 4,
    // 3000: 6,
    // 2000: 5,   
    // 1200: 3,
    // 1000: 2,
    500: 1, 
}"
  :gutter="{default: '30px', 700: '15px'}"
  class='flex animate-slide-fwd'
    >

     <div v-for="(item, index) in pins" :key="index">
      
       <Pin :pin="item"  class='w-max'></Pin>
    
    </div>
</masonry>
</template>



<script default>

import Pin from './Pin.vue'

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1, 
}

export default{

    components:{
        Pin: Pin
    },

    props:{
        pins:[]
    },

    created(){

       
    }

    

}


</script>