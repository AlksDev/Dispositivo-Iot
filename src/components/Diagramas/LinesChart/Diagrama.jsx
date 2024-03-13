
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { formatISO, parseISO } from 'date-fns';
import 'chartjs-adapter-date-fns';

export default function Diagrama() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://thingspeak.com/channels/2347639/feeds.json?api_key=QO5H0BC5NYYJ4DQI&results=10'
        );

        if (response.ok) {
          const jsonData = await response.json();
          const formattedData = jsonData.feeds.map(feed => ({
            ...feed,
            created_at: formatISO(parseISO(feed.created_at)),
          }));
          setData({ feeds: formattedData });
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const labels = data.feeds.map(feed => feed.created_at);
      const values = data.feeds.map(feed => parseFloat(feed.field1));

      const ctx = document.getElementById('myChart');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels.reverse(),
          datasets: [
            {
              label: 'Datos del campo 1',
              data: values.reverse(),
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'yyyy-MM-dd\'T\'HH:mm:ssxxx', // Formato de fecha esperado por Chart.js
                tooltipFormat: 'dd/MM/yyyy HH:mm', // Formato de fecha para el tooltip
              },
              title: {
                display: true,
                text: 'Fecha',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Valor',
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}
