import data from "../../data/dataset.json"
import * as d3 from "d3"

export const initChart = () => {
  const labelElement = document.querySelector("#label")

  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Add X axis
  const x = d3.scaleLinear().domain([0.65, 1]).range([0, width])
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  const y = d3.scaleLinear().domain([-10, 160]).range([height, 0])
  svg.append("g").call(d3.axisLeft(y))

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.hdi["2019"])
    })
    .attr("cy", function (d) {
      return y(d.excessMortality["2021"])
    })
    .attr("r", 5)
    .attr("stroke", "rgba(60, 151, 218, 1)")
    .style("fill", "rgba(60, 151, 218, 0.5)")
    .on("mouseover", showLabel)
    .on("mouseleave", hideLabel)

  function showLabel(el, d) {
    labelElement.textContent = d.country
  }

  function hideLabel() {
    labelElement.textContent = ""
  }
}
