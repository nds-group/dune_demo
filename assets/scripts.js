window.Apex = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false
    },
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: '#333'
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea']
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss")
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      // offsetX: -10
    }
  }
};

// MACRO F1 

function chartHeight() {
  const windowHeight = window.innerHeight;
  let chartHeight;
  let btnMargin;

  if (windowHeight < 600) { //small screens
    btnMargin = 15;
  } else if (windowHeight < 900) { // medium screens
    btnMargin = 25;
  } else { // big screens
    btnMargin = 40;
  }

  chartHeight = windowHeight / 3 - btnMargin;
  if (chartHeight < 200) { // minimum height
    chartHeight = 200;
  }

  return chartHeight;
}


var optionsLine = {
  chart: {
    height: chartHeight() + 30,
    type: 'line',
    // stacked: false,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.6,
      blur: 5,
      left: -7,
      top: 22
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: [1, 5, 1, 5, 1, 5] // 'Overall' is 5px, 'Instantaneous' is 1px
  },
  grid: {
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  series: [{
    name: 'Dune_Instantaneous',
    color: '#e1eacd',
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Dune_Overall',
    color: '#0b8457',
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Jewel_Instantaneous',
    color: '#e1eacd',
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Jewel_Overall',
    color: '#0b8457',
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Mousika_Instantaneous',
    color: '#e1eacd',
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Mousika_Overall',
    color: '#0b8457',
    yAxisIndex: 0,
    data: []
  }
  ],
  xaxis: {
    type: 'datetime',
    range: 10 * 60 * 1000, // 20 minutes in milliseconds
    labels: {
      style: {
        fontSize: '1.2vh',
      },
    },
  },
  title: {
    text: 'Micro F1-Score',
    align: 'center',
    style: {
      fontSize: '18px'
    }
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: 'left',
    position: 'top',
    offsetY: -28,
    offsetX: -5,
    customLegendItems: ['Overall', 'Instantaneous'],
    markers: {
      fillColors: ['#0b8457', '#e1eacd'] // Match your 'Overall' and 'Instantaneous' colors
    }
  },
  yaxis: {
    min: 0,
    max: 1,
    labels: {
      style: {
        fontSize: '1.2vh',
      },
    },
  },
  fill: {
    type: 'solid'
  },
}


var chartLine = new ApexCharts(
  document.querySelector("#linechart"),
  optionsLine
);
chartLine.render()

// PERFORMANCE

var optionsCombinedPerf = {
  chart: {
    type: 'bar',
    height: chartHeight(),
    stacked: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '70%',
      dataLabels: {
        position: 'right'
      }
    }
  },
  colors: ['#0b8457', '#10316b', '#eac100'], // Macro, Weighted, Micro
  series: [
    {
      name: 'Macro F1 Score',
      data: [null, null, null, null] // No Inf, Mousika, Jewel, Dune
    },
    {
      name: 'Weighted F1 Score',
      data: [null, null, null, null]
    },
    {
      name: 'Micro F1 Score',
      data: [null, null, null, null]
    }
  ],
  xaxis: {
    min: 0.3,
    max: 1,
    categories: ['No Inference', 'Mousika', 'Jewel', 'Dune'],
    title: {
      text: 'Score',
      style: {
        color: '#ccc'
      }
    },
    labels: {
      enabled: false
    }
  },
  yaxis: {
    labels: {
      style: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '1.2vh'
      }
    }
  },
  dataLabels: {
    offsetY: 6,
    enabled: true,
    style: {
      fontSize: '1vh',
      colors: ['#fff'],
    },
    formatter: (val) => (val == null ? '' : val.toFixed(3)),
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    x: {
      formatter: function (val) {
        return val;
      }
    },
  },
  legend: {
    show: true,
    position: 'bottom',
    offsetY: 10,
    labels: {
      colors: ['#ccc']
    },
    markers: {
      shape: 'circle'
    }
  },
  grid: {
    show: false
  },
  fill: {
    type: 'solid'
  }
};
var chartCombinedPerf = new ApexCharts(document.querySelector("#combinedPerformance"), optionsCombinedPerf);
chartCombinedPerf.render();

// LATENCY

