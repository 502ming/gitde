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