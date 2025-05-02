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

var optionsLine = {
  chart: {
    height: 350,
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
    range: 20 * 60 * 1000, // 20 minutes in milliseconds
    fontSize: '20px'
  },
  title: {
    text: 'Macro F1-Score',
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
    fontSize: '20px' //TODO: set the font size (does not work now)
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
    height: 347,
    stacked: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '75%',
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
        fontSize: '16px'
      }
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '13px',
      colors: ['#fff']
    },
    formatter: (val) => (val == null ? '' : val.toFixed(3)),
  },
  tooltip: {
    enabled: true,
    // shared: true
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
    height: 70,
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
    offsetY: 0,
    style: {
      fontSize: '20px'
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
    height: 70,
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
    offsetY: 0,
    style: {
      fontSize: '20px'
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
    height: 70,
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
    offsetY: 0,
    style: {
      fontSize: '20px'
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
    height: 80,
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
    offsetY: 0,
    style: {
      fontSize: '20px'
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
window.setInterval(function () {

  if (typeof window.currentUpdater === 'undefined') {
    console.log("Initializing currentUpdater");
    window.currentUpdater = null;
    window.intervalId = null;

    // TODO: Update this part and get data from .json file

    fetch('assets/data/ToN_5min_latency_no_inference.json')
    .then(response => response.json())
    .then(data => {
      window.noInferenceLatencyData = data['latency'];
    })
    .catch(error => console.error('Error loading JSON:', error));
    fetch('assets/data/ToN_5min_latency_mousika.json')
    .then(response => response.json())
    .then(data => {
      window.mousikaLatencyData = data['latency'];
    })
    .catch(error => console.error('Error loading JSON:', error));
    fetch('assets/data/ToN_5min_latency_jewel.json')
    .then(response => response.json())
    .then(data => {
      window.jewelLatencyData = data['latency'];
    })
    .catch(error => console.error('Error loading JSON:', error));
    fetch('assets/data/ToN_5min_latency_dune.json')
    .then(response => response.json())
    .then(data => {
      window.duneLatencyData = data['latency'];
    })
    .catch(error => console.error('Error loading JSON:', error));

    fetch('assets/data/ToN_5min_mousika.json')
    .then(response => response.json())
    .then(data => {
      window.mousikaPerfData = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

    fetch('assets/data/ToN_5min_jewel.json')
    .then(response => response.json())
    .then(data => {
      window.jewelPerfData = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

    fetch('assets/data/ToN_5min_dune.json')
    .then(response => response.json())
    .then(data => {
      window.dunePerfData = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

    //
    window.currentPath = null,
    window.noInferenceIndex = 0; // Tracks where we left off
    window.mousikaIndex = 0; // Tracks where we left off
    window.jewelIndex = 0; // Tracks where we left off
    window.duneIndex = 0; // Tracks where we left off
    window.state_demo = 0;
  }

  console.log(window.state_demo)

  document.getElementById('toggleNoInference').addEventListener('click', () => {
    toggleChartUpdate('noInference');
  });

  document.getElementById('toggleJewel').addEventListener('click', () => {
    toggleChartUpdate('jewel');
  });

  document.getElementById('toggleDune').addEventListener('click', () => {
    toggleChartUpdate('dune');
  });
  
  document.getElementById('toggleMousika').addEventListener('click', () => {
    toggleChartUpdate('mousika');
  });

  function toggleChartUpdate(updaterName) {
    // If the same button is clicked again → STOP it
    if (window.currentUpdater === updaterName) {
      showAnimation('');
      stopChartUpdate();
      return;
    }
    // If something else is running → stop it first
    stopChartUpdate();
    // Start new interval for the selected chart
    window.currentUpdater = updaterName;
    console.log(window.currentUpdater, window.intervalId)

    if (updaterName === 'noInference') {
      window.currentPath = 'assets/data/no_inference_animation.html';
      const toggleNoInfBtn = document.getElementById('toggleNoInference');
      toggleNoInfBtn.textContent = 'NO INFERENCE';
      toggleNoInfBtn.classList.add('active-button');
      toggleNoInfBtn.classList.remove('default-button');
      showAnimation(window.currentPath);
      window.intervalId = setInterval(() => {
        // Stop if we reached end of data
        if (window.noInferenceIndex >= window.noInferenceLatencyData.length) {
          showAnimation('');
          stopChartUpdate();
          return;
        }
        const lat_noInf = window.noInferenceLatencyData[window.noInferenceIndex];
        window.noInferenceIndex++; // advance index

        chartnoInference.updateOptions({
          series: [{ data: [lat_noInf.toFixed(3)] }],
          subtitle: { text: lat_noInf.toFixed(3) }
        });

      }, 1000);
    }
    if (updaterName === 'jewel') {
      window.state_demo = 1;
      window.currentPath = 'assets/data/jewel_animation.html'
      const toggleJewelBtn = document.getElementById('toggleJewel');
      toggleJewelBtn.classList.add('active-button');
      toggleJewelBtn.classList.remove('default-button');
      showAnimation(window.currentPath);
      window.intervalId = setInterval(() => {
        const now = new Date();
        // Stop if we reached end of data
        console.log(window.jewelPerfData['macro_overall'].length)
        if (window.jewelIndex >= window.jewelPerfData['macro_overall'].length) {
          window.jewelIndex = 0;
          showAnimation('');
          stopChartUpdate();
          return;
        }
        const lat_jew = window.jewelLatencyData[window.jewelIndex];
        const macro_jew = window.jewelPerfData['macro_overall'][window.jewelIndex];
        const macro_inst_jew = window.jewelPerfData['macro_inst'][window.jewelIndex];
        const weighted_jew = window.jewelPerfData['weighted_overall'][window.jewelIndex];
        const micro_jew = window.jewelPerfData['micro_overall'][window.jewelIndex];
        window.jewelIndex++; // advance index
        chartLine.appendData([
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_inst_jew.toFixed(3)) }]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_jew.toFixed(3)) }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          }
        ]);
        chartLine.updateOptions({
          xaxis: {
            min: now - (20 * 60 * 1000), // 20 min ago
            max: now
          }
        }, false, false);

        chartJewel.updateOptions({
          series: [{ data: [lat_jew.toFixed(3)]}],
          subtitle: { text: lat_jew.toFixed(3)}
        });

        chartCombinedPerf.updateSeries([
          {
            name: 'Macro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 2, macro_jew.toFixed(3))
          },
          {
            name: 'Weighted F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 2, weighted_jew.toFixed(3))
          },
          {
            name: 'Micro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 2, micro_jew.toFixed(3))
          }
        ]);

      }, 1000);
    }
    if (updaterName === 'dune') {
      window.state_demo = 1;
      window.currentPath = 'assets/data/dune_animation.html'
      const toggleDuneBtn = document.getElementById('toggleDune');
      toggleDuneBtn.textContent = 'DUNE';
      toggleDuneBtn.classList.add('active-button');
      toggleDuneBtn.classList.remove('default-button');
      showAnimation(window.currentPath);
      window.intervalId = setInterval(() => {
        const now = new Date();
        // Stop if we reached end of data
        if (window.duneIndex >= window.dunePerfData['macro_overall'].length) {
          window.duneIndex = 0;
          showAnimation('');
          stopChartUpdate();
          return;
        }
        const lat_dune = window.duneLatencyData[window.duneIndex];
        const macro_dune = window.dunePerfData['macro_overall'][window.duneIndex];
        const macro_inst_dune = window.dunePerfData['macro_inst'][window.duneIndex];
        const weighted_dune = window.dunePerfData['weighted_overall'][window.duneIndex];
        const micro_dune = window.dunePerfData['micro_overall'][window.duneIndex];
        window.duneIndex++; // advance index
        chartLine.appendData([
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_inst_dune.toFixed(3)) }]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_dune.toFixed(3)) }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          }
        ]);
        chartLine.updateOptions({
          xaxis: {
            min: now - (20 * 60 * 1000), // 20 min ago
            max: now
          }
        }, false, false);

        chartDune.updateOptions({
          series: [{ data: [lat_dune.toFixed(3)] }],
          subtitle: { text: lat_dune.toFixed(3) }
        });

        chartCombinedPerf.updateSeries([
          {
            name: 'Macro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 3, macro_dune.toFixed(3))
          },
          {
            name: 'Weighted F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 3, weighted_dune.toFixed(3))
          },
          {
            name: 'Micro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 3, micro_dune.toFixed(3))
          }
        ]);
      }, 1000);
    }
    if (updaterName === 'mousika') {
      window.state_demo = 1;
      window.currentPath = 'assets/data/mousika_animation.html'
      const toggleMousikaBtn = document.getElementById('toggleMousika');
      toggleMousikaBtn.textContent = 'MOUSIKA';
      toggleMousikaBtn.classList.add('active-button');
      toggleMousikaBtn.classList.remove('default-button');
      showAnimation(window.currentPath);
      window.intervalId = setInterval(() => {
        const now = new Date();
        // Stop if we reached end of data
        if (window.mousikaIndex >= window.mousikaPerfData['macro_overall'].length) {
          window.mousikaIndex = 0
          showAnimation('');
          stopChartUpdate();
          return;
        }
        const lat_mous = window.mousikaLatencyData[window.mousikaIndex];
        const macro_mous = window.mousikaPerfData['macro_overall'][window.mousikaIndex];
        const macro_inst_mous = window.mousikaPerfData['macro_inst'][window.mousikaIndex];
        const weighted_mous = window.mousikaPerfData['weighted_overall'][window.mousikaIndex];
        const micro_mous = window.mousikaPerfData['micro_overall'][window.mousikaIndex];
        window.mousikaIndex++; // advance index

        chartLine.appendData([
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: null }]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_inst_mous.toFixed(3))}]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_mous.toFixed(3))}]
          }
        ]);
        chartLine.updateOptions({
          xaxis: {
            min: now - (20 * 60 * 1000), // 5 min ago
            max: now
          }
        }, false, false);

        chartMousika.updateOptions({
          series: [{ data: [lat_mous] }],
          subtitle: { text: lat_mous }
        });

        chartCombinedPerf.updateSeries([
          {
            name: 'Macro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[0].data, 1, macro_mous.toFixed(3))
          },
          {
            name: 'Weighted F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[1].data, 1, weighted_mous.toFixed(3))
          },
          {
            name: 'Micro F1',
            data: updateValueAtIndex(chartCombinedPerf.w.config.series[2].data, 1, micro_mous.toFixed(3))
          }
        ]);
      }, 1000);
    }
    console.log(window.currentUpdater, window.intervalId)
  }

  function stopChartUpdate() {
    clearInterval(window.intervalId);
    window.intervalId = null;
    window.state_demo = 0;
  
    // Reset button labels
    const toggleNoInfBtn = document.getElementById('toggleNoInference');
    toggleNoInfBtn.classList.remove('active-button');
    toggleNoInfBtn.classList.add('default-button');
    // document.getElementById('toggleMousika').textContent = 'MOUSIKA';
    const toggleMousikaBtn = document.getElementById('toggleMousika');
    toggleMousikaBtn.classList.remove('active-button');
    toggleMousikaBtn.classList.add('default-button');
    // 
    const toggleJewelBtn = document.getElementById('toggleJewel');
    toggleJewelBtn.classList.remove('active-button');
    toggleJewelBtn.classList.add('default-button');
    // document.getElementById('toggleDune').textContent = 'DUNE';
    const toggleDuneBtn = document.getElementById('toggleDune');
    toggleDuneBtn.classList.remove('active-button');
    toggleDuneBtn.classList.add('default-button');
  
    window.currentUpdater = null;
  }

  function showAnimation(htmlFile) {
    const frame = document.getElementById('animation-frame');
    frame.src = htmlFile;
    frame.parentElement.style.display = 'block'; // ensures it's visible
  }

  function updateValueAtIndex(arr, index, value) {
    const newArr = [...arr];
    newArr[index] = parseFloat(value);
    return newArr;
  }

  if(window.state_demo == 0) {
    const now = new Date();
    chartLine.updateOptions({
      xaxis: {
        min: now.getTime() - (20 * 60 * 1000), // 20 min ago
        max: now.getTime()
      }
    }, false, false);
    chartLine.appendData([
      {
        data: [{ x: now.getTime(), y: null }]
      },
      {
        data: [{ x: now.getTime(), y: null }]
      },
      {
        data: [{ x: now.getTime(), y: null }]
      },
      {
        data: [{ x: now.getTime(), y: null }]
      },
      {
        data: [{ x: now.getTime(), y:null }]
      },
      {
        data: [{ x: now.getTime(), y: null}]
      }
    ]);
  }

}, 1000);
