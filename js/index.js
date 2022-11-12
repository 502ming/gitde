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
 initMapChart(data.provinceData)
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







const initMapChart = (provinceData) => {
  const myEchart = echarts.init(document.querySelector('#map'))
  console.log(provinceData)
  // 默认数据项
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]
  // 需要将后台返回的数据项，匹配设置给默认的数据项
  // 遍历dataList, 依次在后台返回的数据中找，看有没有相同name的项，如果有，更新一下value
  dataList.forEach(item => {
    // 尝试拿item.name去provinceData数组中找对应项
    const obj = provinceData.find(v => {
      const regExp = /省|回族自治区|维吾尔自治区|壮族自治区|特别行政区|自治区/g
      return v.name.replace(regExp, '') === item.name
    })
    // 找到了，说明有这个省份的同学，更新
    if (obj) {
      item.value = obj.value
    }
  })

  let option = {
    title: {
      text: '籍贯分布',
      top: 20,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myEchart.setOption(option)
}

