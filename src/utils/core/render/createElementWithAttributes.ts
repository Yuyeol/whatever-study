import { IVDOMNode, TIntrinsicType, TVDOMProps } from "@/types/vdom";
import { collectEventHandler, TEventName } from "@/utils/core/eventSystem";

const createElementWithAttributes = (normalizedNode: IVDOMNode<TVDOMProps>) => {
  // create element
  const element = document.createElement(normalizedNode.type as TIntrinsicType);
  // set attributes
  Object.entries(normalizedNode.props || {}).forEach(([key, value]) => {
    if (key === "children") return;
    // event attributes: on[EventName]
    if (key.startsWith("on") && typeof value === "function") {
      let eventName = key.toLowerCase().slice(2);
      if (eventName === "change") eventName = "input";
      collectEventHandler(eventName as TEventName, element, value);
      return;
    }
    // input attributes: checked, value
    if (key === "checked" && element instanceof HTMLInputElement) {
      element.checked = value as boolean;
      return;
    }
    if (key === "value" && element instanceof HTMLInputElement) {
      element.value = value as string;
      return;
    }
    // style attributes
    if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
      return;
    }

    element.setAttribute(key, value as string);
  });
  return element;
};

export default createElementWithAttributes;
