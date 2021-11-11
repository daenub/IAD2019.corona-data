import { initChart } from "./js/chart"

const ready = (fn) => {
  if (document.readyState !== "loading") {
    fn.call()
  } else {
    document.addEventListener("DOMContentLoaded", fn)
  }
}

ready(() => {
  initChart()
})
