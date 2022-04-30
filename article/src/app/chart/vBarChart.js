import * as d3 from "d3";
import {tickPaddingX, tickPaddingY, tickSizeX, tickSizeY} from "../style";

const hTranslate = 2
const vTranslate = 2.5

// Legend
const desktopFontsizeLegend = '2.5em'
const mobileFontsizeLegend = '2em'

const xTranslateText = 0.05 // % of width
const stackHeight = 200 // height of rect in legend
const [vAnc, vUni, vFid] = [0.10, 0.7, 0.3] // % of the rect in legend

// opacity
const opFidele = 0.9
const opUnique = 0.3

//

/**
 * append and transform x axis group
 * @param g
 * @param height
 * @returns {*}
 */
function appendXAxis(g, height) {
  g.append("g")
    .attr('id', 'xAxisBar')
    .attr("transform", "translate(0," + height + ")");
}


function appendYLabel(margin) {
  var vertPos = -margin.left * vTranslate // inverted because of rotation
  var horiPos = -margin.left / hTranslate
  if (window.innerWidth < 992) {
    vertPos = -margin.left * vTranslate // inverted because of rotation
    horiPos = -margin.left / hTranslate
  }
  d3.select('#yAxisBar')
    .append("text")
    .attr('class','axis-label')
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-90)")
    .attr("x", vertPos)
    .attr("y", horiPos)
    .text("Nombre de donateurs (%)")
}

/**
 * Append y axis group
 * @param g
 * @returns {*}
 */
function appendYAxis(g) {
  g.append("g")
    .attr('id', 'yAxisBar');
}

/**
 * Draw x axis based on canvas width  and domain
 * @param width
 * @param domain : name of the political entity as written down in the dataset.
 */
function drawXAxis(width, domain) {
  const x = d3.scaleBand()
    .domain(domain)
    .range([0, width])
    .padding([0.2])
  d3.select('#xAxisBar').call(d3.axisBottom(x)
    .tickSize(tickSizeX)
    .tickPadding(tickPaddingX));


  d3.select('#xAxisBar')
    .attr('font-weight', 'bold')

}

/**
 * Draw y axis based on min max and height
 * @param min
 * @param max
 * @param height
 */
function drawYAxis(min, max, height) {
  const y = d3.scaleLinear()
    .domain([min, max])
    .range([height, 0])

  d3.select('#yAxisBar').call(d3.axisLeft(y)
    .tickSize(tickSizeY)
    .tickPadding(tickPaddingY))

}


/**
 * @param {*} svgObj
 * @param {*} colorScale
 *
 */
function drawLegend(svgObj, colorScale, height, width) {

  const colorTag = [
    {
      type: 'Ancien',
      color: '#ffffff',
      y: 0,
      height: stackHeight * vAnc
    },
    {
      type: 'Unique',
      color: `rgba(0,0,0,${opUnique})`,
      y: stackHeight * vAnc,
      height: stackHeight * vUni
    },
    {
      type: 'Fidèle',
      color: `rgba(0,0,0,${opFidele})`,
      y: stackHeight * vUni,
      height: stackHeight * vFid
    }
  ]

  const xTrText = xTranslateText * width // % of widthh
  const rect = svgObj
    .append('g')
    .attr('class', 'legend-container')
    .attr('transform', `translate(${0.99 * width},${0.4 * height})`);

  rect.selectAll('rect')
    .data(colorTag)
    .enter()
    .append('rect')
    .style('fill', d => d.color)
    .attr('width', 50)
    .attr('x', 0)
    .attr('width', 50)
    .attr('y', function (d) {
      return d.y - 30
    })
    .attr('height', function (d) {
      return d.height
    })
    .style('fill', d => d.color)
    .attr('stroke', '#000000')
    .attr('stroke-width', 1)


  rect.selectAll('text')
    .data(colorTag)
    .enter()
    .append('text')
    .attr('y', function(d){
      if (d.type === 'Ancien'){
        return - stackHeight * vAnc/4
      }else if(d.type === 'Unique'){
        return d.y + stackHeight * vUni/3
      }else{
        return d.y + stackHeight * vFid/4
      }
    })
    .attr('x', xTrText)
    .text(d => d.type);

}

/**
 * Create all svg group and add rectangles for the Nouveau donateur and Types de donateurs.
 * @param g
 * @param dataPeriod
 * @param dataType
 * @param config
 * @param colorScale
 */
export function initBarChart(g, dataPeriod, dataType, config, colorScale) {
  const entity = Array.from(new Set(dataPeriod.map(d => d.dernierDon)))
  appendXAxis(g, config.height)
  appendYAxis(g)
  drawXAxis(config.width, entity)
  drawYAxis(0, 100, config.height)
  g.append('g').attr('id', 'rectPeriod')
  g.append('g').attr('id', 'rectType')
  appendYLabel(config.margin)

  const legend = g.append('g').attr('id', 'legendType').style('opacity', 0)
  drawLegend(legend, colorScale, config.height, config.width);


  initBarPeriod(g, dataPeriod, config, colorScale, entity)
  initBarType(g, dataType, config, colorScale, entity)

  window.addEventListener('resize', () => {
    if (window.innerWidth < 992) {
      d3.select('#yAxisBar').attr('font-size', 30);
      d3.select('#xAxisBar').attr('font-size', 30);
    } else {
      d3.select('#yAxisBar').attr('font-size', 20);
      d3.select('#xAxisBar').attr('font-size', 20);
    }
  })

}

