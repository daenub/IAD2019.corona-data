import { Chart } from "./js/chart"
import { render } from "preact"

const ready = (fn) => {
  if (document.readyState !== "loading") {
    fn.call()
  } else {
    document.addEventListener("DOMContentLoaded", fn)
  }
}

ready(() => {
  // initChart()

  const el = document.querySelector("#root")
  render(<Chart />, el)
})
