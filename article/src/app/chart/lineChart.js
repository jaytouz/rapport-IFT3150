import * as d3 from 'd3';
import {tickPaddingX, tickPaddingY, tickSizeX, tickSizeY} from "../style";

const hTranslate = 1.2
const vTranslate = 2.5
const hTranslateSum = 1.2

// Legend
const yTranslateText = 0.04 // % of height
const xTranslateText = 0.035 // % of width
const yTranslateCircle = 0.04 // % of height
const circleRadius = 0.015 // % of height
const textCorrection = 0.005


/**
 * create and return x axis.
 * @param g
 * @param groups
 * @param width
 * @param height
 * @returns {*}
 */
function updateYAxis(min, max, height, id, numTicks=5) {
  const y = d3.scaleLinear()
    .domain([min, max])
    .range([height, 0]);

  d3.select(id)
    .transition()
    .call(d3.axisLeft(y)
      .tickPadding(tickPaddingY)
      .tickSize(tickSizeY)
      .ticks(numTicks));

  return y
}

function appendYLabel(id) {
  d3.select('#' + id)
    .append('text')
}

function updateYLabel(id, margin, horiTranslateYLabel, vertTranslateYLabel, name) {
  var vertPos = -margin.left * vertTranslateYLabel // inverted because of rotation
  var horiPos = -margin.left / horiTranslateYLabel
  // if (window.innerWidth < 992) {
  //   fontSize = mobileFontsizeLabel;
  // }
  d3.select('#' + id)
    .select('text')
    .attr('class', 'axis-label')
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-90)")
    .attr("x", vertPos)
    .attr("y", horiPos)
    .text(name)
}

/**
 * Create and return x axis
 * @param g
 * @param min
 * @param max
 * @param height
 * @returns {*}
 */
function updateXAxis(years, width, id) {
  const x = d3.scaleTime()
    .domain(d3.extent(years))
    .range([0, width]);

  d3.select(id)
    .transition()
    .call(d3.axisBottom(x)
      .tickPadding(tickPaddingX)
      .tickSize(tickSizeX)
      .ticks(4))

  return x
}

function updateGrid(x, y, width, height, idVert, idHori) {
  d3.select(idVert)
    .attr("stroke-width", 0.5)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
      .tickSize(-height)
      .ticks(8)
      .tickFormat("")
    )

  // add the Y gridlines
  d3.select(idHori)
    .attr("stroke-width", 0.5)
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat("")
      .ticks(8)
    )
}

export function initLineViz2(g, dataNbr, config, colorScale) {
  g.append('g')
    .attr('class', 'line-chart')
    .attr('id', 'lineXAxisViz2')
    .attr("transform", "translate(0," + config.height + ")")

  g.append('g')
    .attr('id', 'lineYAxisViz2')
  g.append('g')
    .attr('id', 'gridVertViz2')
  g.append('g')
    .attr('id', 'gridHoriViz2')

  g.append('g')
    .attr('id', 'lineChartViz2')

  appendYLabel('lineYAxisViz2')
  updateYLabel('lineYAxisViz2', config.margin, hTranslate,vTranslate, 'Nombre de dons')

  const legend = g.append('g')
    .attr('id', 'legend-nombre');

  drawLine(dataNbr,
    config.width,
    config.height,
    colorScale,
    'lineNbr',
    'lineChartViz2',
    '#lineXAxisViz2',
    '#lineYAxisViz2',
    '#gridHoriViz2',
    '#gridVertViz2',
    'nombre-annotation')

  const y = d3.scaleLinear()
    .domain(d3.extent(dataNbr, d=>d.value))
    .range([config.height, 0]);

  d3.select('#lineChartViz2')
    .selectAll('.line-annotation')
    .attr("y", function (d){
      if (d.entity === 'PLQ'){
        return y(d.value) + config.height*0.03
      }else{
        return y(d.value)
      }
    })

  drawLegend(legend, dataNbr, colorScale, config.height, config.width, 0.89);

}

export function initLineViz4(g, dataMean, dataSum, config, colorScale) {
  g.append('g')
    .attr('class', 'line-chart')
    .attr('id', 'lineXAxisViz4')
    .attr("transform", "translate(0," + config.height + ")")

  g.append('g')
    .attr('id', 'lineYAxisViz4')
  g.append('g')
    .attr('id', 'gridVertViz4')
  g.append('g')
    .attr('id', 'gridHoriViz4')
  g.append('g')
    .attr('id', 'lineChartViz4')

  const legend = g.append('g')
    .attr('id', 'legend-mean-sum');

  appendYLabel('lineYAxisViz4')
  updateYLabel('lineYAxisViz4', config.margin, hTranslate,vTranslate, 'Montant moyen ($)')

  drawLine(dataMean,
    config.width,
    config.height,
    colorScale,
    'lineMean',
    'lineChartViz4',
    '#lineXAxisViz4',
    '#lineYAxisViz4',
    '#gridHoriViz4',
    '#gridVertViz4',
    'mean-annotation')

  roundAnnotation('mean-annotation')

  drawLegend(legend, dataMean, colorScale, config.height, config.width, 0.75);


  drawLine(dataSum,
    config.width,
    config.height,
    colorScale,
    'lineSum',
    'lineChartViz4',
    '#lineXAxisViz4',
    '#lineYAxisViz4',
    '#gridHoriViz4',
    '#gridVertViz4',
    'sum-annotation')

  roundAnnotation('sum-annotation', 0)
}

