/**
 * viz.js
 * =======
 * File used to define the visualization section.
 */

import * as d3 from 'd3';
import {
  initBarChart,
  step1Viz1,
  step2Viz1, step3Viz1
} from "./chart/vBarChart";
import {
  buildHbarDonVilleNorm,
  buildHBarAllocation,
  step1Viz3,
  step2Viz3,
  step1Viz5,
  step2Viz5,
  step3Viz5
} from "./chart/hBarChart";
import {
  initLineViz2,
  initLineViz4,
  step1Viz2, step1Viz4, step2Viz2, step2Viz4, step3Viz2, step3Viz4, step4Viz4, step5Viz4,
} from "./chart/lineChart";
import {colorCAQ, colorPCQ, entityColor, neutralColor, neutralColorHighlight} from "./style";

const config = {
  width: 1400,
  height: 1000,
  margin: {
    top: 100,
    right: 200,
    bottom: 100,
    left: 300
  }
}

const configBarChar1 = {
  width: 1400,
  height: 1000,
  margin: {
    top: 0,
    right: 100,
    bottom: 200,
    left: 200
  }
}

const configBarChar2 = {
  width: 1400,
  height: 1000,
  margin: {
    top: 0,
    right: 0,
    bottom: 200,
    left: 400
  }
}

function getFullWidth(config) {
  return config.margin.left + config.width + config.margin.right
}

function getFullHeight(config) {
  return config.margin.top + config.height + config.margin.bottom;
}

const fullWidth = getFullWidth(config)
const fullHeight = getFullHeight(config)
const fullWidthHBar1 = getFullWidth(config)
const fullHeightHBar1 = getFullHeight(config)
const fullWidthHBar2 = getFullWidth(config)
const fullHeightHBar2 = getFullHeight(config)


// VIZ 1 NOUVEAU DONATEUR
const vizContainer1 = d3.select('#nouveau_donateur');
const svg1 = vizContainer1.append('svg')
  .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
  .attr('preserveAspectRatio', 'xMidYMid');
const gviz1 = svg1.append('g')
  .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

// VIZ 2 NOMBRE DE DON PAR ANNEE POUR CHAQUE PARTI
const vizContainer2 = d3.select('#nbr_dons');
const svg2 = vizContainer2.append('svg')
  .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
  .attr('preserveAspectRatio', 'xMidYMid');
const gviz2 = svg2.append('g')
  .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

// VIZ 3 ALLOCATION PAR PARTI
const vizContainer3 = d3.select('#hbar_allocation');
const svg3 = vizContainer3.append('svg')
  .attr('viewBox', `0 0 ${fullWidthHBar1} ${fullHeightHBar1}`)
  .attr('preserveAspectRatio', 'xMidYMid');

const gviz3 = svg3.append('g')
  .attr('transform', `translate(${configBarChar1.margin.left}, ${configBarChar1.margin.top})`);

// VIZ 4 MOYENNE ET SOMME DE DON PAR ANNEE POUR CHAQUE PARTI
const vizContainer4 = d3.select('#mean_dons_annees');
const svg4 = vizContainer4.append('svg')
  .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
  .attr('preserveAspectRatio', 'xMidYMid');
const gviz4 = svg4.append('g')
  .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

// VIZ 5 NOMBRE DE DONS NORMALISE PAR VILLE
const vizContainer5 = d3.select('#hbar_don_ville');
const svg5 = vizContainer5.append('svg')
  .attr('viewBox', `0 0 ${fullWidthHBar2} ${fullHeightHBar2}`)
  .attr('preserveAspectRatio', 'xMidYMid');
const gviz5 = svg5.append('g')
  .attr('transform', `translate(${configBarChar2.margin.left}, ${configBarChar2.margin.top})`)
  .attr('preserveAspectRatio', 'xMidYMid');

export async function initialize() {

  const dataNouveauAncien = await d3.csv('./data/viz1_nouveau.csv');
  const dataTypeNouveau = await d3.csv('./data/viz2_nouveau_type.csv');
  let dataNbrDons = await d3.csv('./data/viz3_small_mult_dons_annees.csv');
  const dataAllocation = await d3.csv('./data/viz4_allocation.csv');
  let dataMeanDons = await d3.csv('./data/viz5_small_mult_mean_dons_annees.csv');
  let dataSumDons = await d3.csv('./data/viz6_small_mult_somme_dons_annees.csv');
  const dataDonsVilles = await d3.csv('./data/viz7_dons_ville_par_habitant.csv');


  const entity_keys = Array.from(new Set(dataNbrDons.map(d => d.entity)))

  const colorScaleEntity = d3.scaleOrdinal()
    .domain(entity_keys)
    .range(entityColor)

  // VIZ 1 NOUVEAU ET TYPE DE DONATEUR
  initBarChart(gviz1, dataNouveauAncien, dataTypeNouveau, config, colorScaleEntity)

  // VIZ 2 NOMBRE DE DON PAR ANNEE
  dataNbrDons = dataNbrDons.map(function (d) {
    return {year: d3.timeParse("%Y")(+d.year), entity: d.entity, value: +d.nombre}
  })
  initLineViz2(gviz2, dataNbrDons, config, colorScaleEntity)

  // VIZ 3 MONTANT EN ALLOCATION
  buildHBarAllocation(
    dataAllocation,
    gviz3,
    configBarChar1,
    colorScaleEntity)

  // VIZ 4 MOYENNE ET SOMME DES DONS
  dataMeanDons = dataMeanDons.map(function (d) {
    return {year: d3.timeParse("%Y")(+d.year), entity: d.entity, value: +d.nombre}
  })
  dataSumDons = dataSumDons.map(function (d) {
    return {year: d3.timeParse("%Y")(+d.year), entity: d.entity, value: +d.nombre}
  })
  initLineViz4(gviz4, dataMeanDons, dataSumDons, config, colorScaleEntity)

  // VIZ 5 NOMBRE DE DONS PAR VILLE
  const hbar_viz5 = buildHbarDonVilleNorm(
    dataDonsVilles,
    gviz5,
    configBarChar2,
    neutralColor
  )

  return [
    [
      () => {
        step1Viz1(config)
      },
      () => {
        step2Viz1(config)
      },
      () => {
      },
      () => {
        step3Viz1(config)
      }],
    [() => {
      step1Viz2()
    }, () => {
      step2Viz2()
    }, () => {
    }],
    [() => {
      step1Viz3()
    }, () => {
      step2Viz3()
    }
    ],
    [
      () => {
        step1Viz4()
      },
      () => {
        step2Viz4(dataMeanDons, config)
      },
      () => {
      },
      () => {
        step3Viz4(dataSumDons, config)

      },
      () => {
        step4Viz4(config)

      },
      () => {
        step5Viz4()
      }],
    [
      () => {
        step1Viz5(hbar_viz5, neutralColor, neutralColorHighlight)
      },
      () => {
        step2Viz5(hbar_viz5, neutralColor, neutralColorHighlight)

      },
      () => {
        step3Viz5(hbar_viz5, neutralColor, neutralColorHighlight)

      },
      () => {

      }],
  ]

}
