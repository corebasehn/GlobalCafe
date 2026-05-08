import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Chart as ChartJS, registerables } from "chart.js";
import { ApexOptions } from "apexcharts";

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
ChartJS.register(...registerables);



//dashboard1
interface spark3 {
  options?: ApexOptions,
  width?: string | number,
  height?: string | number,
  series?: ApexOptions['series'],
  [key: string]: any
  label?: XAxisAnnotations
  endingShape?: string
}

export class Statistics1 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'Total Orders',
        data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
      }, {
        name: 'Total Sales',
        data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
      }],

      options: {
        chart: {
          type: 'bar',
          height: 280
        },
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#ebeff5'
              }, {
                from: -45,
                to: 0,
                color: '#ebeff5'
              }]
            },
            columnWidth: '40%',
          }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 4,
          colors: ['transparent']
        },
        legend: {
          show: true,
          position: 'top',
        },
        yaxis: {
          title: {
            text: 'Growth',
            style: {
              color: '#adb5be',
              fontSize: '14px',
              fontFamily: 'poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
          axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',

            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90
          }
        }
      },

    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={280} />
      </div>
    );
  }
}

export class Viewers extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'Male',
        data: [51, 44, 55, 42, 58, 50, 62],
      }, {
        name: 'Female',
        data: [56, 58, 38, 50, 64, 45, 55]
      }],

      options: {
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          },
          height: 310,
          type: 'line',
          toolbar: {
            show: false,
          },
          background: 'none',
        },
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        legend: {
          show: true,
          position: 'top',
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90,
          }
        },
        yaxis: {
          show: false,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },

    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={310} />
      </div>
    );
  }
}


export class Radialbar extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [85],
      options: {
        colors: ['var(--primary-color)'],
        states: {
          normal: {
            filter: {
              type: 'none',
            }
          },
          hover: {
            filter: {
              type: 'none',
            }
          },
          active: {
            filter: {
              type: 'none',
            }
          },
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            hollow: {
              margin: 20,
              size: "50%",
              background: "#fff",
             
            },
            dataLabels: {
              name: {
                show: false,
                fontSize: '16px',
                color: undefined,
                offsetY: 5
              },
              value: {
                show: false,
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
              }
            }
          },
        },
        chart: {
          height: 170,
          width: 170,
          type: 'radialBar',
          
        },
        stroke: {
          lineCap: 'round',
          width: 5,
        },
        
        labels: [""],
      },


    };
  }



  render() {
    return (
      <div>
        <div id='radialbar-basic1'>
          <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={170} width={170} />
        </div>
      </div>
    );
  }
}

//dashboard2

//Sales Activity
export class Statistics2 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      series: [{
        name: "Sales",
        data: [32, 15, 63, 51, 136, 62, 99, 42, 178, 76, 32, 180]
      }],
      options: {
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          },
          height: 285,
          type: 'line',
          zoom: {
            enabled: false
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: -15,
          fontWeight: "bold",
        },
        stroke: {
          curve: 'smooth',
          width: '3'
        } as any,
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ['var(--primary-color)'],
        yaxis: {
          title: {
            text: 'Growth',
            style: {
              color: '#adb5be',
              fontSize: '14px',
              fontFamily: 'poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
          } as any,
          labels: {
            rotate: -90
          }
        }
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={285} />
      </div>
    );
  }
}

export class Budget extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'This Week',
        data: [44, 42, 57, 86, 58, 55, 70],
      }, {
        name: 'Last Week',
        data: [-34, -22, -37, -56, -21, -35, -60],
      }],
      options: {
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          },
          stacked: true,
          type: 'bar',
          height: 280,
        },
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        plotOptions: {
          bar: {
            borderRadius: 5,
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#ebeff5'
              }, {
                from: -45,
                to: 0,
                color: '#ebeff5'
              }]
            },
            columnWidth: '25%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all'
          }
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: 'top',
        },
        yaxis: {
          title: {
            style: {
              color: '#adb5be',
              fontSize: '14px',
              fontFamily: 'poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat'],
          axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90
          }
        }
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={260} />
      </div>
    );
  }
}

