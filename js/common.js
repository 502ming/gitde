// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})


//axios公共配置
axios.defaults.baseURL='http://ajax-api.itheima.net'

//axios其他配置
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
 const token=localStorage.getItem('user-token')
 if(token){
  config.headers.Authorization=token
 }
  return config;
}, function (error) {
  // 对请求错误做些什么
 
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status===401){
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href='./login.html'
  }
  return Promise.reject(error);
});


















const toastBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(toastBox, {
  animation: true, // 是否有动画
  autohide: true, // 是否自动隐藏
  delay: 3000 // 停留多久
})

const tip =(msg)=>{
  toastBox.querySelector('.toast-body').innerHTML=msg
  toast.show()
}
const userName=document.querySelector('.navbar .font-weight-blod')
const logoutBtn=document.querySelector('#logout')
if(userName){userName.innerHTML=localStorage.getItem('user-name')
}
if(logoutBtn){
  logoutBtn.addEventListener('click',function(){
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href='./login.html'
  })
}