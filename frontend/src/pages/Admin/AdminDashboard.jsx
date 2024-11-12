import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaSalesforce, FaFunnelDollar, FaDollarSign, FaListUl } from 'react-icons/fa';

const AdminDashboard = () => {
  const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    series: [
      { name: "Total Sales", data: [], type: 'bar' },
      { name: "Average Order Value", data: [], type: 'line' },
      { name: "Orders Count", data: [], type: 'area' }
    ]
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedData = salesDetail.map((item) => ({
        date: item._id,
        totalSales: item.totalSales,
        orderCount: item.orderCount || 0,
        averageOrder: item.totalSales / (item.orderCount || 1)
      }));

      setChartData({
        series: [
          {
            name: "Total Sales",
            data: formattedData.map(item => item.totalSales),
            type: 'bar'
          },
          {
            name: "Average Order Value",
            data: formattedData.map(item => item.averageOrder),
            type: 'line'
          },
          {
            name: "Orders Count",
            data: formattedData.map(item => item.orderCount),
            type: 'area'
          }
        ]
      });
    }
  }, [salesDetail]);

  const chartOptions = {
    chart: {
      height: 400,
      type: 'line',
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: 'zoom'
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: ['#00E396', '#008FFB', '#FEB019'],
    stroke: {
      width: [0, 2, 1],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 5
      }
    },
    fill: {
      opacity: [0.85, 1, 0.25],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: salesDetail?.map(item => item._id) || [],
    markers: {
      size: [0, 4, 0],
      strokeWidth: 2,
      hover: {
        size: 9
      }
    },
    title: {
      text: 'Sales Analytics',
      align: 'left',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    subtitle: {
      text: 'Sales metrics over time',
      align: 'left'
    },
    yaxis: [
      {
        title: {
          text: "Total Sales ($)",
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        },
        labels: {
          formatter: (value) => `$${value.toFixed(2)}`
        }
      },
      {
        opposite: true,
        title: {
          text: "Average Order Value ($)",
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        },
        labels: {
          formatter: (value) => `$${value.toFixed(2)}`
        }
      },
      {
        opposite: true,
        title: {
          text: "Order Count",
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        },
        labels: {
          formatter: (value) => Math.round(value)
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      y: {
        formatter: function (value, { seriesIndex }) {
          if (seriesIndex === 2) return Math.round(value) + " orders";
          return "$" + value.toFixed(2);
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
      offsetX: -5
    },
    grid: {
      borderColor: '#e0e0e0',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
            offsetX: 0,
            offsetY: 0
          }
        }
      }
    ]
  };

  return (
    <>
      <section className="xl:ml-[4rem] md:ml-[0rem] mt-5">
        <div className="flex justify-between flex-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border border-gray-200 bg-blue-500 py-12 p-6 flex justify-between gap-10 items-center text-white">
              <div>
                <p className="text-xl">Sales</p>
                <h1 className="text-xl font-bold">
                  {salesLoading ? <Loader /> : `$${sales?.totalSales.toFixed(2)}`}
                </h1>
              </div>
              <div className="font-bold rounded-full w-[3rem] bg-blue-500 text-center p-3">
                <FaDollarSign size={35} />
              </div>
            </div>

            <div className="rounded-lg border bg-teal-500 p-6 flex justify-between gap-10 items-center text-white text-xl">
              <div>
                <p>Customers</p>
                <h1 className="font-bold">
                  {customersLoading ? <Loader /> : customers?.length}
                </h1>
              </div>
              <div className="font-bold rounded-full w-[3rem] bg-teal-500 text-center p-3">
                <FaListUl size={35} />
              </div>
            </div>

            <div className="rounded-lg border bg-orange-500 p-6 flex justify-between gap-10 items-center text-white text-xl">
              <div>
                <p>All Orders</p>
                <h1 className="text-xl font-bold">
                  {ordersLoading ? <Loader /> : orders?.totalOrders || 0}
                </h1>
              </div>
              <div className="font-bold rounded-full w-[3rem] bg-orange-500 text-center p-3">
                <FaListUl size={35} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 mr-8 p-8 border border-gray-200 bg-white rounded-lg shadow-sm">
          <Chart
            options={chartOptions}
            series={chartData.series}
            type="line"
            height={400}
            width="100%"
          />
        </div>

        <div className="mt-10">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;