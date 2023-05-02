<template>

 
    <div class='flex xl-flex-row flex-col m-auto bg-white' style="maxWidth : 1500px, borderRadius : 32px">
      <div class='flex justify-center items-center md-items-start flex -initial'>
        <img 
           :src="pinDetail.image"
          class='cursor-zoom-in rounded-t-3xl rounded-b-lg'
          alt='user-post'
          style="width:400px"
          @click="showImage"
        /> 
      </div>
      <div v-show="zoomImage" class='fixed flex justify-center items-center z-2 top-0 left-0 right-0 bottom-0  w-full h-full' style="background-color: rgba(0,0,0,0.5)">
          <img  
              :src="pinDetail.image"
              class='position:absolute cursor-zoom-out flex justify-center items-center top-1/2 left-1/2 rounded-t-3xl rounded-b-lg' style="width:700px;"
              alt='user-post'    
              @click="showImage"          
            />         
      </div>
      <div class='w-full p-5 flex-1 xl-min-w-6-620'>
        <div class='flex items-center justify-between'>
          <div class='flex gap-2 items-center'>
            <a :href="pinDetail.image+'?dl='"
                download
                @click="(e)=> e.stopPropagation(0)"
                class="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                >
             <MdDownloadForOffline/>

            </a>

          </div>
          <a :href="pinDetail.destination" target='_blank' rel='noreferer'>
            {{pinDetail.destination}}
          </a>
        </div>
        <div>
          <h1 class='text-4xl font-bold break-words mt-3'>
            {{pinDetail.title}}


          </h1>
          <p class='mt-3 '>
          {{pinDetail.about}}

          </p>
          
        </div>
        <router-link
            :to="'user-profile/'+pinDetail.postedBy?.idGoogle"
            class="flex gap-2 mt-5 items-center bg-white rounded-lg"
            >
            <img class='w-8 h-8 rounded-full object-cover'
                 :src="pinDetail?.postedBy?.user?.image"
                 alt="user-profile"
                 referrerpolicy="no-referrer"
            />
            <p class='font-semibold capitalize'>{{pinDetail?.postedBy?.user?.name}}</p>

        </router-link>
      <h2 class='mt-5 text-2xl'>Comments</h2>

      <div v-if="pinDetail?.comments" class='max-h-370 overflow-y-auto'>        
    
          <div v-for="(item,key) in pinDetail?.comments" :key="key" class='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img :src="item.postedBy.user.image" 
            alt= 'user-profile'
            class='w-10 h-10 rounded-full cursor-pointer'              
            />
            
            <div class='flex flex-col'>
              <p class='font-bold'>{{item.postedBy.user.name}}</p>               
              <p>{{item.comment}}</p>
            
            </div>

            <div class="flex">
                <button
                        type='button'                                         
                        class='bg-white p-2 opacity-70 hover:opacity-100 font-bold px-2 py-2 text-dark rounded-3xl hover-shadow-md outlined-none'
                        >
                  <v-icon name="md-delete"/>
            </button>         
            </div>
          
          </div>
     
      </div>
      <div class='flex flex-wrap mt-6 gap-3'>
      <router-link
            :to="'user-profile/'+pinDetail.postedBy?.idGoogle" 
            
            >
            <img class='w-10 h-10 rounded-full cursor-pointer'
                 :src="pinDetail?.postedBy?.user?.image"
                 alt="user-profile"
                 referrerpolicy="no-referrer"
            />           
        </router-link>
        <input class='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
          type="text"
          alt="Place a comment"    
          v-model="comment"        
         
        />
        <button
          type='button'
          class='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
          @click="setComment"
          >
         {{addingComment ? 'Posting the comment...' : "Post"}}

        </button>
      </div>

      </div>
  
    </div>
    <div v-if="pins?.length > 0">
        <h2 class='text-center font-bold text-2x mt-8 mb-4'>
          More like this
      </h2>
        <MasonryLayout pins={pins}/></MasonryLayout>
      </div>     
      <div v-else>
        <Spinner :loading='true' msg="Loading more pins"/>

      </div>       
   
     
     
</template>



<script default>

import axios from 'axios'

export default {


    props:{
        user:{type:Object}
    },

    data(){
        return{

            pinDetail:[],
            comment: "",
            morePin: [],
            zoomImage: false

        }
    },

    methods:{


      showImage(){

        if(this.zoomImage) {

          this.zoomImage = false;
        }else{
          this.zoomImage = true;
        } 
     


      },


        async setComment(){

            if(this.comment){

                const commentObj = {
                    postedBy: this.pinDetail.postedBy,
                    comment: this.comment,
                    pinId: this.pinDetail._id
                }
                
                 
            const res = await axios.post('http://localhost:3001/pin/comment/', commentObj);
       
             
                if(res.status===200){                     
                    console.log(res);
                    this.comment = "";
                    this.getPinDetail();
                 }   
            }
        },

        async getMorePins(){
            try{
                 
            const pinObj = {
                pinId : this.pinDetail._id
            }
            console.log(this.pinDetail._id)
            const res = await axios.get('http://localhost:3001/pin/more?pinId='+this.pinDetail._id);
       
              
            }catch(err){
                throw new Error(err)
            }


        },


        async getPinDetail(){
            try{
                const idPin = this.$route.params.id
            
            const res = await axios.get('http://localhost:3001/pin/detail/'+idPin);
       
             
                 if(res.status===200){
                   
                      this.pinDetail = res.data.pin;
                        console.log(this.pinDetail)
                        this.getMorePins();
                 }
            }catch(err){
                throw new Error(error)
            }

            
              
            
        
}


    },


    created(){

            this.getPinDetail();
            


    }


}




</script>