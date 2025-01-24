import { render } from "@/utils/core/render";
import { root } from "@/utils/core/root";
import { global } from "@/utils/core/hooks/global";

export const rerender = () => {
  // 루트생성 없이 jsx 사용 시 에러처리
  if (!root.getElement() || !root.getComponent())
    throw new Error("Root element or component not initialized");
  // 원래는 변경된 루트와의 비교 반영이 정석이지만 여기서는 가볍게 초기화하는 것으로 구현
  root.getElement().innerHTML = "";
  // hooks의 인덱스는 리렌더링 시 초기화 되지만, global의 index는 초기화 되지 않음
  // 따라서 hooks의 인덱스 재부여를 위해 리렌더링 시 인덱스만 초기화
  global.resetIndex();
  render(root.getComponent()(), root.getElement());
};
