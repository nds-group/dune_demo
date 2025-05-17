window.Apex = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false
    },
  },
  stroke: {
    width: 3
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
        return moment(new Date(val)).format("H:mm:ss")
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      style: {
        fontSize: '15px',
      },
    }
  }
};

chart_time_length = 2 //mins

// MACRO F1 

function chartHeight(height = 25) {
  const windowHeight = window.innerHeight;
  let chartHeight;

  chartHeight = 6.4 * height + windowHeight/10; // relation to get aspect ratio followin display size
  if (chartHeight < 200) { // minimum height
    chartHeight = 200;
  }

  return chartHeight;
}

let instantaneousLineColor = 'var(--colors-g-5)';
let overallLineColor = 'var(--colors-g-1)';

var optionsLine = {
  chart: {
    height: chartHeight(),
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: false,
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
    color: instantaneousLineColor,
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Dune_Overall',
    color: overallLineColor,
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Jewel_Instantaneous',
    color: instantaneousLineColor,
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Jewel_Overall',
    color: overallLineColor,
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Mousika_Instantaneous',
    color: instantaneousLineColor,
    yAxisIndex: 0,
    data: []
  }, {
    name: 'Mousika_Overall',
    color: overallLineColor,
    yAxisIndex: 0,
    data: []
  }
  ],
  xaxis: {
    type: 'datetime',
    tickAmount: 5,
    tickPlacement: 'between',
    range: chart_time_length * 60 * 1000, // chart_time_length minutes in milliseconds
    labels: {
      style: {
        fontSize: '1.3vh',

      },
      datetimeFormatter: {
        hour: 'H:mm',
        minute: 'H:mm:ss',
        second: 'H:mm:ss',
      },
    },
    title: {
      text: 'Time',
      style: {
        color: 'var(--colors-10)',
        fontSize: '15px'
      },
      offsetY: 15
    },
    axisBorder: {
      show: true,
      color: 'var(--colors-10)',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0
    },
    axisTicks: {
      show: true,
      borderType: 'solid',
      color: 'var(--colors-10)',
      height: 10,
      offsetX: 0,
      offsetY: 0
    },
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
      fillColors: [overallLineColor, instantaneousLineColor] // Match your 'Overall' and 'Instantaneous' colors
    },
    fontSize: '16px'

  },
  yaxis: {
    min: 0,
    max: 1,
    labels: {
      style: {
        fontSize: '15px',
      },
    },
    title: {
      text: 'Score',
      style: {
        color: 'var(--colors-10)',
        fontSize: '15px'
      },
      offsetX: -2
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
    height: chartHeight(50),
    stacked: false,
    animations: {
      enabled: true,
      speed: 1,
      animateGradually: {
        enabled: false,
        delay: 10
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1,
        easing: 'linear'
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '70%',
      dataLabels: {
        position: 'bottom',
      }
    }
  },
  colors: ['var(--colors-g-1)', 'var(--colors-g-3)', 'var(--colors-g-4)'], // Macro, Weighted, Micro
  series: [
    {
      name: 'Macro F1 Score',
      data: [null, null, null] // Mousika, Jewel, Dune
    },
    {
      name: 'Weighted F1 Score',
      data: [null, null, null]
    },
    {
      name: 'Micro F1 Score',
      data: [null, null, null]
    }
  ],
  xaxis: {
    min: 0.3,
    max: 1,
    categories: ['Mousika', 'Jewel', 'Dune'],
    title: {
      text: 'Score',
      style: {
        color: 'var(--colors-10)',
        fontSize: '15px'
      }
    },
    labels: {
      enabled: false,
      style: {
        fontSize: '15px',
      },
    },
    axisBorder: {
      show: true,
      color: 'var(--colors-10)',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0
    },
    axisTicks: {
      show: true,
      borderType: 'solid',
      color: 'var(--colors-10)',
      height: 6,
      offsetX: 0,
      offsetY: 0
    },
  },
  yaxis: {
    labels: {
      style: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '15px',

      }
    }
  },
  dataLabels: {
    offsetY: 0,
    textAnchor: 'end',
    offsetX: 0,

    enabled: true,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      colors: ['var(--colors-10)'],
    },
    background: {
      enabled: true,
      foreColor: '#000',
      padding: 3,
      borderRadius: 2,
      opacity: 0.3,
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
    fontSize: '16px',
    labels: {
      colors: ['var(--colors-10)']
    },
    markers: {
      shape: 'circle'
    }
  },
  grid: {
    show: false,
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
    height: chartHeight(50) / 4,
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
        backgroundBarColors: ['var(--colors-gray-2)']
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
    text: 'No Inference',
    style: {
      fontSize: '16px',
    }
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '16px'
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
    colors: ['var(--colors-g-1)']
  }
}
var chartnoInference = new ApexCharts(document.querySelector('#noInference'), optionsnoInference);
chartnoInference.render();