/**
 * Add rectangles for the Nouveau donateur
 * @param g
 * @param data
 * @param config
 * @param colorScale
 * @param entity
 */
export function initBarPeriod(g, data, config, colorScale, entity) {
  const subgroups = data.columns.slice(3)

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);


  const x = d3.scaleBand()
    .domain(entity)
    .range([0, config.width])
    .padding([0.2])

  const stackedData = d3.stack()
    .keys(subgroups)
    (data)

  d3.select('#rectPeriod')
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData, function (d) {
      d.map(function (rect) {
        rect['period'] = d.key
        return rect
      })
    })
    .enter().append("g")
    .selectAll("rect")
    .data(function (d) {
      return d
    })
    .enter().append("rect")
    .attr("x", function (d) {
      return x(d.data.dernierDon);
    })
    .attr("width", x.bandwidth())
    .style('opacity', 0.9)
    .attr("fill", function (d) {
      if (d.period === 'p_nouveau') {
        return colorScale(d.data.dernierDon) //nouveau based on color scale
      }
      return '#ffffff' //ancien white
    })

}

export function initBarType(g, data, config, colorScale, entity) {
  const subgroups = data.columns.slice(4)

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);


  const x = d3.scaleBand()
    .domain(entity)
    .range([0, config.width])
    .padding([0.2])

  const stackedData = d3.stack()
    .keys(subgroups)
    (data)

  d3.select('#rectType')
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData, function (d) {
      d.map(function (rect) {
        rect['type'] = d.key
        return rect
      })
    })
    .enter().append("g")
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) {
      return d
    })
    .enter().append("rect")
    .attr("x", function (d) {
      return x(d.data.dernierDon);
    })
    .attr("width", x.bandwidth())
    .style('opacity', 0.9)
    .attr("fill", function (d) {
      return colorScale(d.data.dernierDon)
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr('stroke', '#000000')
    .attr('stroke-width', 1)
    .style('fill-opacity', function (d) {
      if (d.type === 'p_unique') {
        return 0.30
      } else {
        return 0.9
      }
    })
    .style('opacity', 0)
}

function hideBarNouveau(config) {

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);

  d3.select('#rectPeriod')
    .selectAll('g')
    .selectAll('rect')
    .attr("height", function (d) {
      if (d.period === 'p_nouveau') {
        return y(100)
      } else {
        return y(d[0]) - y(d[1])
      }
    })
    .transition()
    .style('opacity', function (d) {
      if (d.period === 'p_nouveau') {
        return 0
      } else {
        return 0.9
      }
    })
    .attr("stroke-width", function (d) {
    if (d.period === 'p_nouveau') {
      return 1//nouveau based on color scale
    }
    return 0 //ancien white
  })
}

function showBarNouveauOnly(config) {
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);

  d3.select('#rectPeriod')
    .selectAll('g')
    .selectAll('rect')
    .attr("height", function (d) {
    return y(d[0]) - y(d[1]);
  })
    .attr("y", function (d) {
    return y(d[1]);
  })
    .attr("stroke-width", function (d) {
      if (d.period === 'p_nouveau') {
        return 1//nouveau based on color scale
      }
      return 0 //ancien white
    })
    .attr("stroke", '#000000')
    .transition()
    .style('opacity', 0.9)


  d3.select('#legendType')
    .transition()
    .style('opacity', 0)
}

function showNoueauAndAncien(config) {
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);

  d3.select('#rectPeriod')
    .selectAll('g')
    .selectAll('rect')
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("stroke-width", 1)
    .attr("stroke", '#000000')
    .transition()
    .style('opacity', 0.9)


  d3.select('#legendType')
    .transition()
    .style('opacity', 0)
}

function hideBarNouveauType(config) {
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);


  d3.select('#rectType')
    .selectAll('g')
    .selectAll('rect')
    .attr("height", y(100))
    .transition()
    .style('opacity', 0)
}

function showBarNouveauType(config) {
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([config.height, 0]);

  d3.select('#rectPeriod')
    .selectAll('g')
    .selectAll('rect')
    .transition()
    .attr("stroke-width", function (d) {
      if (d.period === 'p_nouveau') {
        return 0//nouveau based on color scale
      }
      return 1 //ancien white
    })


  d3.select('#rectType')
    .selectAll('g')
    .selectAll('rect')
    .attr("height", function (d) {
    return y(d[0]) - y(d[1]);
  })
    .transition()
    .style('opacity', 0.9)


  d3.select('#legendType')
    .transition()
    .style('opacity', 1)
}


export function step1Viz1(config) {
  showBarNouveauOnly(config)
  hideBarNouveauType(config)

}

export function step2Viz1(config) {
  showNoueauAndAncien(config)
  hideBarNouveauType(config)

}

export function step3Viz1(config) {
  hideBarNouveau(config)
  showBarNouveauType(config)
}