var optionsnoInference = {
  chart: {
    height: chartHeight() / 4,
    type: 'bar',
    stacked: true,
    sparkline: {
      enabled: true
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
      colors: {
        backgroundBarColors: ['#40475D']
      }
    },
  },
  stroke: {
    width: 0,
  },
  series: [{
    name: 'No Inference',
    data: [0]
  }],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: 'No Inference'
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '1.5vh'
    }
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    categories: ['No Inference'],
  },
  yaxis: {
    max: 1200
  },
  fill: {
    type: 'solid',
    colors: ['#a21232']
  }
}
var chartnoInference = new ApexCharts(document.querySelector('#noInference'), optionsnoInference);
chartnoInference.render();


var optionsMousika = {
  chart: {
    height: chartHeight() / 4,
    type: 'bar',
    stacked: true,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
      colors: {
        backgroundBarColors: ['#40475D']
      }
    },
  },
  colors: ['#17ead9'],
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Mousika',
    data: [0]
  }],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: 'Mousika'
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '1.5vh'
    }
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    categories: ['Mousika'],
  },
  yaxis: {
    max: 1200
  },
  fill: {
    type: 'solid',
    colors: ['#a21232']
  }
}
var chartMousika = new ApexCharts(document.querySelector('#Mousika'), optionsMousika);
chartMousika.render();


var optionsJewel = {
  chart: {
    height: chartHeight() / 4,
    type: 'bar',
    stacked: true,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
      colors: {
        backgroundBarColors: ['#40475D']
      }
    },
  },
  colors: ['#f02fc2'],
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Jewel',
    data: [0]
  }],
  fill: {
    type: 'solid',
    colors: ['#a21232']
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: 'Jewel'
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '1.5vh'
    }
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ['Jewel'],
  },
  yaxis: {
    max: 1200
  },
}
var chartJewel = new ApexCharts(document.querySelector('#Jewel'), optionsJewel);
chartJewel.render();

var optionsDune = {
  chart: {
    height: chartHeight() / 4 + 10,
    type: 'bar',
    stacked: true,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
      colors: {
        backgroundBarColors: ['#40475D']
      }
    },
  },
  colors: ['#f02fc2'],
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Dune',
    data: [0]
  }],
  fill: {
    type: 'solid',
    colors: ['#a21232']
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: 'Dune'
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '1.5vh'
    }
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    categories: ['Dune'],
  },
  yaxis: {
    max: 1200
  }
}
var chartDune = new ApexCharts(document.querySelector('#Dune'), optionsDune);
chartDune.render();


// ************************************************************************************** //
async function fetchJsonData(url, errorMessage) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(errorMessage, error);
    return null;
  }
}

// Initialize global variables
window.currentUpdater = null;
window.intervalId = null;
window.dunePerfData = null;
window.noInferenceLatencyData = null;
window.mousikaLatencyData = null;
window.jewelLatencyData = null;
window.duneLatencyData = null;
window.mousikaPerfData = null;
window.jewelPerfData = null;
window.currentPath = null;
window.noInferenceIndex = 0;
window.mousikaIndex = 0;
window.jewelIndex = 0;
window.duneIndex = 0;
window.state_demo = 0; // 0: idle, 1: demo running

function showAnimation(htmlFile) {
  console.log('showAnimation', htmlFile);
  const frame = document.getElementById('animation-frame');


  if (frame) {

    if (frame.dataset.htmlFile && frame.dataset.htmlFile === htmlFile) {
      window.isAnimationPaused = !window.isAnimationPaused;
      return; // No need to change if it's the same file
    }

    frame.dataset.htmlFile = htmlFile;
    frame.src = htmlFile;
    // Ensure parent is visible if it was hidden
    if (frame) {
      frame.style.display = htmlFile ? 'block' : 'none';
    }
  } else {
    console.error('Animation frame not found');
  }
}

function updateValueAtIndex(arr, index, value) {
  const newArr = [...arr];
  newArr[index] = parseFloat(value);
  return newArr;
}

