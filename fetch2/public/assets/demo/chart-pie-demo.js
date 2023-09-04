// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

//fetch JSON
fetch('/data')
  .then(response => response.json())
  .then(data => {
    const behaviours = [];
    const score = [];

    data["driving-history"].forEach(item => {
      behaviours.push(item.behavior);
      score.push(item.score);
    });
	
// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: behaviours,
    datasets: [{
      data: score,
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  }
});
  });
