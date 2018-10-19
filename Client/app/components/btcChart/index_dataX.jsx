import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed, Bar, LinePath, Line  } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max, bisector } from 'd3-array';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import axios from 'axios'

import Tooltips from './tooltips'
import Hoverline from './hoverline'
// import formatDate from '../../util/formatDate'
import formatPrice from '../../util/formatPrice'
import { timeFormat } from "d3-time-format";


const width = 600;
const height = 400;
const formatDate = timeFormat("%b %d, '%y");
const xSelector = d => new Date(d.date);
const ySelector = d => d.close;

// const bisectDate = bisector(d => xSelector(d)).left;

class BTCComponent extends React.Component {
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: null,
      dataX: null
    }
    this.renders = 0
  }
  componentDidMount(){
    console.log('didMount called')
  }
  componentWillUpdate(){
    console.log('willUpdate called')

  }
  componentDidUpdate(){
    console.log('didUpdate called')
  }
  componentDidMount(){
    const requestURL =  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
    axios.get(requestURL)
    .then(response => {
      console.log('good happened')
      const test1 = response.data
      // const result = response.data.json()
      console.log(test1)
      // console.log(result)
      // console.log(JSON.stringify(data1M_Array))
      const curArr = Object.keys(test1["Time Series (Daily)"]).map(date => {
        return {
          date: new Date(date),
          close: Number( test1["Time Series (Daily)"][date]['4. close'] )
        }
      })
      const arrX = Object.keys(test1["Time Series (Daily)"]).map(date =>
        new Date(date)
      )
      const newArr = curArr.slice(0, 31)
      this.setState({
        data: newArr,
        dataX: arrX.slice(0, 31)
      })
    })
    .catch(result => {
      console.log('err happened')
      console.log(result)
    })
  }
  // componentDidMount(){
  //   const requestURL =  "https://api.coindesk.com/v1/bpi/historical/close.json"
  //   axios.get(requestURL)
  //   .then(response => {
  //     console.log('good happened')
  //     const test1 = response.data
  //     // const result = response.data.json()
  //     console.log(test1)
  //     // console.log(result)
  //     // console.log(JSON.stringify(data1M_Array))
  //     const curArr = Object.keys(test1.bpi).map(date => {
  //       return {
  //         date: new Date(date),
  //         close: test1.bpi[date]
  //       }
  //     })
  //     this.setState({
  //       data: curArr
  //     })
  //   })
  //   .catch(result => {
  //     console.log('err happened')
  //     console.log(result)
  //   })
  // }

  handleTooltip = ({ event, data, dataX, xSelector, xScale, yScale }) => {
    const { showTooltip } = this.props;
    console.log(dataX)
    const coords = localPoint(event);
    console.log(coords) // PASS 这个数据很准确
    const x0 = xScale.invert(coords.x); // 找到 xScale对应的 x当前pos的位置, x0打印出来是一个Date() Obj
    console.log(x0) // PASS 这个数据很准确
    // const index = bisectDate(data, x0);
    const index = bisector(dataX, x0).left
    console.log(index) // ERROR
    const d0 = data[index - 1]; // 这个数据很错
    const d1 = data[index];
    console.log(d0)
    console.log(d1)
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xSelector(d0) > xSelector(d1) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xSelector(d)),
      tooltipTop: yScale(ySelector(d))
    });
  };

  render() {
    const { data, dataX } = this.state;
    const {
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      // data
    } = this.props;

    if (!data) return null;

    const padding = 100;
    const xMax = width - padding;
    const yMax = height - padding;

    const xScale = scaleTime({
      range: [0, 600],
      domain: extent(data, xSelector)
    });

    const dataMax = max(data, ySelector);
    const yScale = scaleLinear({
      range: [yMax, padding],
      domain: [0, dataMax + dataMax / 3]
    });
    console.log(data)
    return (
      <div className="stock-chart-container">
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#32deaa" />
        <LinePath
           data={data}
           xScale={xScale}
           yScale={yScale}
           x={xSelector}
           y={ySelector}
           strokeWidth={5}
           stroke="#FFF"
           strokeLinecap="round"
           fill="transparent"
         />
         <AxisBottom
           data={data}
           scale={xScale}
           top={height - 50}
           numTicks={4}
           stroke={'#fff'}
           strokeWidth={1}
           tickStroke={'#ccc'}
           tickLabelProps={(val, i) => (
             { dx: '-1em',
               dy: '0.25em',
               textAnchor: 'start',
               fontFamily: 'Arial',
               fontSize: 10,
               fill: '#fff' })}
         />
         <Bar
           x={0}
           y={0}
           width={width}
           height={height}
           fill={"rgba(0,0,0,0.4)"}
           data={data}
           onMouseMove={data => event =>
             this.handleTooltip({
               event,
               data,
               dataX,
               xSelector,
               xScale,
               yScale
             })}
           onMouseLeave={data => event => hideTooltip()}
         />
         {tooltipData && (
           <g>
             <Line
               from={{ x: tooltipLeft, y: 0 }}
               to={{ x: tooltipLeft, y: yMax }}
               stroke="#5C77EB"
               strokeWidth={4}
               style={{ pointerEvents: "none" }}
               strokeDasharray="4,6"
             />
             <circle
               cx={tooltipLeft}
               cy={tooltipTop}
               r={4}
               fill="#5C77EB"
               stroke="white"
               strokeWidth={2}
               style={{ pointerEvents: "none" }}
             />
           </g>
         )}
       </svg>
       {tooltipData && (
         <div>
           <Tooltip
             top={tooltipTop - 12}
             left={tooltipLeft + 12}
             style={{
               backgroundColor: "#5C77EB",
               color: "#FFF"
             }}
           >
             {`$${ySelector(tooltipData)}`}
           </Tooltip>
           <Tooltip
             top={yMax - 30}
             left={tooltipLeft}
             style={{
               transform: "translateX(-50%)"
             }}
           >
             {formatDate(xSelector(tooltipData))}
           </Tooltip>
         </div>
       )}
      </div>
    )
  }
}

module.exports = withTooltip(BTCComponent);