function stopChartUpdate() {
  if (window.intervalId) {
    clearInterval(window.intervalId);
    window.intervalId = null;
  }
  window.state_demo = 0;

  // Reset button styles
  const buttons = [
    { id: 'toggleNoInference', text: 'NO INFERENCE' },
    { id: 'toggleMousika', text: 'MOUSIKA' },
    { id: 'toggleJewel', text: 'JEWEL' },
    { id: 'toggleDune', text: 'DUNE' }
  ];

  buttons.forEach(btnInfo => {
    const button = document.getElementById(btnInfo.id);
    if (button) {
      // button.textContent = btnInfo.text; // Keep original text or update if needed
      button.classList.remove('active-button');
      button.classList.add('default-button');
    }
  });

  //showAnimation(''); // Hide animation frame
  window.currentUpdater = null;
  console.log("Chart update stopped. Current updater:", window.currentUpdater);
}

function toggleChartUpdate(updaterName) {
  if (window.currentUpdater === updaterName) {
    window.isAnimationPaused = true; // Pause animation if already running
    stopChartUpdate();
    return;
  }

  stopChartUpdate(); // Stop any currently running update

  window.currentUpdater = updaterName;
  window.state_demo = 1; // Set demo state to running
  console.log("Starting chart update for:", window.currentUpdater);

  let animationHtml = '';
  let dataIndexRef = null; // To pass by reference effectively
  let latencyData = null;
  let perfData = null;
  let chartToUpdate = null;
  let chartSeriesDataFunction = null;
  let performanceUpdateFunction = null;

  const toggleButton = document.getElementById(`toggle${updaterName.charAt(0).toUpperCase() + updaterName.slice(1)}`);
  if (toggleButton) {
    toggleButton.classList.add('active-button');
    toggleButton.classList.remove('default-button');
  }


  switch (updaterName) {
    case 'noInference':
      animationHtml = 'assets/data/no_inference_animation.html';
      latencyData = window.noInferenceLatencyData;
      dataIndexRef = { get: () => window.noInferenceIndex, set: (val) => window.noInferenceIndex = val };
      chartToUpdate = chartnoInference;
      // No performance data for noInference in this structure
      break;
    case 'jewel':
      animationHtml = 'assets/data/jewel_animation.html';
      latencyData = window.jewelLatencyData;
      perfData = window.jewelPerfData;
      dataIndexRef = { get: () => window.jewelIndex, set: (val) => window.jewelIndex = val };
      chartToUpdate = chartJewel;
      chartSeriesDataFunction = (now, micro_inst, micro_overall) => [
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: parseFloat(micro_inst.toFixed(3)) }] },
        { data: [{ x: now.getTime(), y: parseFloat(micro_overall.toFixed(3)) }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] }
      ];
      performanceUpdateFunction = (macro, weighted, micro) => [
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 2, macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 2, weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 2, micro.toFixed(3)) }
      ];
      break;
    case 'dune':
      animationHtml = 'assets/data/dune_animation.html';
      latencyData = window.duneLatencyData;
      perfData = window.dunePerfData;
      dataIndexRef = { get: () => window.duneIndex, set: (val) => window.duneIndex = val };
      chartToUpdate = chartDune;
      chartSeriesDataFunction = (now, micro_inst, micro_overall) => [
        { data: [{ x: now.getTime(), y: parseFloat(micro_inst.toFixed(3)) }] },
        { data: [{ x: now.getTime(), y: parseFloat(micro_overall.toFixed(3)) }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] }
      ];
      performanceUpdateFunction = (macro, weighted, micro) => [
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 3, macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 3, weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 3, micro.toFixed(3)) }
      ];
      break;
    case 'mousika':
      animationHtml = 'assets/data/mousika_animation.html';
      latencyData = window.mousikaLatencyData;
      perfData = window.mousikaPerfData;
      dataIndexRef = { get: () => window.mousikaIndex, set: (val) => window.mousikaIndex = val };
      chartToUpdate = chartMousika;
      chartSeriesDataFunction = (now, micro_inst, micro_overall) => [
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: parseFloat(micro_inst.toFixed(3)) }] },
        { data: [{ x: now.getTime(), y: parseFloat(micro_overall.toFixed(3)) }] }
      ];
      performanceUpdateFunction = (macro, weighted, micro) => [
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 1, macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 1, weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 1, micro.toFixed(3)) }
      ];
      break;
    default:
      console.error("Unknown updater name:", updaterName);
      stopChartUpdate();
      return;
  }

  showAnimation(animationHtml);

  window.intervalId = setInterval(() => {
    let currentIndex = dataIndexRef.get();
    const dataLength = perfData ? perfData['macro_overall'].length : (latencyData ? latencyData.length : 0);
    const noInfLengthLimit = 60; // Specific limit for noInference

    if (updaterName === 'noInference' && currentIndex >= noInfLengthLimit) {
      showAnimation('');
      stopChartUpdate();
      return;
    } else if (updaterName !== 'noInference' && currentIndex >= dataLength) {
      dataIndexRef.set(0); // Reset index for looping, or stop
      showAnimation('');
      stopChartUpdate();
      return;
    }

    const now = new Date();
    const currentLatency = latencyData ? latencyData[currentIndex] : 0;

    if (chartToUpdate) {
      chartToUpdate.updateOptions({
        series: [{ data: [currentLatency.toFixed(3)] }],
        subtitle: { text: currentLatency.toFixed(3) }
      });
    }

    if (perfData && chartSeriesDataFunction && performanceUpdateFunction) {
      const macro_overall = perfData['macro_overall'][currentIndex];
      const micro_inst = perfData['micro_inst'][currentIndex];
      const weighted_overall = perfData['weighted_overall'][currentIndex];
      const micro_overall = perfData['micro_overall'][currentIndex];

      chartLine.appendData(chartSeriesDataFunction(now, micro_inst, micro_overall));
      chartLine.updateOptions({
        xaxis: { min: now.getTime() - (10 * 60 * 1000), max: now.getTime() }
      }, false, false);

      chartCombinedPerf.updateSeries(performanceUpdateFunction(macro_overall, weighted_overall, micro_overall));
    }

    dataIndexRef.set(currentIndex + 1);

  }, 1000);
}