export class Viewers1 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [{
        name: 'Male',
        data: [51, 44, 55, 42, 58, 50, 62],
      }, {
        name: 'Female',
        data: [56, 58, 38, 50, 64, 45, 55]
      }],
      options: {
        chart: {
          height: 275,
          type: 'line',
          toolbar: {
            show: false,
          },
          background: 'none',
          // fill: "#fff",
        },
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        // background: 'transparent',
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          width: 2
        },
        // dataLabels: {
        //   enabled: false,
        // },
        legend: {
          show: true,
          position: 'top',
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90,
          }
        },
        yaxis: {
          show: false,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={255} />
      </div>
    );
  }
}

//dashboard3

export class Statistics3 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'active',
        data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
      }, {
        name: 'inactive',
        data: [-34, -22, -37, -56, -21, -35, -60, -34, -56, -78, -89, -53],
      }],
      options: {
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          },
          stacked: true,
          type: 'bar',
          height: 370,
        },
        grid: {
          borderColor: '#f2f6f7',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        plotOptions: {
          bar: {
            borderRadius: 5,
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#ebeff5'
              }, {
                from: -45,
                to: 0,
                color: '#ebeff5'
              }]
            },
            columnWidth: '25%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all'
          }
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: 'top',
        },
        yaxis: {
          title: {
            text: 'Growth',
            style: {
              color: '	#adb5be',
              fontSize: '14px',
              fontFamily: 'poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
          axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90
          }
        }
      },

    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={370} />
      </div>
    );
  }
}

export class Viewers3 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      series: [{
        name: 'Male',
        data: [44, 42, 57, 86, 58, 55, 70],

      }, {
        name: 'Female',
        data: [34, 22, 47, 56, 21, 35, 60],

      }
      ],
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          height: 338,
        },
        grid: {
          borderColor: '#eff2f6',
        },
        colors: ["var(--primary-color)", "var(--primary02)"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
          },
        },

        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        }, yaxis: {
          title: {
            style: {
              color: '	#adb5be',
              fontSize: '14px',
              fontFamily: 'poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',

            offsetX: 0,
            offsetY: 0
          },
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top"
        },

      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={340} />
      </div>
    );
  }
}

// Stacked Bar

export class Apexcharts1 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'Data 1',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Data 2',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Data 3',
        data: [12, 17, 11, 9, 15, 11, 20]
      }, {
        name: 'Data 4',
        data: [9, 7, 5, 8, 6, 9, 4]
      }, {
        name: 'Data 5',
        data: [25, 12, 19, 32, 25, 24, 10]
      }],
      options: {
        dataLabels: {
          enabled: false
        },
        chart: {
          type: 'bar',
          height: 350,
          width: 350,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },

        xaxis: {
          categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
          labels: {
            formatter: function (val) {
              return val + 'K';
            },
            rotate: -90
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + 'K';
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      }

    };
  }

  render() {
    return (

      <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} />

    );
  }
}

// AreaChart

export class Apexcharts2 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [
        {
          name: 'South',
          data: [120, 232, 301, 434, 290, 130, 410]
        },
        {
          name: 'North',
          data: [520, 432, 601, 634, 390, 330, 520]
        },
        {
          name: 'Central',
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ],
      options: {
        chart: {
          type: 'area',
          height: 350,
          stacked: true

        },
        colors: ['#f1b7c4', '#8a9ce4', '#c1c2f0'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8
          }
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }

    };
  }

  render() {
    return (

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={300} />
      </div>
    );
  }
}

// Mixed Line Column Area

export class Apexcharts3 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [{
        name: 'Data A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        color: '#f7557a'
      }, {
        name: 'Data B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        color: '#285cf7'
      }, {
        name: 'Data C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        color: '#4ecc48'
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],

        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {

          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' points';
              }
              return y;
            }
          }
        }
      }
    };
  }

  render() {
    return (

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>

    );
  }
}
export class Apexcharts4 extends React.Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {

