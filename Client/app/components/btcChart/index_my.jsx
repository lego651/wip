import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed, Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max, bisector } from 'd3-array';
import { withTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import axios from 'axios'

import Tooltips from './tooltips'
import Hoverline from './hoverline'
import formatDate from '../../util/formatDate'
import formatPrice from '../../util/formatPrice'


const x = d => new Date(d.date)
const y = d => d.close
// const dataDate = Object.
// const bisectDate = bisector(d => x(d)).left // 返回的是个index, data Array里面的一个Index
const bisectDate = bisector(x).left;

class BTCComponent extends React.Component {
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: []
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
    const requestURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
    axios.get(requestURL)
    .then(response => {
      console.log('good happened')
      // console.log(response.data)
      const data1M = response.data["Time Series (Daily)"]
      const data1M_Array = Object.keys(data1M).map((key) => {
        const dataItem = {}
        // turn String to Date
        // const key_parts = key.split('-')
        // dataItem['date'] = new Date(key_parts[0], key_parts[1] - 1, key_parts[2])
        dataItem['date'] = key.toString() + "T07:00:00.000Z"
        // turn Strin to Integer
        dataItem['close'] = parseFloat(data1M[key]['4. close'])
        // return [key, data1M[key][]]
        return dataItem
      })
      // console.log(JSON.stringify(data1M_Array))
      this.setState({
        data: data1M_Array
      })
    })
    .catch(result => {
      console.log('err happened')
      console.log(result)
    })
  }

  handleTooltip = ({ event, data, x, xScale, yScale}) => {
    const { showTooltip } = this.props
    console.log('move move')
    const coords = localPoint(this.svg, event); // get coordinate for the mouse
    console.log(coords)
    const x0 = xScale.invert(coords.x); // invert the scale to get the domain value
    console.log(x0)
    const index = bisectDate(data, x0) // bisect the data to get insertion position
    // get the closest smaller and larger values in the data array
    console.log(index)
    const d0 = data[index - 1];
    const d1 = data[index];
    // figure out which one is closer to the domain value
    let d = d0
    if(d1 && d1.date){
      d = x0 - x(d0) > x(d1) - x0 ? d1 : d0;
      // console.log(d)
    }

    console.log(d)
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(x(d)),
      tooltipTop: yScale(y(d))
    });
  }

  render() {
    console.log('rendering...')
    this.renders++;
    const {
      data
    } =
    this.state
    const {
      tooltipData,
      tooltipLeft,
      tooltipTop,
      showTooltip,
      hideTooltip,
    } = this.props;
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
    // Data
    // const dataApple = appleStock
    // const data = this.props.data
    // const data = this.state.data
    // const data = appleStock
    // const data = this.data

    // Axis scale
    // const xMax = width - margin.left - margin.right
    // const yMax = height - margin.top - margin.bottom
    const xScale = scaleTime({
      range: [60, width],
      domain: extent(data, x)
      // domain: [x(data[0]), x(data[data.length - 1])]
      // domain: [new Date("2007-04-24T07:00:00.000Z"), new Date("2007-12-31T08:00:00.000Z")]
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [0, max(data, y)],
    });
    console.log("rendering")
    // console.log(dataApple)
    // console.log(data)
    if(!data || data.length == 0){
      return <div> Loading... </div>
    }
    console.log(data)
    return (
      <div className="stock-chart-container">
        <svg ref={s => (this.svg = s)} width={parentWidth} height={parentHeight}>
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

          <Group className="group" top={margin.top} left={margin.left}>
            <AxisBottom
              data={data}
              scale={xScale}
              top={height}
              numTicks={4}
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
              onMouseMove={data => event =>
                this.handleTooltip({
                    event,
                    data,
                    x,
                    xScale,
                    yScale
                })
              }
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
            xLabel={'xLabel'}
            xLabel={formatDate(x(tooltipData))}
          />
        }
      </div>
    )
  }
}

module.exports = withTooltip(BTCComponent);
