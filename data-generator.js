#! /usr/local/bin/node

import * as d3 from "d3"
import { readFile, writeFile } from "node:fs/promises"

const hdiString = await readFile("data/hdi.csv", "utf8")
/* Filter the whole HDI dataset for the 2019 entries. */
const hdiData = d3.csvParse(hdiString).map((d) => ({
  country: d.Country.trim(),
  hdi: {
    2019: +d["2019"],
  },
}))

const excessMortalityString = await readFile(
  "data/excess_mortality.csv",
  "utf8"
)

/* Exclude unused data and cast the used properties to the correct data type. */
const excessMortalityData = d3.csvParse(excessMortalityString).map((d) => ({
  country: d.location,
  date: new Date(d.date),
  pScore: +d.p_scores_all_ages,
}))

/* Group the excess mortality entries by country and calculate the mean of each year. */
const avgExcessMortalityByCountry = d3.rollup(
  excessMortalityData,
  (v) => d3.mean(v, (d) => d.pScore),
  (d) => d.country,
  (d) => d.date.getFullYear()
)

/* Merge the HDI and the excess mortality into one list of entries grouped by countries */
const mergedData = []

for (const [country, data] of avgExcessMortalityByCountry) {
  let countryName
  switch (country) {
    case "Bolivia":
      countryName = "Bolivia (Plurinational State of)"
      break
    case "Hong Kong":
      countryName = "Hong Kong, China (SAR)"
      break
    case "Iran":
      countryName = "Iran (Islamic Republic of)"
      break
    case "Moldova":
      countryName = "Moldova (Republic of)"
      break
    case "Northern Ireland":
    case "England & Wales":
    case "Scotland":
      countryName = "United Kingdom"
      break
    case "Russia":
      countryName = "Russian Federation"
      break
    case "South Korea":
      countryName = "Korea (Republic of)"
      break
    default:
      countryName = country

    /* Those countries are going to be ignored: */
    // Aruba
    // Bermuda
    // Taiwan
    // Transnistria
    // San Marino
    // Puerto Rico
    // Reunion
    // Kosovo
    // Macao
    // Martinique
    // Mayotte
    // Monaco
    // Faeroe Islands
    // French Guiana
    // French Polynesia
    // Gibraltar
    // Greenland
    // Guadeloupe
  }

  const hdi = hdiData.find((h) => h.country === countryName)

  if (hdi) {
    mergedData.push({
      ...hdi,
      // Convert a map into an object
      excessMortality: Array.from(data).reduce(
        (acc, [year, value]) => ({ ...acc, [year]: value }),
        {}
      ),
    })
  }
}

try {
  await writeFile("./data/dataset.json", JSON.stringify(mergedData), "utf8")
  console.log("Done! The generated file is saved at ./data/dataset.json .")
} catch (err) {
  console.error(err)
}