async function initializeApp() {
  console.log("Initializing application and fetching data...");

  const noInfData = await fetchJsonData('assets/data/ToN_5min_latency_no_inference.json', 'Error loading No Inference Latency JSON:');
  if (noInfData) window.noInferenceLatencyData = noInfData['latency'];

  const mousikaLatData = await fetchJsonData('assets/data/ToN_5min_latency_mousika.json', 'Error loading Mousika Latency JSON:');
  if (mousikaLatData) window.mousikaLatencyData = mousikaLatData['latency'];

  const jewelLatData = await fetchJsonData('assets/data/ToN_5min_latency_jewel.json', 'Error loading Jewel Latency JSON:');
  if (jewelLatData) window.jewelLatencyData = jewelLatData['latency'];

  const duneLatData = await fetchJsonData('assets/data/ToN_5min_latency_dune.json', 'Error loading Dune Latency JSON:');
  if (duneLatData) window.duneLatencyData = duneLatData['latency'];

  window.mousikaPerfData = await fetchJsonData('assets/data/ToN_5min_mousika.json', 'Error loading Mousika Perf JSON:');
  window.jewelPerfData = await fetchJsonData('assets/data/ToN_5min_jewel.json', 'Error loading Jewel Perf JSON:');
  window.dunePerfData = await fetchJsonData('assets/data/ToN_5min_dune.json', 'Error loading Dune Perf JSON:');


  console.log("Data fetching complete.");

  // Setup event listeners once
  document.getElementById('toggleNoInference')?.addEventListener('click', () => toggleChartUpdate('noInference'));
  document.getElementById('toggleJewel')?.addEventListener('click', () => toggleChartUpdate('jewel'));
  document.getElementById('toggleDune')?.addEventListener('click', () => toggleChartUpdate('dune'));
  document.getElementById('toggleMousika')?.addEventListener('click', () => toggleChartUpdate('mousika'));
  console.log("Event listeners attached.");

  // Start the idle chart update interval
  setInterval(function () {
    // console.log("Periodic check. Current state_demo:", window.state_demo, "Current updater:", window.currentUpdater);
    if (window.state_demo === 0) { // Only update if idle
      const now = new Date();
      chartLine.updateOptions({
        xaxis: {
          min: now.getTime() - (10 * 60 * 1000), // 20 min ago
          max: now.getTime()
        }
      }, false, false);
      chartLine.appendData([
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] },
        { data: [{ x: now.getTime(), y: null }] }, { data: [{ x: now.getTime(), y: null }] }
      ]);
    }
  }, 1000);
  console.log("Idle chart update interval started.");
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
