<template>
  <div >
    {{ checkRender }}
<div v-if="loadingSpinner" >
            <Spinner :loading="loadingSpinner" msg="Loading feeds..."></Spinner>
    </div>   
    <MasonryLayout :pins="pinsArray" ></MasonryLayout>
</div>
</template>



<script default>
import Spinner from './Spinner.vue'
import MasonryLayout from './MasonryLayout.vue'
import axios from 'axios'
import store from '../store'

 

export default{

    components:{
        Spinner:Spinner,
        MasonryLayout: MasonryLayout
    },


   data(){
    return{
         pinsArray:[],
         loadingSpinner: true,
      
    }
   },


    methods:{
      async getAllPins(){
        
            const res = await axios.get('http://localhost:3001/pin/');       
             
                 if(res.status===200 && res.data.pins.length>0){
                    for(let i=0;i<res.data.pins.length;i++){
                        this.pinsArray.push(res.data.pins[i])
                    }
                    
                 }
              
            
        
}
    },
 
    computed:{
         
        checkRender(){
 
            if(store.getters.render){
                setTimeout(()=>{
                    this.pinsArray = [];
                this.getAllPins()
               
                },500)
                store.commit('setRenderFeed', false); 
            }

            }   


    },

    created(){
        
        setTimeout(()=>{
            this.getAllPins();
            this.loadingSpinner = false ;

        },2000)

        console.log(this.pinsArray);
       
        

    }


}

</script>