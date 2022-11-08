document.addEventListener('DOMContentLoaded',async function(){
    const token=localStorage.getItem('user-token')
    const res= await axios.get('/dashboard',{ 
//  headers:{
//    'Authorization':token
//  }
        
}) 
console.log(res);
})