var optionsMousika = {
  chart: {
    height: chartHeight(50) / 4,
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
        backgroundBarColors: ['var(--colors-gray-2)']
      }
    },
  },
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
    text: 'Mousika',
    style: {
      fontSize: '16px',
    }
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '16px'
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
    colors: ['var(--colors-g-1)']
  }
}
var chartMousika = new ApexCharts(document.querySelector('#Mousika'), optionsMousika);
chartMousika.render();


var optionsJewel = {
  chart: {
    height: chartHeight(50) / 4,
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
        backgroundBarColors: ['var(--colors-gray-2)']
      }
    },
  },
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Jewel',
    data: [0]
  }],
  fill: {
    type: 'solid',
    colors: ['var(--colors-g-1)']
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: 'Jewel',
    style: {
      fontSize: '16px',
    }
  },
  subtitle: {
    floating: true,
    align: 'right',
    offsetY: 15,
    style: {
      fontSize: '16px'
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
    height: chartHeight(50) / 4,
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
        backgroundBarColors: ['var(--colors-gray-2)']
      }
    },
  },
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Dune',
    data: [0]
  }],
  fill: {
    type: 'solid',
    colors: ['var(--colors-g-1)']
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
  const frame = document.getElementById('animation-frame');
  if (frame) {

    resumeAnimation();

    if (frame.dataset.htmlFile && frame.dataset.htmlFile === htmlFile) {
      return;
    }

    frame.dataset.htmlFile = htmlFile;
    frame.src = htmlFile;
    
  } else {
    console.error('Animation frame not found');
  }
}

function pauseAnimation() {
  const frame = document.getElementById('animation-frame');
  if (frame) {
    frame.style.display = 'none';
  }
  window.isAnimationPaused = true;
}

function resumeAnimation() {
  const frame = document.getElementById('animation-frame');
  if (frame) {
    frame.style.display = 'block';
  }
  window.isAnimationPaused = false;
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
  if (window.perfIntervalId) {
    clearInterval(window.perfIntervalId);
    window.perfIntervalId = null;
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
      button.classList.remove('active-button');
    }
  });

  window.currentUpdater = null;
}