      series: [21, 65, 33, 43, 59, 63],

      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 400,
          options: {
            chart: {
              width: 250
            },
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
          }
        },
        {
          breakpoint: 1004,
          options: {
            chart: {
              width: 280
            },
          }
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 300
            },
          }
        },]
      },

    };
  }

  render() {
    return (

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={410} />
      </div>

    );
  }
}

//chartjs

export const Linechart = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
    },
    y: {
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
    },
  },
};
// linechartdata
export const linechartdata = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [12, 15, 18, 40, 35, 38, 32, 20, 25, 15, 25, 30],
      borderColor: "#38cab3 ",
      borderWidth: 1,

      tension: 0.4,
    },
    {
      data: [10, 20, 25, 55, 50, 45, 35, 30, 45, 35, 55, 40, 80],
      borderColor: "#f74f75",
      borderWidth: 1,

      tension: 0.4,
    },
  ],

};
// Bar-chart 1
export const Barchart1 = {

  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const barchart1data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",],
  datasets: [
    {
      data: [10, 24, 20, 25, 35, 50],
      backgroundColor: "#f74f75",
      borderWidth: 1,
      fill: true,
    },
    {
      data: [10, 24, 20, 25, 35, 50],
      backgroundColor: "#d462f9",
      borderWidth: 1,
      fill: true,
    },
    {
      data: [20, 30, 28, 33, 45, 65],
      backgroundColor: "#e5bcf3",
      borderWidth: 1,
      fill: true,
    },
  ],
};
//Horizontalbar
export const Horizontalbarchart: any = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },

};
export const Horizontalbarchartdata = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [10, 24, 20, 25, 35, 50],
      backgroundColor: "#f74f75",
      borderWidth: 1,
      fill: true,
    },
    {
      data: [10, 24, 20, 25, 35, 50],
      backgroundColor: "#d462f9",
      borderWidth: 1,
      fill: true,
    },
    {
      data: [20, 30, 28, 33, 45, 65],
      backgroundColor: "#e5bcf3",
      borderWidth: 1,
      fill: true,
    },
  ],
};

// Solid Color 
export const SolidColor = {

  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const SolidColordata = {
  type: "bar",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 39, 20, 10, 25, 18, 80],
      backgroundColor: "#38cab3",
    },
  ],
};

// With Transparency 
export const Transparency = {

  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const Transparencydata = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 39, 20, 10, 25, 18],
      backgroundColor: "rgba(254, 78, 140, .5)",
    },
  ],
};

// Using Gradient Color 
export const GradientColor = {

  responsive: true,
  scales: {
    x: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      stacked: true,
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      stacked: true,
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const GradientColordata = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 39, 20, 10, 25, 18],
      backgroundColor: "#41acb5",
      hoverBackgroundColor: "#38cab3",
    },
  ],
};
export const Horizontalbarchart1: any = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const Horizontalbarchartdata1 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    label: '# of Votes',
    data: [12, 39, 20, 10, 25, 18, 80],
    backgroundColor: ['#6d26be', '#ffbd5a', '#38cab3', '#673ab7', '#ffc107', '#1a9c86']
  }]
};
export const Horizontalbarchart2: any = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {

    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
    y: {
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
    },
  },
};
export const Horizontalbarchartdata2 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 39, 20, 10, 25, 18],
      backgroundColor: [
        "#6d26be",
        "#ffbd5a",
        "#673ab7",
        "#ffc107",
        "#1a9c86",
        "#7571f9",
      ],
    },
    {
      data: [22, 30, 25, 30, 20, 40, 80],
      backgroundColor: "rgba(0,123,255,.5)",
    },
  ],
};

export const dchart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [20, 20, 30, 5, 25],
      backgroundColor: ["#6d26be", "#ffbd5a", "#4ec2f0", "#1a9c86", "#f74f75"],
    },
  ],
  hoverOffset: 4,
};

//  piechart
export const piechart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [20, 20, 30, 5, 25],
      backgroundColor: ["#6d26be", "#ffbd5a", "#4ec2f0", "#1a9c86", "#f74f75"],
    },
  ],
  hoverOffset: 4,
};

