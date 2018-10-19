import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

// import { Tooltip } from '@vx/tooltip'
import { Line } from '@vx/shape'

import './style.less'

class Hoverline extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const {
        from,
        to,
        tooltipLeft,
        tooltipTop
      } = this.props;
      return (
        <g>
          <Line
            from={from}
            to={to}
            stroke="white"
            strokeWidth={1}
            style={{ pointerEvents: 'none' }}
            strokeDasharray="2,2"
          />
          <circle
            cx={tooltipLeft}
            cy={tooltipTop}
            r={4}
            fill="#00f1a1"
            fillOpacity={0.8}
            style={{ pointerEvents: 'none' }}
          />
        </g>
      )
    }
}

module.exports = Hoverline
