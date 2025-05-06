// Fetch input, process, and draw charts
function fetchArr() {
  const inputElement = document.getElementById("inputArr");
  const inputArr = inputElement.value.split(",").map(Number);
  showWaterAndBricks(inputArr);
  showOnlyWater(inputArr);
}

// Draws a bar chart using ECharts
function createTable(xAxis, dataArr, domId) {
  const dom = document.getElementById(domId);
  const chart = echarts.init(dom);
  const option = {
    xAxis: { type: "category", data: xAxis },
    yAxis: { type: "value" },
    series: [{ data: dataArr, type: "bar" }],
  };
  chart.setOption(option);
  window.addEventListener("resize", chart.resize);
}

// Counts water units (ignores "-")
function countWaterUnits(arr) {
  return arr.reduce((sum, val) => sum + (val !== "-" ? Number(val) : 0), 0);
}

// Main logic for water and bricks
function showWaterAndBricks(heights) {
  const leftMax = [],
    rightMax = [],
    waterArr = [],
    chartData = [];
  let maxLeft = 0,
    maxRight = 0;

  // Build left max array
  for (let h of heights) {
    if (h === 0) leftMax.push(maxLeft);
    else {
      leftMax.push("-");
      maxLeft = h;
    }
  }

  // Build right max array
  for (let i = heights.length - 1; i >= 0; i--) {
    if (heights[i] === 0) rightMax[i] = maxRight;
    else {
      rightMax[i] = "-";
      maxRight = heights[i];
    }
  }

  // Calculate water at each position
  for (let i = 0; i < heights.length; i++) {
    if (leftMax[i] === "-") waterArr[i] = "-";
    else waterArr[i] = Math.min(leftMax[i], rightMax[i]);
  }

  // Build chart data
  for (let i = 0; i < heights.length; i++) {
    chartData.push({
      value: heights[i] === 0 ? waterArr[i] : heights[i],
      itemStyle: { color: heights[i] === 0 ? "#2de6ec" : "#e8f535" },
    });
  }

  // Display chart and water units
  createTable(heights, chartData, "chart-container");
  document.getElementById("waterunit").innerHTML = `Total ${countWaterUnits(
    waterArr
  )} Water Units`;
}

// Only water chart
function showOnlyWater(heights) {
  const leftMax = [],
    rightMax = [],
    waterArr = [],
    chartData = [];
  let maxLeft = 0;

  // Build left max array
  for (let h of heights) {
    if (h === 0) leftMax.push(maxLeft);
    else {
      leftMax.push("-");
      maxLeft = h;
    }
  }

  // Build right max array (always "-")
  for (let h of heights) rightMax.push("-");

  // Calculate water at each position
  for (let i = 0; i < heights.length; i++) {
    if (leftMax[i] === "-") waterArr[i] = "-";
    else waterArr[i] = leftMax[i];
  }

  // Build chart data (only water, bricks = 0)
  for (let i = 0; i < heights.length; i++) {
    chartData.push({
      value: heights[i] === 0 ? waterArr[i] : 0,
      itemStyle: { color: heights[i] === 0 ? "#2de6ec" : "#e8f535" },
    });
  }

  createTable(heights, chartData, "chart-container1");
}