export const Areachart = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
    },
    y: {
      ticks: {
        color: "rgba(171, 167, 167,0.9)",
      },
      grid: {
        color: "rgba(171, 167, 167,0.2)",
      },
    },
  },

};
//areachart
export const areachart: any = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Data 1 ",
      borderColor: "#f74f75",
      borderWidth: "1",
      pointHighlightStroke: "rgba(235, 111, 51 ,1)",
      data: [16, 32, 18, 26, 42, 33, 44],
      fill: true,
      tension: 0.4,
    },
    {
      label: "Data 2",
      borderColor: "#38cab3",
      borderWidth: "1",
      data: [22, 44, 67, 43, 76, 45, 12],
      fill: true,
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x:
      {
        ticks: {
          fontColor: "#77778e",
        },
        gridLines: {
          color: "rgba(119, 119, 142, 0.2)",
        },
      },

      y:
      {
        ticks: {
          beginAtZero: true,
          fontColor: "#77778e",
        },
        gridLines: {
          color: "rgba(119, 119, 142, 0.2)",
        },
      },

    },

  },
};

//echarts

//echart1
export const echart1 = {
  option: {
    valueAxis: {
      axisLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(171, 167, 167,0.2)"],
        },
      },
      splitLine: {
        lineStyle: {
          color: ["rgba(171, 167, 167,0.2)"],
        },
      },
    },
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    xAxis: {
      data: ["2014", "2015", "2016", "2017", "2018", "2019"],
      axisLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#5f6d7a",
      },
    },
    tooltip: {
      trigger: "axis",
      position: ["35%", "32%"],
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#5f6d7a",
      },
    },
    series: [
      {
        name: "sales",
        type: "bar",
        barMaxWidth: 20,
        data: [10, 15, 9, 18, 10, 15],
        color: "#38cab3",
      },
      {
        name: "growth",
        type: "bar",
        barMaxWidth: 20,
        data: [10, 14, 10, 15, 9, 25],
        color: "#f74f75",
      },
    ],
  },
};
//echart2
export const echart2 = {
  option: {
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    xAxis: {
      data: ["2014", "2015", "2016", "2017", "2018", "2019"],
      splitLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#5f6d7a",
      },
    },
    tooltip: {
      trigger: "axis",
      position: ["35%", "32%"],
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(171, 167, 167,0.2)",
        },
      },
      axisLabel: {
        fontSize: 10,
        color: "#5f6d7a",
      },
    },
    color: ["#38cab3", "#f74f75"],
    series: [
      {
        name: "sales",
        type: "line",
        smooth: true,
        data: [10, 15, 9, 18, 10, 15],
        color: ["#38cab3"],
      },
      {
        name: "Profit",
        type: "line",
        smooth: true,
        size: 10,
        data: [10, 14, 10, 15, 9, 25],
        color: ["#f74f75"],
      },
    ],
  },
};
//echart3
export const echart3 = {
  option: {
    grid: {
      left: "6%",
      right: "3%",
      bottom: "8%",
      top: "3%",
    },

    xAxis: [
      {
        type: "value",
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        data: ["2014", "2015", "2016", "2017", "2018", "2019"],
      },
      {
        type: "value",
      },
      {
        type: "value",
      },
    ],
    color: ["#38cab3", "#f74f75"],
    series: [
      {
        name: "sales",
        type: "bar",
        barMaxWidth: 20,
        data: [10, 15, 9, 18, 10, 15],
      },
      {
        name: "growth",
        type: "bar",
        barMaxWidth: 20,
        data: [10, 14, 10, 15, 9, 25],
      },
    ],
  },
};
//echart4
export const echart4 = {
  option: {
    legend: {},
    grid: {
      top: 10,
      bottom: 30,
    },
    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        data: ["2014", "2015", "2016", "2017", "2018", "2019"],
      },
    ],
    color: ["#38cab3", "#f74f75"],
    series: [
      {
        name: "sales",
        type: "line",
        smooth: true,
        data: [10, 15, 9, 18, 10, 15],
        color: ["#38cab3"],
      },
      {
        name: "Profit",
        type: "line",
        smooth: true,
        size: 10,
        data: [10, 14, 10, 15, 9, 25],
        color: ["#f74f75"],
      },
    ],
  },
};
//echart5

