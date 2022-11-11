document.addEventListener('DOMContentLoaded',async function(){
    const token=localStorage.getItem('user-token')
    const res= await axios.get('/dashboard',{ 
//  headers:{
//    'Authorization':token
//  }
        
}) 
console.log(res);

const {data}=await axios.get('/dashboard')
//  document.querySelector('[name=salary]').innerHTML=data.overview.salary
//  document.querySelector('[name=student_count]').innerHTML=data.overview.student_count
//  document.querySelector('[name=age]').innerHTML=data.overview.age
//  document.querySelector('[name=group_count]').innerHTML=data.overview.group_count
 for(let key in data.overview){
    document.querySelector(`[name=${key}]`).innerHTML=data.overview[key]
    console.log(data)
 }

 initYearChart(data.year)
 initSalaryChart(data.salaryData)
})


function initYearChart(year){
const myChart=echarts.init(document.querySelector('#line'))
const option = {
    title:{
    show:true,
    text:'rank排行榜',
    textStyle:{fontsize:16}, 
    left:10,
    top:15
    },
    xAxis: {
      type: 'category',
      data: year.map((item)=>item.month),
    },
    yAxis: {
      type: 'value' 
    },
    series: [
      {
        data: year.map((item)=>item.salary),
        type: 'line',
        smooth: true
      }
    ]
  };

  myChart.setOption(option)
}
//bingtu
function initSalaryChart(salaryData){
  const myChart=echarts.init(document.querySelector('#salary'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    title:{text:'班级薪水分布',
      top:15,
      left:10,
      textStyle:{
        fontSize:16
      }
    },
    color:['#fda224','#5097ff','#3abcfa','#34d39a'],
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '班级薪水',
    
        type: 'pie',
         center: ['50%', '45%'],
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: '40',
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        // data: [
          // { value: 1048, name: '1万以下' },
          // { value: 735, name: '1-1.5万' },
          // { value: 580, name: '1.5-2万' },
          // { value: 484, name: '2万以上' },
          data:salaryData.map( item => {
            return{
              name:item.label,
              value:item.g_count+item.b_count
            }
           })
          
     
    }
  ]
  
    myChart.setOption(option)
  }
//   傲娇软萌桃幺幺丶
 }