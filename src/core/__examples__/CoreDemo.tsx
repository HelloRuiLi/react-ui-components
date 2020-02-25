import React, { useRef } from "react";
import { useToggle } from "src/core/hooks/useToggle";
import { Portal } from "../../portal";
import { Overlay } from "src/core/components/Overlay";
import { Position } from "src/core/components/Position";
import { Modal, ModalContent, ModalOverlay } from "src/modal";
import { Placement } from "src/core";
import { OverlayTrigger } from "src/core/components/OverlayTrigger";
import { Button } from "src/button";
import { ClickAwayListener } from "src/core/components/ClickAwayListener";

export function CoreDemo() {
  const [isShow, show, hide] = useToggle();
  const triggerRef = useRef(null);

  return (
    <div css={{ padding: "0 10rem" }}>
      <div onClick={show} ref={triggerRef}>
        trigger
      </div>
      {isShow && (
        <Portal>
          <Position triggerRef={triggerRef}>
            <div onClick={hide}>content x</div>
          </Position>
        </Portal>
      )}
      ------------------------------------
      <Overlay
        trigger={({ triggerEl, open }) => {
          return (
            <div ref={triggerEl} onClick={open}>
              this is trigger
            </div>
          );
        }}
        content={({ close }) => {
          return <div onClick={close}>content</div>;
        }}
      />
    </div>
  );
}

const Content = ({ hide }: { hide: () => void }) => {
  const [isOpen, open, close] = useToggle();

  return (
    <div>
      <ClickAwayListener onClickAway={hide}>
        <div>
          <div onClick={open}>content</div>
          <div>content1</div>
          <div>content2</div>
          <div onClick={hide}>close me</div>
        </div>
      </ClickAwayListener>
      <Modal visible={isOpen}>
        <ModalOverlay onClick={close} />
        <ModalContent>
          <p>This is a simple modal</p>
        </ModalContent>
      </Modal>
    </div>
  );
};

export function CoreDemo2() {
  const [visible, show, hide] = useToggle();
  return (
    <OverlayTrigger content={<Content hide={hide} />} placement={Placement.bottomLeft} visible={visible}>
      <Button onClick={show}>this is trigger</Button>
    </OverlayTrigger>
  );
}