// BasicLine Chart
export function Basicechart() {
  const option = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        },
        splitLine: {
          lineStyle: {
            color: "rgba(142, 156, 173,0.1)"
          }
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}


//Smoothline Chart
export function SmoothlineChart() {
  const option = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Basic area chart
export function Basicareaechart() {
  const option = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Stacked line
export function Stackedline() {
  const option = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      textStyle: {
        color: '#777'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#4ec2f0", "#f34343"]
  };

  return (<ReactECharts option={option} />);
}

//Stacked area 

export function Stackedarea() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      textStyle: {
        color: '#777'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: "#8c9097"
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: "#8c9097"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(142, 156, 173,0.1)"
          }
        }
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#4ec2f0", "#f34343"]
  };

  return (<ReactECharts option={option} />);
}

//Steplineechart
export function Steplineechart() {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Step Start', 'Step Middle', 'Step End'],
      textStyle: {
        color: '#777'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: 'Step Start',
        type: 'line',
        step: 'start',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Step Middle',
        type: 'line',
        step: 'middle',
        data: [220, 282, 201, 234, 290, 430, 410]
      },
      {
        name: 'Step End',
        type: 'line',
        step: 'end',
        data: [450, 432, 401, 454, 590, 530, 510]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#4ec2f0", "#f34343"]
  };

  return (<ReactECharts option={option} />);
}

//Basicbarechart
export function Basicbarechart() {
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Backgroundechart

export function Backgroundechart() {
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Singlebarchart
export function Singlebarechart() {
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#4ec2f0'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
        type: 'bar'
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Waterfallechart
export function Waterfallechart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        var tar = params[1];
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: [0, 1700, 1400, 1200, 300, 0]
      },
      {
        name: 'Life Cost',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'inside'
        },
        data: [2900, 1200, 300, 200, 900, 300]
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Negativeechart

export function Negativeechart() {
  const labelRight = {
    position: 'right'
  };
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      type: 'category',
      axisLabel: { show: false },
      axisTick: { show: false },
      data: [
        'ten',
        'nine',
        'eight',
        'seven',
        'six',
        'five',
        'four',
        'three',
        'two',
        'one'
      ],
      axisLine: {
        show: false,
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: 'Cost',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          formatter: '{b}'
        },
        data: [
          { value: -0.07, label: labelRight },
          { value: -0.09, label: labelRight },
          0.2,
          0.44,
          { value: -0.23, label: labelRight },
          0.08,
          { value: -0.17, label: labelRight },
          0.47,
          { value: -0.36, label: labelRight },
          0.18
        ]
      }
    ],
    color: "#38cab3"
  };

  return (<ReactECharts option={option} />);
}

//Horizontalechart

