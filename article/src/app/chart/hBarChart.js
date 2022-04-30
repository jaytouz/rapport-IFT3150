import * as d3 from 'd3';
import {tickPaddingX, tickPaddingY, tickSizeX, tickSizeY} from "../style";


/**
 * create and return x axis.
 * @param g
 * @param groups
 * @param width
 * @param height
 * @returns {*}
 */
function createYAxis(g, groups, height, margin, yLabel) {

  var vertPos = -height * 0.65// inverted because of rotation
  var horiPos = -height * 0.3
  if (window.innerWidth < 992) {
    vertPos = -height * 0.55 // inverted because of rotation
    horiPos = -height * 0.1
  }

  const y = d3.scaleBand()
    .domain(groups)
    .range([height, 0])
    .padding([0.2])

  g.append("g")
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y)
      .tickPadding(tickPaddingY)
      .tickSize(tickSizeY))


  g.append("text")
    .attr('class', 'axis-label')
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-90)")
    .attr("x", vertPos)
    .attr("y", horiPos)
    .text(yLabel)

  return y
}


/**
 * Create and return x axis
 * @param g
 * @param min
 * @param max
 * @param height
 * @returns {*}
 */
function createXAxis(g, min, max, width, height, margin, xLabel, xTranslate) {
  const x = d3.scaleLinear()
    .domain([min, max])
    .range([0, width]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
      .tickSize(tickSizeX)
      .ticks(5)
      .tickPadding(tickPaddingX))

  g.append("text")
    .attr('class', 'axis-label x')
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("transform", `translate(${width / 2 + xTranslate}, ${height + height * 0.15})`)
    .attr("x", 0)
    .attr("y", 0)
    .text(xLabel)
  return x
}


/**
 *
 * @param {Array.<Object>} data : array of object where each object contains
 * the {group : name , subgroup1 : value, subgroup2 : value}
 * @param g : svg group for the viz
 * @param {Object} config : Margin param and group size.
 */
export function buildHbarDonVilleNorm(data, g, config, color) {
  const height = config.height
  const width = config.width
  const labels = data.map(d => d.ville)
  const min = 0
  const max = d3.max(data.map(d => +d.don_norm))
  const x = createXAxis(g, min, max, width, height, config.margin, 'Nombre de dons', -width * 0.20)
  const y = createYAxis(g, labels, height, config.margin)
  //pass
  const barchart = g.append('g')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("y", function (d) {
      return y(d.ville)
    })
    .attr("x", function () {
      return x(0)
    })
    .attr("height", y.bandwidth())
    .attr("width", function (d) {
      return x(+d.don_norm)
    })
    .attr("fill", color)
    .style('opacity', 0.8)
  return barchart
}

/**
 *
 * @param {Array.<Object>} data : array of object where each object contains
 * the {group : name , subgroup1 : value, subgroup2 : value}
 * @param g : svg group for the viz
 * @param {Object} config : Margin param and group size.
 */
export function buildHBarAllocation(data, g, config, colorScale) {
  const height = config.height
  const width = config.width
  const labels = data.map(d => d.parti)
  const min = 0
  const max = d3.max(data.map(d => +d.montant))
  const x = createXAxis(g, min, max, width, height, config.margin, "Sommes ($)", -width * 0.1)
  const y = createYAxis(g, labels, height, config.margin)
  //pass


  g.append('g')
    .attr('id', 'allocation-bar-chart')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("y", function (d) {
      return y(d.parti)
    })
    .attr("x", function () {
      return x(0)
    })
    .attr("height", y.bandwidth())
    .attr("width", function (d) {
      return x(+d.montant)
    })
    .attr("fill", function (d) {
      return colorScale(d.parti)
    })
    .style('opacity', 0.8)

}


export function step1Viz3() {
  console.log(d3.select('#allocation-bar-chart').selectAll('.y-axis').selectAll('.tick'))
  d3.select('#hbar_allocation')
    .selectAll('.y-axis')
    .selectAll('.tick')
    .selectAll('text')
      .transition()
      .attr('font-weight', function(d){
        if (d === 'PCQ'){
          return "bold"
        }else{
          return 'lighter'
        }
      })
    // .text(function(d){
    //   console.log(d)
    //   return d
    // })
}


export function step2Viz3() {
  d3.select('#hbar_allocation')
    .selectAll('.y-axis')
    .selectAll('.tick')
    .selectAll('text')
    .transition()
    .attr('font-weight', 'normal')
}


export function step1Viz5(barchart, baseColor, colorPCQ) {
  barchart
    .transition()
    .attr("fill", function (d, i) {
      if (i === 9) {
        return colorPCQ
      } else {
        return baseColor
      }
    })
}

export function step2Viz5(barchart, baseColor, colorPCQ) {
  barchart
    .transition()
    .attr("fill", function (d, i) {
      if (i === 0) {
        return colorPCQ
      } else {
        return baseColor
      }
    })
}

export function step3Viz5(barchart, baseColor, colorPCQ) {
  barchart
    .transition()
    .attr("fill", function (d, i) {
      if (i === 4) {
        return colorPCQ
      } else {
        return baseColor
      }
    })
}

