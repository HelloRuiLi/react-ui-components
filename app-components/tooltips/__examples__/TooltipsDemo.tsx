import { css } from 'glamor';
import * as React from 'react';
import { Placement } from '../../core/OverlayTrigger';
import { Tooltips } from '../Tooltips';

export class TooltipsDemo extends React.Component<any, any> {
  render() {
    return (
      <Tooltips
        width='330px'
        content='Purchase or reload your card, get ¥10 extra!'
        placement={Placement.leftBottom}
      >
        <span {...css({ marginLeft: '23rem' })}>
          Trigger Element here
        </span>
      </Tooltips>
    );
  }
}