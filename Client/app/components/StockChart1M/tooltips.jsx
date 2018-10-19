import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import { Tooltip } from '@vx/tooltip'

import './style.less'

class Tooltips extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const {
        upTop,
        upLeft,
        upLabel,
        btmTop,
        btmLeft,
        btmLabel
      } = this.props;
      return (
         <div>
           <Tooltip
            top={upTop}
            left={upLeft}
            style={{
              transform: 'translateX(-50%)'
            }}
           >
            {upLabel}
           </Tooltip>
           <Tooltip
            top={btmTop}
            left={btmLeft}
            style={{
              backgroundColor: 'rgba(92, 119, 235, 1.000)',
              color: 'white'
            }}
           >
            {btmLabel}
           </Tooltip>
         </div>
      )
    }
}

module.exports = Tooltips
