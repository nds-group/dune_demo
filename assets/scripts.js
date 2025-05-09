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
    range: 15 * 60 * 1000, // 10 minutes in milliseconds
    fontSize: '20px' //TODO: set the font size (does not work now)
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
    height: chartHeight(),
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
    window.dunePerfData = {
      'weighted_overall': [0.7201864063861249, 0.6711825699970677, 0.7286628149663843, 0.6864673282204056, 0.6737315739494084, 0.7393206139135612, 0.7788323319408512, 0.798132308065558, 0.7999300686370703, 0.8019467156961942, 0.8019467156961899, 0.8019467156961899, 0.8019467156961899, 0.8019467156961897, 0.8019467156961899, 0.8019467156961902, 0.8021801271490568, 0.8022695865716805, 0.8054139335141365, 0.8056797298718614, 0.8065249921239621, 0.8065870226680356, 0.8074163416481893, 0.8087314610433799, 0.8091740017043656, 0.8096083116056686, 0.8096247093226752, 0.8098989799777512, 0.8102328859458443, 0.8102328859459005, 0.8107075896117895, 0.8112402196522782, 0.8112386650835978, 0.8112386650835978, 0.8112386650835977, 0.8112386650835974, 0.8112386650835978, 0.8112386650835981, 0.8112428478963256, 0.8112428478963319, 0.811253149217122, 0.8112716371463269, 0.8115447017410391, 0.8119767592272703, 0.8123563622334892, 0.8131695207952829, 0.814441780979612, 0.8156154342636234, 0.8165793484692605, 0.8181632643417664, 0.8198756813746438, 0.8215961203433858, 0.8228827743577288, 0.8241161462505131, 0.824490585158813, 0.824719619499445, 0.8263456220823453, 0.8274808852646331, 0.8280658772223602, 0.8298882616987221], 'micro_overall': [0.7427578984895037, 0.7018034633265721, 0.7391566494114638, 0.7013919933826235, 0.7004149384333412, 0.7594584127091798, 0.7909011948123816, 0.8089578917346218, 0.8104728921878755, 0.81229820549106, 0.8122982054910564, 0.8122982054910564, 0.8122982054910564, 0.8122982054910561, 0.8122982054910564, 0.8122982054910564, 0.8124983701404338, 0.8125712224843521, 0.8153249981553022, 0.8155996186959531, 0.8163980221784037, 0.8164566797369962, 0.8172520216547062, 0.8183393207561288, 0.8187595756985871, 0.8191651667750812, 0.8191839635372221, 0.8194705659974647, 0.8198133915629255, 0.8198133915629794, 0.8202838389623531, 0.820865726442474, 0.8208643247108632, 0.8208643247108632, 0.820864324710863, 0.8208643247108629, 0.8208643247108631, 0.8208643247108633, 0.8208674941875949, 0.8208674941876011, 0.8208776949834151, 0.8208962577272036, 0.8211787697640938, 0.82167675339417, 0.8220741012710533, 0.8228733499677089, 0.8241801361996425, 0.8254705528811958, 0.8264922548751239, 0.8281273312654998, 0.8297983243458348, 0.8315439643929182, 0.8328478044614624, 0.8341346216135812, 0.834533679423224, 0.8348979791262197, 0.8365532740050803, 0.8376865051770624, 0.8382755655353422, 0.8397155284094695], 'macro_overall': [0.5311219913944224, 0.5151341421040533, 0.6337286118922862, 0.5958234708730099, 0.5559321708128347, 0.558461482835341, 0.6338358645333754, 0.6469589687106123, 0.653922909215425, 0.6618590687497913, 0.6618590687497826, 0.661859068749782, 0.6618590687498082, 0.6618590687497364, 0.6618590687497946, 0.6618590687498812, 0.662999112875741, 0.6634512706496222, 0.6725959524546662, 0.6727459550022478, 0.6732859742734805, 0.6733265657194436, 0.6757552244165503, 0.6834649645729511, 0.6837639206588265, 0.6840762114128428, 0.6840859984050266, 0.6843200268481336, 0.6845370332153778, 0.6845370332153863, 0.685163337950128, 0.6874900186205671, 0.6874839774677438, 0.6874839774677621, 0.687483977467688, 0.6874839774676708, 0.6874839774677864, 0.6874839774679039, 0.6874818488361482, 0.6874818488361489, 0.6874879765334833, 0.6876066767123868, 0.687869969723384, 0.6882469210309781, 0.6893059601135215, 0.6921338084230841, 0.6930673140696304, 0.6931068612017168, 0.693515890666092, 0.6951714807938593, 0.6963383885080674, 0.6974823890671894, 0.6980476271090414, 0.698485356133497, 0.6986696305750253, 0.6984929665178975, 0.6975539824636204, 0.6960060013104261, 0.6964115438327863, 0.7002386052906937], 'weighted_inst': [0.7201864063861249, 0.6185727271323564, 0.6995347773444046, 0.0023037092848086395, 0.659383536971086, 0.8060867022888236, 0.8600612458589462, 0.9267837725889121, 0.9263985120745777, 0.8794693725023144, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9130427689058755, 0.7908996286045403, 0.9175387491930864, 0.9267898270339451, 0.9022440552358864, 0.7793573004532571, 0.9387478429891195, 0.9156346838440267, 0.9251187011960138, 0.9161314199045133, 0.8409090909089445, 0.8392144265457102, 0.7535828220113363, 1.0, 0.7761665724786625, 0.8002081504718199, 0.6105769230769337, 1.0, 1.0, 1.0, 1.0, 1.0, 0.7500000000000234, 1.0, 0.7342592592592512, 0.9677419354838683, 0.770889862380732, 0.7940805399989974, 0.7891700460036596, 0.7858047161326727, 0.806542169706791, 0.8642439434735693, 0.8772770174726526, 0.9145195602344586, 0.9522071857020615, 0.9069762278904849, 0.9143097518316895, 0.8945411423839248, 0.9229366981902651, 0.8230669455099079, 0.8949792513190213, 0.9328246121823658, 0.9204266456935217, 0.9218139908487993], 'micro_inst': [0.7427578984895037, 0.6536045205391782, 0.7040799937784759, 0.00437867144440152, 0.6993371055909187, 0.8343260810500136, 0.8688889457392105, 0.9362770562770598, 0.9276190476190433, 0.880964866282113, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9295774647887389, 0.8440366972477019, 0.9222290263319066, 0.9274611398963344, 0.9045383411580579, 0.790123456790136, 0.9418238993711606, 0.916110581506197, 0.9284750337381801, 0.9165402124431375, 0.8571428571427329, 0.8541666666666737, 0.8009153318077538, 1.0, 0.8233532934131564, 0.8367029548988915, 0.682926829268303, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8571428571428724, 1.0, 0.7999999999999927, 0.9836065573770478, 0.8063829787234015, 0.8260869565217259, 0.8287841191066951, 0.8372093023255733, 0.8245203556387762, 0.8794709948903241, 0.8973808501502806, 0.9288208434058591, 0.954140127388534, 0.9238552997723067, 0.9265238879736467, 0.9121909633418587, 0.9356321839080599, 0.8590717299578057, 0.9074421513446037, 0.9376218323586788, 0.9233152594887718, 0.9382845188284519], 'macro_inst': [0.5311219913944224, 0.5756706187309294, 0.5932617062662614, 0.05482446110901328, 0.550423390969072, 0.5432830212083692, 0.7341699721298859, 0.7008717100581815, 0.8749490014723647, 0.846007167694138, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7470995536127866, 0.5690139490139432, 0.7897290589979348, 0.794383611725875, 0.8198631478987801, 0.7465673276684008, 0.7897729560963934, 0.9119319595926688, 0.85047639251062, 0.8315989139899419, 0.863636363636263, 0.7285020800203356, 0.6135701515597661, 1.0, 0.823031991339411, 0.6845326181820516, 0.653125000000003, 1.0, 1.0, 1.0, 1.0, 1.0, 0.75, 1.0, 0.7958333333333334, 0.8888888888888888, 0.6895854059715718, 0.6213969924655843, 0.6820745933827723, 0.7311311398721718, 0.6817386709166288, 0.5851239555177963, 0.6836558827592848, 0.705558437035756, 0.7928067628033125, 0.759991980716334, 0.7223361482244576, 0.7941673843634102, 0.7821492233256934, 0.6441081673131259, 0.6862027373749735, 0.7332485470156525, 0.7678285976195034, 0.7160391690732069]
    }

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
        // if (window.noInferenceIndex >= window.noInferenceLatencyData.length) {
        if (window.noInferenceIndex >= 60) {
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
            min: now - (15 * 60 * 1000), // 15 min ago
            max: now
          }
        }, false, false);

        chartJewel.updateOptions({
          series: [{ data: [lat_jew.toFixed(3)] }],
          subtitle: { text: lat_jew.toFixed(3) }
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
            min: now - (15 * 60 * 1000), // 5 min ago
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
            data: [{ x: now.getTime(), y: parseFloat(macro_inst_mous.toFixed(3)) }]
          },
          {
            data: [{ x: now.getTime(), y: parseFloat(macro_mous.toFixed(3)) }]
          }
        ]);
        chartLine.updateOptions({
          xaxis: {
            min: now - (15 * 60 * 1000), // 5 min ago
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
    console.log('showAnimation', htmlFile)
    const frame = document.getElementById('animation-frame');
    frame.src = htmlFile;
    frame.parentElement.style.display = 'block'; // ensures it's visible
  }

  function updateValueAtIndex(arr, index, value) {
    const newArr = [...arr];
    newArr[index] = parseFloat(value);
    return newArr;
  }

  if (window.state_demo == 0) {
    const now = new Date();
    chartLine.updateOptions({
      xaxis: {
        min: now.getTime() - (15 * 60 * 1000), // 15 min ago
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
        data: [{ x: now.getTime(), y: null }]
      },
      {
        data: [{ x: now.getTime(), y: null }]
      }
    ]);
  }

}, 1000);
