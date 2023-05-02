<template>

<div class='flex flex-col justify-center items-center mt-5 lg:h-4/5'>    
    
  <p v-show="fields" class='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill all the fields
        
      </p>
    
      <div class='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div class='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div class='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            <div v-if="loadingSpinner">
                 <Spinner :loading="loadingSpinner" :msg="msgSpinner" />            
            </div>
            <div v-if="wrongImageType">
                <p>Wrong image Type</p>
            </div>        
 
            <label v-if="!pin.image">
                <div class='flex flex-col items-center justify-center h-full'> 
                  <div class='flex flex-col justify-center items-center'>
                    <p class='font-bold text-2xl'>
                        <v-icon scale="2" name="bi-cloud-arrow-up"/>                         
                    </p>
                    <p class='text-lg'>
                    Click here to upload

                    </p>
                  </div>
                  <p class='mt-32 text-gray-400'>
                    Recomendation: use-high-quality JPG, SVG, GIF, PNG less than 20MB
                  </p>


                </div>
                <input 
                  type="file"
                  id="file-upload"
                  name="upload-image"
                  v-on:change="uploadImage"
                  class="w-0 h-0"
                />

            </label>            
           <div v-else class='relative h-full'>
            <img  :src="imageUrl" alt="uploaded-pic" class= 'h-full w-full'/>
            <button type='button' class='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
              @click="removeImage"
            ><v-icon name="md-delete"/>
            </button>
           </div>
          
          </div>
        </div>
          <div class='flex flex-1 flex-col gap-6  lg:pl-5 mt-5 w-full'>
            <input
                type="text"                
                name="title"
                v-model="pin.title"
                
        
                placeholder="Add your Title"
                class='outline-none text-2xl sm:text-3xl font-bold border-b-3 border-gray-200 p-2'
            />
     
                <div v-if="user" class='flex gap-2 my-2 items-center bg-white rounded-lg'>
                  <img :src="user.image" class='w-10 h-10 rounded-full' alt='user-profile'/>
                  <p class='font-bold '>{{user.userName}}</p>


                </div>

        

            <input
                type="text"              
                v-model="pin.about"
                
                placeholder="What is your pin about"
                class='outline-none text-base sm:text-lg border-b-3 border-gray-200 p-2'
            />
           

           <input
                type="text"               
                v-model="pin.destination"                
                placeholder="What is your destination link"
                class='outline-none text-base sm:text-lg border-b-3 border-gray-200 p-2'
            />
            <div class='flex flex-col'>
              <div>
                <p class='mb-2 font-semibold text-lg sm:text-xl'>Choose pin category</p>
                <select 
               
                  v-model="pin.categoryOption"
                  class='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                >
                <option 
                  class='bg-white'
                  value="other">Select category</option>                
                  <option v-for="(category) in listCategories" :key="category.name" class="text-base border-0 outline-none capitalize bg-white text-black" :value="category.name">
                    {{category.name.charAt(0).toLocaleUpperCase() + category.name.slice(1)}}
                  </option>
                </select>
              </div>
              <div class='flex justify-end items-end mt-5'>
                  <button type="button" @click="savePin" class="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-9">  
                  Save
                </button>
                 </div>


            </div>
          </div>

          


      </div>
    </div>


</template>


<script default>

import {categories} from '../utils/data'
import Spinner from './Spinner.vue'
import axios from 'axios'


export default{

    components:{
      Spinner: Spinner
    },

    data(){
        return{

            pin:{
                categoryOption: "",
                title:"",
                destination:"",
                about:"",
                image: "",
                user:""
            },
            user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear(),
            fields: false,
            loadingSpinner:false,
            wrongImageType: false,
            imageUrl: "",
            listCategories:categories,
            msgSpinner:""



        }

    },

    methods:{
        savePin(){

          try{
                if(this.pin.title && this.pin.destination && this.pin.about && this.pin.image && this.pin.categoryOption){
                  
                  this.pin.user = this.user._id;

                  axios.post('http://localhost:3001/pin/create', this.pin, {
                          headers: {'Content-Type': 'multipart/form-data'}
                  }).then((res)=>{            
                          if(res.status===200){
                            this.$router.push('/')        
                          } 
                  }).catch((err)=>{
                    console.log(err);
                  })
                }else{
                  this.fields = true;
                  setTimeout(()=>{
                  this.fields = false;

                  },2000)
                }
      }catch(err){
        console.log(err)
      }
        },

        uploadImage(){
          try{
            this.msgSpinner = "Loading image..."
            this.loadingSpinner = true;
            this.pin.image = event.target.files[0] ? event.target.files[0] : null ;
            this.imageUrl = URL.createObjectURL(this.pin.image);
            console.log(this.loading);
            setTimeout(()=>{
                this.loadingSpinner =false;
            },2000)
          }catch(err){
            console.log(err)
          }
            
  

        },

        removeImage(){
          try{
            this.msgSpinner = "Removing image..."
            this.loadingSpinner = true;
            this.pin.image = null;

            setTimeout(()=>{
                this.loadingSpinner =false;
            },2000)
          }catch(err){
            console.log(err);
          }


        }


    }


}


</script>