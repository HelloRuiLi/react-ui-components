import * as React from "react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import invariant from "invariant";
import { Portal } from "../portal";
import { Placement, useOutSideClick, usePosition, useRefValue, useToggle } from "../core";
import { isEqual } from "lodash";

interface IPopoverProps {
  children: ReactElement<any>; // 不能是 undefined、boolean、null 或者 text，只能是一个 react element（不一定有 DOM，所以要用 invariant 来控制），但是可以把 ref 绑上去
  content?: ReactNode;
  placement?: Placement;
  closeOnClickOutSide?: boolean;
  visible?: boolean;
}

export const Popover: React.FC<IPopoverProps> = ({
  content,
  children,
  placement,
  closeOnClickOutSide = true,
  visible = false,
}) => {
  const [isOpen, show, hide, setIsOpen] = useToggle();
  const isOpenRef = useRefValue(isOpen);

  const triggerEl = useRef<HTMLElement>(null);
  const contentEl = useRef<HTMLDivElement>(null);
  const position = usePosition(triggerEl, contentEl, placement, [isOpen]);

  // click out side 绑定到每一个 Popover，因为每一个 Popover 判断 outside 的对象不同。who's outside?
  // 只有当 isOpen = true 时，才绑定监听事件，否则什么也不做
  useOutSideClick([triggerEl, contentEl], hide, closeOnClickOutSide && isOpen);

  // 用 cloneElement(children) 有个问题，就是传进来的值必须是 HTMLElement，否则在 getBondingClientRect 时就会出错
  useEffect(() => {
    invariant(
      triggerEl.current instanceof HTMLElement,
      "The children must be able to receive ref prop of HTMLElement.",
    );
  }, []);

  useEffect(
    () => {
      if (!isEqual(visible, isOpenRef.current)) {
        setIsOpen(visible);
      }
    },
    [visible],
  );

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerEl,
        onClick: show,
      })}
      {isOpen && (
        <Portal>
          <div
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              willChange: "transform",
            }}
            ref={contentEl}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