function dashedThreshold(yearLim, path) {
  for (let i = 700; i <= path.getTotalLength(); i++) {
    if (path.getPointAtLength(i).x > yearLim) {
      return i
    }
  }
}

function createDashedString(start, path) {
  let string = ""
  for (let i = start; i < path.getTotalLength(); i++) {
    if (i % 2 === 0) {
      string += "10,"
    } else {
      string += "5,"
    }
  }
  string += "10"
  return string
}


/**
 * @param {*} svgObj
 * @param {*} colorScale
 *
 */

function drawLegend(svgObj, dataNbr, colorScale, height, width, xTranslate) {

  const entity_keys = Array.from(new Set(dataNbr.map(d => d.entity)));

  const colorTag = entity_keys.map(key => {
    return {
      entity: key,
      color: colorScale(key)
    }
  });

  const yTrText = yTranslateText * height // % of height
  const xTrText = xTranslateText * width // % of height
  const yTrCir = yTranslateCircle * height // % of height
  const r = circleRadius * height// % of height
  const err = textCorrection * height


  const rect = svgObj
    .append('g')
    .attr('class', 'legend-container')
    .attr('background', 'white')
    .attr('transform', `translate(${xTranslate * width},${50})`);

  rect.selectAll('circle')
    .data(colorTag)
    .enter()
    .append('circle')
    .attr('cy', (d, i) => i * yTrCir)
    .attr('cx', 0)
    .attr('r', r)
    .style('fill', d => d.color);

  rect.selectAll('text')
    .data(colorTag)
    .enter()
    .append('text')
    .attr('y', (d, i) => i * yTrText)
    .attr('x', xTrText)
    .attr('dy', r/2 + err)
    .text(d => d.entity);

}


/**
 *
 * @param {Array.<Object>} data : array of object where each object contains
 * the {group : name , subgroup1 : value, subgroup2 : value}
 * @param g : svg group for the viz
 * @param {Object} config : Margin param and group size.
 */
function drawLine(data, width, height, colorScale, clsname, idViz, idX, idY, idHori, idVert, annotationId) {

  const nestedData = d3.group(data, d => d.entity);

  const [x, y] = updateAxis(data, width, height, idX, idY, idHori, idVert)
  const yearLim = x(d3.timeParse("%Y")(2021))

  d3.select('#' + idViz)
    .selectAll(".line")
    .data(nestedData)
    .join("path")
    .attr('class', clsname)
    .attr("fill", "none")
    .attr("stroke", function (d) {
      return colorScale(d[0])
    })
    .attr("d", function (d) {
      return d3.line()
        .x(function (d) {
          return x(d.year)
        })
        .y(function (d) {
          return y(+d.value)
        })(d[1])
    })
    .attr('stroke-dasharray', function () {
      const startDash = dashedThreshold(yearLim, this)
      return [0, "0", startDash, createDashedString(startDash, this)]
    })
    .attr("stroke-width", 10)
    .style('opacity', 0)

  drawAnnotation(y, nestedData, annotationId, idViz, width, colorScale)

}

function drawAnnotation(y, nestedData, containerId, idViz, width, colorScale){

  const annotationData = []
  nestedData.forEach(function (d){
      annotationData.push(d[d.length-1])
    }
  )

  d3.select('#' + idViz)
    .append('g')
    .attr('id', containerId)
    .selectAll("text")
    .data(annotationData)
    .join("text")
    .attr('class', 'line-annotation')
    .text(function(d){
      return d.value
    })
    .attr("x", width + width * 0.01)
    .attr("y", function(d){
      return y(+d.value)
    })
    .attr('fill', function(d){
      return colorScale(d.entity)
    })
    .style('opacity', 0)
}

export function updateAxis(data, width, height, idX, idY, idHori, idVert, numTicks=8) {
  const years = Array.from(new Set(data.map(d => d.year)))
  const min = 0
  const max = d3.max(data.map(d => +d.value))
  const x = updateXAxis(years, width, idX)
  const y = updateYAxis(min, max, height, idY, numTicks)
  updateGrid(x, y, width, height, idVert, idHori)
  return [x, y]
}

function roundAnnotation(annotationId, decimals=2) {
  d3.select("#" + annotationId)
    .selectAll('.line-annotation')
    .text(function (d) {
      return d.value.toFixed(decimals)
    })
}

