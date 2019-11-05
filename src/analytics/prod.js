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

export function event(category = "", action = "") {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function ecommerceEvent(category = "", action = "") {
  if (category && action) {
    ReactGA.plugin.execute("ec", "setAction", category, action);
    ReactGA.plugin.execute("ec", "send");
  }
}

export function ecommerceAddProduct(product, send = false) {
  if (product) {
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