export function Horizontalechart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle: {
        color: '#777'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ],
    color: ["#38cab3", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Horizontalstackechart

export function Horizontalstackechart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      textStyle: {
        color: '#777'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Affiliate Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: 'Search Engine',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#f34343", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Pieechart

export function Pieechart() {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#777'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#f34343", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Doughnutchart

export function Doughnutchart() {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center',
      textStyle: {
        color: '#777'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '17',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#f34343", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Basicscatter
export function Basicscatter() {
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: 'scatter'
      }
    ],
    color: ["#38cab3"]
  };

  return (<ReactECharts option={option} />);
}

//Bubblechart
export function Bubblechart() {

  const data = [
    [
      [28604, 77, 17096869, 'Australia', 1990],
      [31163, 77.4, 27662440, 'Canada', 1990],
      [1516, 68, 1154605773, 'China', 1990],
      [13670, 74.7, 10582082, 'Cuba', 1990],
      [28599, 75, 4986705, 'Finland', 1990],
      [29476, 77.1, 56943299, 'France', 1990],
      [31476, 75.4, 78958237, 'Germany', 1990],
      [28666, 78.1, 254830, 'Iceland', 1990],
      [1777, 57.7, 870601776, 'India', 1990],
      [29550, 79.1, 122249285, 'Japan', 1990],
      [2076, 67.9, 20194354, 'North Korea', 1990],
      [12087, 72, 42972254, 'South Korea', 1990],
      [24021, 75.4, 3397534, 'New Zealand', 1990],
      [43296, 76.8, 4240375, 'Norway', 1990],
      [10088, 70.8, 38195258, 'Poland', 1990],
      [19349, 69.6, 147568552, 'Russia', 1990],
      [10670, 67.3, 53994605, 'Turkey', 1990],
      [26424, 75.7, 57110117, 'United Kingdom', 1990],
      [37062, 75.4, 252847810, 'United States', 1990]
    ],
    [
      [44056, 81.8, 23968973, 'Australia', 2015],
      [43294, 81.7, 35939927, 'Canada', 2015],
      [13334, 76.9, 1376048943, 'China', 2015],
      [21291, 78.5, 11389562, 'Cuba', 2015],
      [38923, 80.8, 5503457, 'Finland', 2015],
      [37599, 81.9, 64395345, 'France', 2015],
      [44053, 81.1, 80688545, 'Germany', 2015],
      [42182, 82.8, 329425, 'Iceland', 2015],
      [5903, 66.8, 1311050527, 'India', 2015],
      [36162, 83.5, 126573481, 'Japan', 2015],
      [1390, 71.4, 25155317, 'North Korea', 2015],
      [34644, 80.7, 50293439, 'South Korea', 2015],
      [34186, 80.6, 4528526, 'New Zealand', 2015],
      [64304, 81.6, 5210967, 'Norway', 2015],
      [24787, 77.3, 38611794, 'Poland', 2015],
      [23038, 73.13, 143456918, 'Russia', 2015],
      [19360, 76.5, 78665830, 'Turkey', 2015],
      [38225, 81.4, 64715810, 'United Kingdom', 2015],
      [53354, 79.1, 321773631, 'United States', 2015]
    ]
  ];
  const option = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: 'transparent'
      },
      {
        offset: 1,
        color: 'transparent'
      }
    ]),
    legend: {
      right: '10%',
      top: '3%',
      data: ['1990', '2015'],
      textStyle: {
        color: '#777'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%'
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      scale: true
    },
    series: [
      {
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data: any) {
          return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter: function (param: any) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(94, 154, 166)'
            },
            {
              offset: 1,
              color: 'rgb(94, 154, 166)'
            }
          ])
        }
      },
      {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data: any) {
          return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter: function (param: any) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(185, 93, 75)'
            },
            {
              offset: 1,
              color: 'rgb(185, 93, 75)'
            }
          ])
        }
      }
    ],
    color: ["#4ec2f0", "#f34343"]
  };

  return (<ReactECharts option={option} />);
}

//Candlestickechart
export function Candlestickechart() {

  const option = {
    grid: {
      left: '5%',
      right: '0%',
      bottom: '10%',
      top: '10%'
    },
    xAxis: {
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      }
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
    },
    series: [
      {
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42]
        ],
        itemStyle: {
          normal: {
            color: "#38cab3",
            color0: "#4ec2f0",
            borderColor: "#38cab3",
            borderColor0: "#4ec2f0",
          }
        }
      }
    ]
  };

  return (<ReactECharts option={option} />);
}

//Basicradarechart

export function Basicradarechart() {

  const option = {
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
      left: '0%',
      top: '0%',
      textStyle: {
        color: '#777'
      }
    },
    radar: {
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ],
    color: ["#38cab3", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Heatmapechart

export function Heatmapechart() {

  function getVirtulData(year: any) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate(+year + 1 + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000)
      ]);
    }
    return data;
  }

  const option = {
    title: {
      top: 30,
      left: 'center',
      text: 'Daily Step Count'
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10000,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: '2016',
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData('2016')
    }
  };

  return (<ReactECharts option={option} />);
}

//Treemapechart

