import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max, min } from 'd3-array';
import { localPoint } from '@vx/event';
import { withTooltip } from '@vx/tooltip';

import './style.less'

class StockChartComponent extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      // Size and Bounds
      const parentWidth = 600
      const parentHeight = 400
      const margin = {
        top: 30,
        bottom: 30,
        left: 60,
        right: 30,
      };
      const width = parentWidth
      const height = parentHeight
      // Data
      const data = appleStock
      const x = d => new Date(d.date)
      const y = d => d.close
      // Axis scale
      const xMax = width - margin.left - margin.right
      const yMax = height - margin.top - margin.bottom
      const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x)
      });
      const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
      });

      console.log(data)
      return (
        // <div className="stock-chart-container">
        <React.Fragment>
          <svg width={width} height={height}>
            <LinearGradient
              from='#fbc2eb'
              to='#a6c1ee'
              id='gradient'
            />
            <LinearGradient id="bg">
              <stop stopColor="#a943e4" offset="0%" />
              <stop stopColor="#f55989" offset="50%" />
              <stop stopColor="#ffaf84" offset="100%" />
            </LinearGradient>
            <Group top={margin.top} left={margin.left}>
              <AxisBottom
                data={data}
                scale={xScale}
                top={yMax}
                // left={margin.left}
                numTicks={3}
                stroke={'#ccc'}
                strokeWidth={1}
                tickStroke={'#ccc'}
                tickLabelProps={(val, i) => (
                  { dx: '-1em',
                    dy: '0.25em',
                    textAnchor: 'start',
                    fontFamily: 'Arial',
                    fontSize: 10,
                    fill: '#ccc' })}
              />
              <AxisLeft
                scale={yScale}
                // top={margin.top}
                // left={margin.left}
                stroke={'transparent'}
                tickStroke={'#ccc'}
                tickTextFill={'transparent'}
                tickLabelProps={(val, i) => (
                  {
                    dx: '-2.5em',
                    dy: '0.25em',
                    // textAnchor: 'start',
                    fontFamily: 'Arial',
                    fontSize: 10,
                    fill: '#ccc' })}
              />
              <AreaClosed
                data={data}
                left={margin.left}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                fill={"url(#bg)"}
                stroke={""}
              />
            </Group>
          </svg>
        {/* </div> */}
        </React.Fragment>
      )
    }
}

const Test = withTooltip(StockChartComponent)

module.exports = Test
// module.exports = StockChartComponent
