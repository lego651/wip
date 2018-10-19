import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed, Bar, LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max, bisector, min } from 'd3-array';
import { withTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { genDateValue } from '@vx/mock-data';

import Tooltips from './tooltips'
import Hoverline from './hoverline'
import formatDate from '../../util/formatDate'
import formatPrice from '../../util/formatPrice'
import formatDateMin from '../../util/formatDateMin'

import './style.less'

class StockComponent extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
      this.renders = 0
    }
    render() {
      const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        showTooltip,
        hideTooltip,
        data
      } = this.props;

      console.log(data)
      console.log(data[0])
      console.log(data[data.length - 1])
      // Size and Bounds
      const parentWidth = 600
      const parentHeight = 400
      const margin = {
        top: 30,
        bottom: 30,
        left: 0,
        right: 0,
      };
      const width = parentWidth - margin.left - margin.right
      const height = parentHeight - margin.top - margin.bottom

      // Static Data
      const data_close = data.map(item => item.close )
      const data_date = data.map(item => item.date)
      //
      const minY = Math.min.apply(null, data_close)
      const maxY = Math.max.apply(null, data_close)
      const yScaleBottom = minY - (maxY - minY) * 0.2
      const yScaleTop = maxY + (maxY - minY) * 0.2

      // Functions
      const x = d => new Date(d.date)
      // const x = d => d.date
      const y = d => d.close
      const bisectDate = bisector(d => x(d)).left;

      // Axis scale
      const xScale = scaleTime({
        range: [60, width],
        domain: extent(data, x)
        // domain: [new Date("2018-08-06T09:30:00.000Z"), new Date("2018-08-06T12:00:00.000Z")]
        // domain: [data[0], data[data.length - 1]]
      });
      const yScale = scaleLinear({
        range: [height, 0],
        // domain: [0, max(data, y)]
        domain: [yScaleBottom, yScaleTop]
      });

      // Return
      if(!data || data.length == 0){
        return <div> Loading... </div>
      }
      return (
        <div className="stock-chart-container">
          <svg ref={s => (this.svg = s)} width={parentWidth} height={parentHeight}>
            <LinearGradient id="bg">
              <stop stopColor="#55b180" offset="0%" />
              <stop stopColor="#c2e3d2" offset="5%" />
              <stop stopColor="#fff" offset="100%" />
            </LinearGradient>

            <Group className="group" top={margin.top} left={margin.left}>
              <AxisBottom
                data={data}
                scale={xScale}
                top={height}
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
                left={60}
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
              <LinePath
                data={data}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                stroke="#11924e"
                strokeOpacity="0.8"
                strokeWidth={3}
              />
              <AreaClosed
                data={data}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                fill={"url(#bg)"}
                stroke={""}
              />
              <Bar
                data={data}
                width={width}
                height={height}
                fill={"rgba(0,0,0,0.1)"}
                onMouseLeave={data => event => hideTooltip()}
                onMouseMove={data => event => {
                  console.log('move move')
                  const coords = localPoint(this.svg, event); // get coordinate for the mouse
                  const domainX = xScale.invert(coords.x); // invert the scale to get the domain value
                  const pos = bisectDate(data, domainX) // bisect the data to get insertion position
                  const d0 = data[pos - 1];
                  const d1 = data[pos];
                  // figure out which one is closer to the domain value
                  const d = domainX - xScale(x(d0)) > xScale(x(d1)) - domainX ? d1 : d0;
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: xScale(x(d)),
                    tooltipTop: yScale(y(d))
                  });
                }}
              />
            </Group>
            {tooltipData &&
              <Hoverline
                from={{
                  x: tooltipLeft,
                  y: 0
                }}
                to={{
                  x: tooltipLeft,
                  y: 400
                }}
                tooltipLeft={tooltipLeft}
                tooltipTop={tooltipTop + 30}
              />
            }
          </svg>
          {tooltipData &&
            <Tooltips
              yTop={tooltipTop + 30}
              yLeft={tooltipLeft}
              yLabel={formatPrice(y(tooltipData))}
              xLeft={tooltipLeft}
              xTop={height + 30}
              xLabel={formatDateMin(x(tooltipData))}
            />
          }
        </div>
      )
    }
}

export default withTooltip(StockComponent);
// module.exports = withTooltip(StockComponent);
