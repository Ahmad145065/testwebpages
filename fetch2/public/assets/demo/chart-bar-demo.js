// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");

// Define a function to fetch the data and update the chart
function fetchAndRefreshChart() {
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      const behaviours = [];
      const score = [];
      const time = [];

      data["driving-history"].forEach(item => {
        behaviours.push(item.behavior);
        score.push(item.score);
        time.push(item.time);
      });

      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: time,
          datasets: [{
            label: "Time",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: score,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 's'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 6
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 1,
                maxTicksLimit: 5
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });
    });
}

// Fetch and refresh chart initially
fetchAndRefreshChart();

// Refresh chart every 15 seconds
setInterval(fetchAndRefreshChart, 15000);
