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
 initGroupChart(data.groupData)
 initGenderChart(data.salaryData)
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
}
  
    myChart.setOption(option)
  }
//班级每组薪资
function initGroupChart(groupData){
  const myChart=echarts.init(document.querySelector('#lines'))
const option = {
  xAxis: {
    
    type: 'category',
    data: groupData[1].map(item=>item.name),
  },
  yAxis: {
   
    type: 'value'
  },
  tooltip:{
    trigger:'item'
  },
  series: [
    {
      name: '期望薪资',
      data: groupData[1].map(item=>item.hope_salary),
      type: 'bar'
    },
    {
       name: '实际薪资',
       data: groupData[1].map(item=>item.salary),
      type: 'bar'
    }
  ]
};
 myChart.setOption(option)

const btns=document.querySelector('#btns')
btns.addEventListener('click', e=>{
  if(e.target.tagName==='BUTTON'){
    btns.querySelector('.btn-blue').classList.remove('btn-blue')
    e.target.classList.add('btn-blue')
    const group=e.target.innerText
    option.xAxis.data=groupData[group].map(item=>item.name)
    option.series[0].data=groupData[group].map(item=>item.hope_salary)
    option.series[1].data=groupData[group].map(item=>item.salary)
    myChart.setOption(option)
  }
})




}




//nannv

function initGenderChart(salaryData){
  const myChart=echarts.init(document.querySelector('#gender'))
  const option = {
    title: [{
      text: '男女薪资分布',
      left:10,
      top:10
    },
    {
      text: '男',
      left:'center',
      top: '48%',
    },
     {
      text: '女',
      left:'center',
      top:'88%',
    }],
    tooltip: {
      trigger: 'item'
    },
    color:['#fda224','#5097ff','#3abcfa','#34d39a'],
    series: [
      {
        name: '男生',
        type: 'pie',
        radius: ['20%','30%'],
        center:['50%','30%'],
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ],
       data:salaryData.map(item=>({
      
          name:item.label,
          value:item.b_count,
        
       }))
      },
      {
        name: '男生',
        type: 'pie',
        radius: ['20%','30%'],
        center:['50%','70%'],
        data:salaryData.map(item=>({
      
          name:item.label,
          value:item.g_count,
        
       }))
      }
      
    ]
  };
  
    myChart.setOption(option)
  
}