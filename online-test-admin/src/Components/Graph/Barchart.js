import React  from 'react';
import Chart from 'react-apexcharts'

function Barchart(props) {
 
  const data=[{
    name:'Student',
    data:props.data
  }]
  const state={
    option:{
      colors:['#191919'],
      chart:{
        type:'bar',
        height: "100%",
        width:"100%",
      },
      noData:{
        text:'Loading ...'
      },
    xaxis: {
        type: 'category',
        labels: {
          show: false,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          },
        }
    } 
    },
    stroke: {
        width: 1,
        colors: ["#fff"]
    },
    series: [],
    noData:{
        text:'Loading..'
    }
  }
  return (
    <div>
        <Chart options={state.option} series={data} type="bar" />
    </div>
  );
}

export default Barchart;