function toggleChartUpdate(updaterName) {
  if (window.currentUpdater === updaterName) {
    pauseAnimation();
    stopChartUpdate();

    return;
  }

  stopChartUpdate(); // Stop any currently running update

  window.currentUpdater = updaterName;
  window.state_demo = 1; // Set demo state to running

  let animationHtml = '';
  const speedMultiplier = 4;
  const baseInterval = 1000;
  const updateInterval = baseInterval / speedMultiplier;
  const perfUpdateInterval = updateInterval * 4; // Slower interval for chartCombinedPerf

  let dataIndexRef = null; // To pass by reference effectively
  let latencyData = null;
  let perfData = null;
  let chartToUpdate = null;
  let chartSeriesDataFunction = null;
  let performanceUpdateFunction = null;

  const toggleButton = document.getElementById(`toggle${updaterName.charAt(0).toUpperCase() + updaterName.slice(1)}`);
  if (toggleButton) {
    toggleButton.classList.add('active-button');
  }


  const combinedPerfSeries = {
    'mousika': 0,
    'jewel': 1,
    'dune': 2
  }
  switch (updaterName) {
    case 'noInference':
      animationHtml = 'assets/data/no_inference_animation.html';
      latencyData = window.noInferenceLatencyData;
      dataIndexRef = {
        get: () => window.noInferenceIndex,
        set: (val) => window.noInferenceIndex = val
      };
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
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, combinedPerfSeries[updaterName], macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, combinedPerfSeries[updaterName], weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, combinedPerfSeries[updaterName], micro.toFixed(3)) }
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
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, combinedPerfSeries[updaterName], macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, combinedPerfSeries[updaterName], weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, combinedPerfSeries[updaterName], micro.toFixed(3)) }
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
        { name: 'Macro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, combinedPerfSeries[updaterName], macro.toFixed(3)) },
        { name: 'Weighted F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, combinedPerfSeries[updaterName], weighted.toFixed(3)) },
        { name: 'Micro F1', data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, combinedPerfSeries[updaterName], micro.toFixed(3)) }
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
    // Determine dataLength based on perfData primarily, fallback to latencyData if perfData is not available for the current updater.
    const dataLength = (perfData && perfData['macro_overall']) ? perfData['macro_overall'].length : (latencyData ? latencyData.length : 0);

    if (dataLength === 0) { // If there's no data, don't proceed
      return;
    }

   if (currentIndex >= dataLength - 1) {
      currentIndex = 0; // Loop back
      dataIndexRef.set(currentIndex);
    }

    const now = new Date();
    const currentLatency = latencyData ? latencyData[currentIndex] : 0;

    if (chartToUpdate) {
      chartToUpdate.updateOptions({
        series: [{ data: [currentLatency.toFixed(3)] }],
        subtitle: { text: currentLatency.toFixed(3) }
      });
    }

    if (perfData && chartSeriesDataFunction) {
      const micro_inst = perfData['micro_inst'][currentIndex];
      const micro_overall = perfData['micro_overall'][currentIndex];

      chartLine.appendData(chartSeriesDataFunction(now, micro_inst, micro_overall));
      chartLine.updateOptions({
        xaxis: { min: now.getTime() - (chart_time_length * 60 * 1000), max: now.getTime() }
      }, false, false);
    }

    let nextIndex = currentIndex + 1;
    if (nextIndex >= dataLength) {
      nextIndex = 0; // Loop back
    }
    dataIndexRef.set(nextIndex);

  }, updateInterval);

  if (perfData && performanceUpdateFunction) {
    window.perfIntervalId = setInterval(() => {
      if (window.currentUpdater !== updaterName) { // Stop if the updater changed
        clearInterval(window.perfIntervalId);
        window.perfIntervalId = null;
        return;
      }

      let currentIndexForPerf = dataIndexRef.get();
      const dataLength = perfData['macro_overall'].length;
      if (dataLength === 0) return;

      // Use the previous index for the perf chart to reflect the data point just processed by the main loop
      currentIndexForPerf = (currentIndexForPerf === 0) ? (dataLength > 0 ? dataLength - 1 : 0) : currentIndexForPerf - 1;
      if (currentIndexForPerf < 0 && dataLength > 0) currentIndexForPerf = 0; // Ensure it's a valid index

      const macro_overall_perf = perfData['macro_overall'][currentIndexForPerf];
      const weighted_overall_perf = perfData['weighted_overall'][currentIndexForPerf];
      const micro_overall_perf = perfData['micro_overall'][currentIndexForPerf];

      chartCombinedPerf.updateSeries(
        performanceUpdateFunction(macro_overall_perf, weighted_overall_perf, micro_overall_perf),
        true);
    }, perfUpdateInterval);
  }
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

  // Setup event listeners once
  document.getElementById('toggleNoInference')?.addEventListener('click', () => toggleChartUpdate('noInference'));
  document.getElementById('toggleJewel')?.addEventListener('click', () => toggleChartUpdate('jewel'));
  document.getElementById('toggleDune')?.addEventListener('click', () => toggleChartUpdate('dune'));
  document.getElementById('toggleMousika')?.addEventListener('click', () => toggleChartUpdate('mousika'));
  
  // Start the idle chart update interval
  setInterval(function () {
    if (window.state_demo === 0) { // Only update if idle
      const now = new Date();
      chartLine.updateOptions({
        xaxis: {
          min: now.getTime() - (chart_time_length * 60 * 1000), // 20 min ago
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
