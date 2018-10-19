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
        yTop,
        yLeft,
        yLabel,
        xTop,
        xLeft,
        xLabel
      } = this.props;
      return (
         <div>
           <Tooltip
            top={yTop}
            left={yLeft}
            style={{
              backgroundColor: 'rgba(92, 119, 235, 0.5)',
              // transform: 'translateX(-25%)'
            }}
           >
            {yLabel}
           </Tooltip>
           <Tooltip
            top={xTop}
            left={xLeft}
            style={{
              color: 'black',
              transform: 'translateX(-50%)'
            }}
           >
            {xLabel}
           </Tooltip>
         </div>
      )
    }
}

module.exports = Tooltips
