import data from "../../data/dataset.json"
import * as d3 from "d3"
import { useMemo, useState } from "preact/hooks"

// export const initChart = () => {
//   const labelElement = document.querySelector("#label")

//   // set the dimensions and margins of the graph
//   const margin = { top: 10, right: 30, bottom: 30, left: 60 },
//     width = 1200 - margin.left - margin.right,
//     height = 700 - margin.top - margin.bottom

//   // append the svg object to the body of the page
//   const svg = d3
//     .select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//   // Add X axis
//   const x = d3.scaleLinear().domain([0.65, 1]).range([0, width])
//   svg
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))

//   // Add Y axis
//   const y = d3.scaleLinear().domain([-10, 160]).range([height, 0])
//   svg.append("g").call(d3.axisLeft(y))

//   // Add dots
//   svg
//     .append("g")
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) {
//       return x(d.hdi["2019"])
//     })
//     .attr("cy", function (d) {
//       return y(d.excessMortality["2021"])
//     })
//     .attr("r", 5)
//     .attr("stroke", "rgba(60, 151, 218, 1)")
//     .style("fill", "rgba(60, 151, 218, 0.5)")
//     .on("mouseover", showLabel)
//     .on("mouseleave", hideLabel)

//   function showLabel(el, d) {
//     labelElement.textContent = d.country
//   }

//   function hideLabel() {
//     labelElement.textContent = ""
//   }
// }

const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom

export const Chart = () => {
  const svgAttrs = {
    width: width + margin.left + margin.top,
    height: height + margin.top + margin.bottom,
    transform: `translate(${margin.left}, ${margin.top})`,
  }

  const xScale = useMemo(
    () => d3.scaleLinear().domain([0.65, 1]).range([0, width]),
    [width]
  )
  const yScale = useMemo(
    () => d3.scaleLinear().domain([-10, 160]).range([height, 0]),
    [height]
  )

  return (
    <>
      <svg {...svgAttrs}>
        <g>
          <g transform={`translate(${[0, height].join(",")})`}>
            <XAxis scale={xScale} />
          </g>
          <g transform={`translate(${[0, 0].join(",")})`}>
            <YAxis scale={yScale} />
          </g>
          {data.map((d) => {
            return (
              <Country
                x={xScale(d.hdi["2019"])}
                y={yScale(d.excessMortality["2021"])}
                key={d.country}
              />
            )
          })}
        </g>
      </svg>
      <Tooltip d={data[1]} />
    </>
  )
}

const Country = ({ x, y }) => {
  const [active, setActive] = useState(false)

  const attrs = {
    stroke: "rgba(60, 151, 218, 1)",
    fill: `rgba(60, 151, 218, ${active ? 1 : 0.5})`,
    r: 5,
    cx: x,
    cy: y,
  }

  return (
    <circle
      {...attrs}
      class="dot"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />
  )
}

const XAxis = ({ scale }) => {
  const domain = scale.domain()
  const range = scale.range()

  const ticks = useMemo(() => {
    const width = range[1] - range[0]
    const pixelsPerTick = 30
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick))

    return scale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      offset: scale(value),
    }))
  }, [domain.join("-"), range.join("-")])

  return (
    <>
      <path
        fill="none"
        stroke="currentColor"
        d={["M", range[0], 6, "v", -6, "H", range[1], "v", 6].join(" ")}
        // M-6,660.5H0.5V0.5H-6
      />
      {ticks.map(({ value, offset }) => {
        return (
          <g key={value} transform={`translate(${offset} 0)`}>
            <line y2={6} fill={"none"} stroke={"currentColor"} />
            <text
              fill="currentColor"
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)",
              }}
            >
              {value}
            </text>
          </g>
        )
      })}
    </>
  )
}

const YAxis = ({ scale }) => {
  const domain = scale.domain()
  const range = scale.range()

  const ticks = useMemo(() => {
    const height = range[1] - range[0]
    const pixelsPerTick = 30
    const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick))

    return scale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      offset: scale(value),
    }))
  }, [domain.join("-"), range.join("-")])

  return (
    <>
      <path
        fill="none"
        stroke="currentColor"
        d={["M", -6, range[1], "H", 0, "V", range[0], "h", -6].join(" ")}

        // result
        // M -6 660.5 H 0.5 V 0.5 H -6

        // not:
        // M -6 660 h 0 V 0 h 6
      />
      {ticks.map(({ value, offset }) => {
        return (
          <g key={value} transform={`translate(${offset} 0)`}>
            <line y2={6} fill={"none"} stroke={"currentColor"} />
            <text
              fill="currentColor"
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)",
              }}
            >
              {value}
            </text>
          </g>
        )
      })}
    </>
  )
}

const Tooltip = ({ d }) => {
  return (
    <div>
      <h2>{d.country}</h2>
      <dl>
        <dt>HDI</dt>
        <dd>{d.hdi["2019"]}</dd>
        <dt>Übersterblichkeit 2021</dt>
        <dd>{d.excessMortality["2021"]}</dd>
      </dl>
    </div>
  )
}
