import { IVDOMNode, TVDOMProps } from "@/types/vdom";

interface IRoot {
  vDOM: IVDOMNode<TVDOMProps> | null;
  createVDOM: (() => IVDOMNode<TVDOMProps>) | null;
  element: HTMLElement | null;
}

const rootManager = () => {
  const root: IRoot = {
    vDOM: null,
    createVDOM: null,
    element: null,
  };

  return {
    getVDOM: () => root.vDOM,
    setVDOM: (newVDOM: IVDOMNode<TVDOMProps>) => {
      root.vDOM = newVDOM;
    },

    getCreateVDOM: () => root.createVDOM as () => IVDOMNode<TVDOMProps>,
    setCreateVDOM: (createVDOM: () => IVDOMNode<TVDOMProps>) => {
      root.createVDOM = createVDOM;
    },

    getElement: () => root.element as HTMLElement,
    setElement: (element: HTMLElement) => {
      root.element = element;
    },
  };
};

export const root = rootManager();

export const createRoot = (
  createVDOM: () => IVDOMNode<TVDOMProps>,
  container: HTMLElement
) => {
  root.setCreateVDOM(createVDOM);
  root.setElement(container);
};
