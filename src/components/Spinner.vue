<template>
     <div class='flex flex-col justify-center items-center w-full h-full'>
      
        <grid-loader :loading="loading" color="#00BFFF"
                    height="50"
                    width="200"
                    class="m-5"
            >
           
        </grid-loader>
        <p class='text-lg text-center px-2'>{{msg}}</p>  
      
</div>
</template>

<script default>

export default{

    props:{
        loading: false,
        msg: ""
    }



    

}

</script>