export function Treemapechart() {

  const option = {
    series: [
      {
        type: 'treemap',
        data: [
          {
            name: 'nodeA',
            value: 10,
            children: [
              {
                name: 'nodeAa',
                value: 4
              },
              {
                name: 'nodeAb',
                value: 6
              }
            ]
          },
          {
            name: 'nodeB',
            value: 20,
            children: [
              {
                name: 'nodeBa',
                value: 20,
                children: [
                  {
                    name: 'nodeBa1',
                    value: 20
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    color: ["#38cab3", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Funnelechart

export function Funnelechart() {

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
      textStyle: {
        color: '#777'
      }
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 60, name: 'Visit' },
          { value: 40, name: 'Inquiry' },
          { value: 20, name: 'Order' },
          { value: 80, name: 'Click' },
          { value: 100, name: 'Show' }
        ]
      }
    ],
    color: ["#38cab3", "#4ec2f0", "#ffbd5a", "#f34343", "#4ec2f0"]
  };

  return (<ReactECharts option={option} />);
}

//Gaugeechart

export function Gaugeechart() {

  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ],
    color: ["#38cab3"]
  };

  return (<ReactECharts option={option} />);
}

//Simplegraph

export function Simplegraph() {

  const option = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: [
          {
            name: 'Node 1',
            x: 300,
            y: 300
          },
          {
            name: 'Node 2',
            x: 800,
            y: 300
          },
          {
            name: 'Node 3',
            x: 550,
            y: 100
          },
          {
            name: 'Node 4',
            x: 550,
            y: 500
          }
        ],
        links: [
          {
            source: 0,
            target: 1,
            symbolSize: [5, 20],
            label: {
              show: true
            },
            lineStyle: {
              width: 5,
              curveness: 0.2
            }
          },
          {
            source: 'Node 2',
            target: 'Node 1',
            label: {
              show: true
            },
            lineStyle: {
              curveness: 0.2
            }
          },
          {
            source: 'Node 1',
            target: 'Node 3'
          },
          {
            source: 'Node 2',
            target: 'Node 3'
          },
          {
            source: 'Node 2',
            target: 'Node 4'
          },
          {
            source: 'Node 1',
            target: 'Node 4'
          }
        ],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ],
    color: ["#38cab3"]
  };

  return (<ReactECharts option={option} />);
}



//BarChart
export const BarChart = [
  {
    chart: {
      height: 500,
    },
    values: [
      {
        label: "A",
        value: 10,
        color: "#8983d7",
      },
      {
        label: "B",
        value: 35,
        color: "#f09366",
      },
      {
        label: "C",
        value: 150,
        color: "#47c2b0",
      },
      {
        label: "D",
        value: 120,
        color: "#8983d7",
      },
      {
        label: "E",
        value: 95,
        color: "#4597fa",
      },
      {
        label: "F",
        value: 13,
        color: "#fa5c77",
      },
      {
        label: "G",
        value: 10,
        color: "#51b9ca",
      },
    ],
  },
];
//BarChart2
export const BarChart2 = [
  {
    values: [
      {
        label: "1",
        value: 0.25,
        color: "#6259ca",
      },
      {
        label: "2",
        value: 1.76,
        color: "#6259ca",
      },
      {
        label: "3",
        value: 2.23,
        color: "#6259ca",
      },
      {
        label: "4",
        value: 2.95,
        color: "#6259ca",
      },
      {
        label: "5",
        value: 3.09,
        color: "#6259ca",
      },
      {
        label: "6",
        value: 3.67,
        color: "#6259ca",
      },
      {
        label: "7",
        value: 3.33,
        color: "#6259ca",
      },
      {
        label: "8",
        value: 3.21,
        color: "#6259ca",
      },
      {
        label: "9",
        value: 3.67,
        color: "#6259ca",
      },
    ],
  },
];
//LineChart
export function LineChart() {
  const sin = [],
    cos = [];
  for (let i = 0; i < 100; i++) {
    sin.push({ x: i, y: Math.sin(i / 10) });
    cos.push({ x: i, y: 0.5 * Math.cos(i / 10) });
  }

  return [
    {
      values: sin,
      key: "Sine Wave",
      color: "#ff7f0e",
    },
    {
      values: cos,
      key: "Cosine Wave",
      color: "#2ca02c",
    },
  ];
}

