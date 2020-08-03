import React, { useState } from 'react'
import Chart from 'react-apexcharts'
export default function LineChart() {
  // eslint-disable-next-line
  const [state,setState] = useState({
    option: {
      colors:['#191919'],
      chart: {
        id: "chart1",
        type: "area",
        height: "100%",
        width:"100%",
        // foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false
        }
      },
      stroke: {
        curve: 'smooth'
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "datetime",
        categories:['ques1','ques2','ques3'],
        labels: {
          style: {
            colors: ["#fff"],
            fontSize: '12px',
            fontFamily: 'SoleilW01-Book',
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-label',
            rotate:95
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM",
            day: 'MMM',
            hour: 'MMM',
          },
        },
        tooltip: {
          enabled: false
        }
      },
      grid: {
        borderColor: "#eee",
      //   clipMarkers: false,
        yaxis: {
          lines: {
            show: false
          }
        },
        xaxis: {
          lines: {
            show: true
          }
        },
      },
      tooltip: {
        theme: "light",
        style:{
            color:["#191919"],
          fontFamily: 'SoleilW01-Book',
        },
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            return "Students : " + value
          },
        },
        x: {
          show: true
        }
      }
    },
    series: [{
      name: "",
      data: [
        [ 30.95],
        [ 31.34],
        [ 31.18],
        [1327618800000, 31.05],
        [1327878000000, 31.00],
        [1327964400000, 30.95],
        [1328050800000, 31.24],
        [1328137200000, 31.29],
        [1328223600000, 31.85],
        [1328482800000, 31.86],
        [1328569200000, 32.28],
        [1328655600000, 32.10],
        [1328742000000, 32.65],
        [1328828400000, 32.21],
        [1329087600000, 32.35],
        [1329174000000, 32.44],
        [1329260400000, 32.46],
        [1329346800000, 32.86],
        [1329433200000, 32.75],
        [1329778800000, 32.54],
        [1329865200000, 32.33],
        [1329951600000, 32.97],
        [1330038000000, 33.41],
        [1330297200000, 33.27],
        [1330383600000, 33.27],
        [1330470000000, 32.89],
        [1330556400000, 33.10],
        [1330642800000, 33.73],
        [1330902000000, 33.22],
        [1330988400000, 31.99],
        [1331074800000, 32.41],
        [1331161200000, 33.05],
        [1331247600000, 33.64],
        [1331506800000, 33.56],
        [1331593200000, 34.22],
        [1331679600000, 33.77],
        [1331766000000, 34.17],
        [1331852400000, 33.82],
        [1332111600000, 34.51],
        [1332198000000, 33.16],
        [1332284400000, 33.56],
      ],
    }]
  })
  return (
      <div>
        <Chart options={state.option} series={state.series} type="area" />
      </div>
  )
}