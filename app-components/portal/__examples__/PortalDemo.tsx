import React from "react";
import { Portal } from "../Portal";

export class PortalDemo extends React.Component<any, any> {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <div>
        <Portal
          isOpen={this.state.isOpen}
          content={({ close }) => (
            <span>
              gooooooooooooood!! <span onClick={close}>X</span>
            </span>
          )}
          onBeforeClose={() => {
            console.log("before close");
          }}
          closeOnOutsideClick
        >
          {({ toggle }) => <button onClick={toggle}>button</button>}
        </Portal>
        <div
          onClick={() => {
            this.setState({
              isOpen: true,
            });
          }}
        >
          click to open
        </div>
      </div>
    );
  }
}
