import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed, LinePath, Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { localPoint } from '@vx/event';
import { withTooltip } from '@vx/tooltip';
import { LinearGradient } from '@vx/gradient';
import { extent, max, min, bisector } from 'd3-array';

import Tooltips from './tooltips.jsx'

import './style.less'

class StockChartComponent extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    // handleMouseOver(event, datum){
    //   const coords = localPoint(event.target.ownerSVGElement, event)
    //   this.props.showTooltip({
    //     tooltipLeft: coords.x,
    //     tooltipTop: coords.y,
    //     tootipData: datum
    //   })
    // }
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
      const dataArr = Object.keys(data).map(k => ({
        date: data[k].date,
        close: data[k].close
      }))
      const dataArr1M = dataArr.slice(-30)

      const x = d => new Date(d.date)
      const y = d => d.close
      const bisectDate = bisector(d => x(d)).left;
      // Axis scale
      const xMax = width - margin.left - margin.right
      const yMax = height - margin.top - margin.bottom
      // ***
      // General setting for Scale
      // ***
      // const xScale = scaleTime({
      //   range: [0, xMax],
      //   domain: extent(data, x)
      // });
      // const yScale = scaleLinear({
      //   range: [yMax, 0],
      //   domain: [0, max(data, y)],
      // });

      // Scale setting for 1M data only
      const maxPrice = max(dataArr1M, y)
      const minPrice = min(dataArr1M, y)
      const minPriceLine = minPrice - (maxPrice - minPrice) * 0.1
      const xScale = scaleTime({
        range: [0, xMax],
        // domain: [x(dataArr1M[0]), x(dataArr1M[dataArr1M.length - 1])]
        domain: extent(dataArr1M, x)
      });
      const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [minPriceLine, maxPrice],
      });

      // Handle tooltip
      const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        hideTooltip,
        showTooltip
      } = this.props

      // console.log(dataArr1M)
      return (
        <div className="stock-chart-container">
          <svg width={width} height={height}>
            <LinearGradient
              from='#fbc2eb'
              to='#a6c1ee'
              id='gradient'
            />
            <LinearGradient id="bg">
              <stop stopColor="#55b180" offset="0%" />
              <stop stopColor="#c2e3d2" offset="5%" />
              <stop stopColor="#fff" offset="100%" />
            </LinearGradient>
            <Group top={margin.top} left={margin.left}>
              <AxisBottom
                data={dataArr1M}
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
              <LinePath
                data={dataArr1M}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                stroke="#11924e"
                strokeOpacity="0.8"
                strokeWidth={3}
              />
              <AreaClosed
                data={dataArr1M}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                fill={"url(#bg)"}
                stroke={""}
                // onMouseLeave={data => event => hideTooltip()}
                // onMouseMove={data => event => {
                //   const { x } = localPoint(event);
                //   const x0 = xScale.invert(x);
                //   const index = bisectDate(data, x0, 1);
                //   const d0 = data[index - 1];
                //   const d1 = data[index];
                //   const d = x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0;
                //   showTooltip({
                //     tooltipData: d,
                //      tooltipLeft: xScale(x(d)),
                //     tooltipTop: yScale(y(d))
                //   });
                // }}
              />
              <Bar
                data={dataArr1M}
                x={0}
                y={0}
                width={width-margin.left - margin.right}
                height={height - margin.top - margin.bottom}
                fill="rgba(0,0,0,0.2)"
                onClick={data => event => {
                    alert(`clicked: ${JSON.stringify(data)}`)
                }}
                onMouseLeave={data => event => {
                    console.log('out called')
                    hideTooltip()
                  }
                }
                onMouseMove={dataArr1M => event => {
                  console.log('move called')
                  console.log(dataArr1M)
                  const xSelector = d => new Date(d.date)
                  const ySelector = d => d.close
                  const { x } = localPoint(event);
                  const x0 = xScale.invert(x);
                  const index = bisectDate(dataArr1M, x0, 1);
                  const d0 = dataArr1M[index - 1];
                  const d1 = dataArr1M[index];
                  const d = x0 - xScale(xSelector(d0)) > xScale(xSelector(d1)) - x0 ? d1 : d0;
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: xScale(xSelector(d)),
                    tooltipTop: yScale(ySelector(d))
                  });
                }}
              />
            </Group>
          </svg>
          {
            tooltipOpen &&
            <Tooltips
              upTop={tooltipTop - 12}
              upLeft={tooltipLeft + 12}
              upLabel={y(tooltipData)}
              btmTop={300}
              btmLeft={tooltipLeft}
              btmLabel={x(tooltipData)}
            />
          }
        </div>
      )
    }
}

const StockChartWithTooltip = withTooltip(StockChartComponent)

module.exports = StockChartWithTooltip

// export default withTooltip()
