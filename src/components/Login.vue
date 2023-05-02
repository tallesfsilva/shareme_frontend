
<template>
   
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
              <video 
                loop="true"                
                muted
                autoPlay="true"
                className='w-full h-full object-cover'      
                >
                <source
                  :src="video"
                  type="video/mp4"
                />
              </video>
        </div>
        
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className='p-5'>
                <img :src="logoApp" width="130" alt="logo"/>              
            </div>
             <div className="shadow-2x1">
              <GoogleLogin :callback="loginGoogle"/>

             </div>
          </div>

    
    </div>

   
</template>


<script default>
 
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { decodeCredential } from 'vue3-google-login'
import axios from 'axios'

export default{
  data() {
      return {
        video: '/src/assets/share.mp4',
        logoApp: 'src/assets/logowhite.png',
        userResponse : {},
        userObj :{ 
          name : "",
          email: "",
          idGoogle: "",
          picture: ""   
             }
      }

   },

   methods: {
              loginGoogle(response) {
              
                this.userResponse = decodeCredential(response.credential);                
                
                this.userObj.email = this.userResponse.email;
                this.userObj.name = this.userResponse.name;
                this.userObj.idGoogle = this.userResponse.sub;
                this.userObj.picture = this.userResponse.picture;
         
                axios.post('http://localhost:3001/user/login', this.userObj)
                    .then((res)=>{
                if(res.status===200 && res.data.user){  
                  const user = {
                    _id: res.data.user.idGoogle,
                    _type: 'user',
                    userName: res.data.user.name,
                    image: this.userObj.picture,
                  }
                  localStorage.setItem('user', JSON.stringify(user));
                  this.$router.push('/');                  
                }else{
                    this.$router.push('/login');
                }
            }).catch((err)=>{
              this.$router.push('/login');
             
    })


              }



   }

}

</script>

