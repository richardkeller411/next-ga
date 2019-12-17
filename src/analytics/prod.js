import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export function init(code) {
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
    ReactGA.plugin.require("ec");
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function event(category = "", action = "", label = "") {
  if (category && action) {
    console.log("Event Sent", category, action, label);
    ReactGA.event({ category, action, label });
  }
}

export function ecommerceEvent(category = "", action = "", label = "") {
  if (category && action) {
    console.log("EcomEvent", category, action, label);
    ReactGA.plugin.execute("ec", "setAction", category, action, label);
    ReactGA.plugin.execute("ec", "send");
  }
}

export function ecommerceAddProduct(product, send = false) {
  if (product) {
    console.log("Ecomm Add Product", product);
    ReactGA.plugin.execute("ec", "addProduct", product);
    if (send == true) {
      ReactGA.plugin.execute("ec", "send");
    }
  }
}

export function ecommerceClear() {
  ReactGA.plugin.execute("ec", "clear");
}

export function exception(description = "", fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
