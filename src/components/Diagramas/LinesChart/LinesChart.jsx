import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LinesChart = () => {
  const [distanceData, setDistanceData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Distance Readings',
        data: [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.6:81/distance'); // Replace with your ESP8266 IP
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const distance = await response.json();
      updateChartData(distance);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateChartData = (newDistance) => {
    const currentTime = new Date().toLocaleTimeString(); // Assuming the response contains timestamp
    setDistanceData((prevData) => ({
      labels: [...prevData.labels, currentTime],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, newDistance],
        },
      ],
    }));
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 3000); // Fetch data every 3 seconds, adjust as needed

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  const chartOptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Distance Readings',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100, // Adjust based on your sensor's range
      },
      x: {
        ticks: { color: 'red' },
      },
    },
  };

  return (
    <div>
      <h2>ESP8266 Distance Plot</h2>
      <Line data={distanceData} options={chartOptions} />
    </div>
  );
};

export default LinesChart;
