interface IEvents {
  click: MouseEvent;
  input: InputEvent;
}
export type TEventName = keyof IEvents;

const eventHandlers = {
  click: new WeakMap<HTMLElement, (e: Event) => void>(),
  input: new WeakMap<HTMLElement, (e: Event) => void>(),
};

export const collectEventHandler = (
  eventName: TEventName,
  element: HTMLElement,
  handler: (e: Event) => void
) => {
  eventHandlers[eventName].set(element, handler);
};

// 도큐먼트에 일괄적으로 각 엘리먼트의 이벤트핸들러 위임
export const setupEventDelegation = () => {
  (
    Object.entries(eventHandlers) as [
      TEventName,
      WeakMap<HTMLElement, (e: Event) => void>
    ][]
  ).forEach(([eventName, handlers]) => {
    document.addEventListener(eventName, (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const handler = handlers.get(target);
      if (handler) handler(e);
    });
  });
};

// TODO: reconciler에서 컴포넌트 제거시 호출할 함수로 사용하기
export const removeEventHandler = (
  eventName: TEventName,
  element: HTMLElement
) => {
  eventHandlers[eventName].delete(element);
};

export const removeAllEventHandlers = (element: HTMLElement) => {
  (Object.keys(eventHandlers) as TEventName[]).forEach((eventName) => {
    eventHandlers[eventName].delete(element);
  });
};
