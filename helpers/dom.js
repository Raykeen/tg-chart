import includes from "lodash/includes";

const camelToDash = str =>
  str
    .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
    .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);

export const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

const SVG_ELEMENTS = ["svg", "polyline"];

export const createElement = (tag, attributes, children) => {
  let element;
  if (includes(SVG_ELEMENTS, tag)) {
    element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  } else {
    element = document.createElement(tag);
  }

  setAttributes(element, attributes);

  if (!children) return element;

  if (Array.isArray(children)) {
    for (let child of children) {
      element.appendChild(child);
    }
  } else {
    element.appendChild(children);
  }

  return element;
};