export function step1Viz2() {
  d3.select('#lineChartViz2')
    .selectAll('.lineNbr')
    .transition()
    .style('opacity', function (d) {
      if (d[0] !== 'PCQ') {
        return 0
      } else {
        return 0.8
      }
    })

  d3.select('#lineChartViz2')
    .select('#nombre-annotation')
    .selectAll('.line-annotation')
    .style('opacity', function(d){
      if (d.entity === 'PCQ'){
        return 1
        }else{
        return 0
      }
    })


}

export function step2Viz2() {
  d3.select('#lineChartViz2')
    .selectAll('.lineNbr')
    .transition()
    .style('opacity', 0.8)

  d3.select('#lineChartViz2')
    .select('#nombre-annotation')
    .selectAll('.line-annotation')
    .style('opacity', function(d){
      if (['PCQ', 'PQ', 'QS', 'CAQ', 'PLQ'].includes((d.entity))){
        return 1
      }else{
        return 0
      }
    })

}

export function step1Viz4() {
  hideSumAll()
  showMeanPCQ()
}

export function step2Viz4(dataMean, config) {
  hideSumAll()
  axisSumToMean(dataMean, config)
  showMeanAll()
}

export function step3Viz4(dataSum, config) {
  hideMeanAll()
  hideSumAll()
  axisMeanToSum(dataSum, config)
}

export function step4Viz4() {
  hideMeanAll()
  showSumPCQ()
  d3.select('#h3Viz4').text("Sommes amassées par parti")

}

export function step5Viz4() {
  showSumAll()
  d3.select('#h3Viz4').text("Sommes amassées par parti")

}

function showMeanPCQ(){
  d3.select('#lineChartViz4')
    .selectAll('.lineMean')
    .transition()
    .style('opacity', function (d) {
        if (d[0] === 'PCQ') {
          return 0.8
        } else {
          return 0
        }
      }
    )

  d3.select('#lineChartViz4')
    .select('#mean-annotation')
    .selectAll('.line-annotation')
    .transition()
    .style('opacity', function(d){
      if (d.entity === 'PCQ'){
        return 1
      }else{
        return 0
      }
    })
}

function showMeanAll(){
  d3.select('#lineChartViz4')
    .selectAll('.lineMean')
    .transition()
    .style('opacity', 0.8)

  d3.select('#lineChartViz4')
    .select('#mean-annotation')
    .selectAll('.line-annotation')
    .transition()
    .style('opacity', 1)
}

function axisMeanToSum(dataSum, config){
  updateAxis(dataSum,
    config.width,
    config.height,
    '#lineXAxisViz4',
    '#lineYAxisViz4',
    '#gridHoriViz4',
    '#gridVertViz4')

  d3.select('#h3Viz4').text("Sommes amassées par parti")
  updateYLabel('lineYAxisViz4', config.margin, hTranslateSum,vTranslate, 'Montant total ($)')
}

function axisSumToMean(dataMean, config){
  d3.select('#h3Viz4').text('Valeur moyenne des dons par année pour chaque parti')
  updateYLabel('lineYAxisViz4', config.margin, hTranslate,vTranslate, 'Montant moyen ($)')
  updateAxis(dataMean,
    config.width,
    config.height,
    '#lineXAxisViz4',
    '#lineYAxisViz4',
    '#gridHoriViz4',
    '#gridVertViz4')
}

function showSumPCQ(){
  d3.select('#lineChartViz4')
    .selectAll('.lineSum')
    .transition()
    .style('opacity', function (d) {
      if (d[0] === 'PCQ') {
        return 0.8
      } else {
        return 0
      }
    })

  d3.select('#lineChartViz4')
    .select('#sum-annotation')
    .selectAll('.line-annotation')
    .transition()
    .style('opacity', function(d){
      if (d.entity === 'PCQ'){
        return 1
      }else{
        return 0
      }
    })
}

function showSumAll(){
  hideMeanAll()
  d3.select('#lineChartViz4')
    .selectAll('.lineSum')
    .transition()
    .style('opacity', 0.8)

  d3.select('#lineChartViz4')
    .select('#sum-annotation')
    .selectAll('.line-annotation')
    .transition()
    .style('opacity', 1)
}

function hideSumAll(){
  d3.select('#lineChartViz4')
    .select('#sum-annotation')
    .selectAll('.line-annotation')
    .style('opacity', 0)

  d3.select('#lineChartViz4')
    .selectAll('.lineSum')
    .style('opacity', 0)
}

function hideMeanAll(){
  d3.select('#lineChartViz4')
    .select('#mean-annotation')
    .selectAll('.line-annotation')
    .style('opacity', 0)

  d3.select('#lineChartViz4')
    .selectAll('.lineMean')
    .style('opacity', 0)
}
