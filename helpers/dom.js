import includes from "lodash/includes";

const SVG_ELEMENTS = ["svg", "polyline"];
const CAMEL_CASE_ATTRIBUTES = ["viewBox"];

const camelToDash = str =>
  str
    .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
    .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);

export const setAttributes = (element, attrs = {}) => {
  const { domElement: el, attributes: oldAttrs } = element;
  element.attributes = attrs;

  Object.keys({ ...oldAttrs, ...attrs }).forEach(key => {
    const newValue = attrs[key];
    const oldValue = oldAttrs[key];

    if (newValue === oldValue) {
      return;
    }

    const qualifiedName = includes(key, CAMEL_CASE_ATTRIBUTES)
      ? key
      : camelToDash(key);

    el.setAttribute(qualifiedName, newValue);
  });
};

const shallowEqual = (a, b) =>
  Object.keys({ ...a, ...b }).every(name => a[name] === b[name]);

const isEqualElements = (a, b) =>
  shallowEqual(a.attributes, b.attributes) &&
  shallowEqual(a.children, b.children);

const virtualDOM = new Map();

export const appendChild = (element, child) => {
  element.domElement.appendChild(child.domElement);
};

export const createElement = (tag, attributes, children) => (
  parent = null,
  index = 0
) => {
  let element =
    virtualDOM.get(parent) ||
    (parent.domElement && parent.children && parent.children[index]);

  if (!element) {
    if (includes(SVG_ELEMENTS, tag)) {
      element = {
        domElement: document.createElementNS("http://www.w3.org/2000/svg", tag),
        attributes: {},
        children: []
      };
    } else {
      element = {
        domElement: document.createElement(tag),
        attributes: {},
        children: []
      };
    }
  }

  setAttributes(element, attributes);

  const _children = Array.isArray(children)
    ? children
    : children
    ? [children]
    : [];

  const newChildren = _children.map((childFunc, index) =>
    childFunc(element, index)
  );

  if (element.children && shallowEqual(element.children, newChildren))
    return element;

  element.domElement.innerHTML = "";

  newChildren.forEach(child => {
    appendChild(element, child);
  });
  element.children = newChildren;

  return element;
};

export const render = (element, container) => {
  virtualDOM.set(container, element(container));

  if (container.childNodes.length === 0) {
    container.appendChild(virtualDOM.get(container).domElement);
  }
};
