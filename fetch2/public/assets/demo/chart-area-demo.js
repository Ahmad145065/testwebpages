// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myLineChart");

// Define variables for the behavior and score cards
const behaviorCard = document.getElementById('behavior-card');
const scoreCard = document.getElementById('score-card');

// Define a function to fetch the latest data and update the chart and cards
function fetchLatestDataAndUpdateChartAndCards() {
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      // Update the behavior and score cards with the latest data
      const latestItem = data["driving-history"][data["driving-history"].length - 1];
      const latestBehavior = latestItem.behavior;
      const latestScore = latestItem.score;
      behaviorCard.textContent = `Behavior: ${latestBehavior}`;
      scoreCard.textContent = `Score: ${latestScore}`;

      // Update the chart with the new data
      const behaviours = [];
      const scores = [];
      const times = [];

      data["driving-history"].forEach(item => {
        behaviours.push(item.behavior);
        scores.push(item.score);
        times.push(item.time);
      });

      const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: "Score",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: scores,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'time'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 1,
                maxTicksLimit: 7
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
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

// Call the function to fetch the latest data and update the chart and cards initially
fetchLatestDataAndUpdateChartAndCards();

// Set up the auto-refresh feature
setInterval(fetchLatestDataAndUpdateChartAndCards, 30000); // Refresh every 30 seconds
