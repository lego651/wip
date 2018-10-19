import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import axios from 'axios'

import { bisector } from 'd3-array';

import * as authActions from '../../actions/authentication'
// import Test from '../../components/StockChart1M/test.jsx'
// import StockChartWithTooltip from '../../components/StockChart1M'
// import Header from '../../components/Header'
import Header from '../HeaderContainer'
// import StockComponent from '../../components/StockChart1Year'
// import BTCComponent from '../../components/btcChart'
import StockComponent from '../../components/StockChart5D'

class StockChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data1M:[]
        }
    }
    componentDidMount(){
      // const requestURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
      const requestURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&outputsize=full&apikey=demo"
      axios.get(requestURL)
      .then(response => {
        console.log('good happened')
        // console.log(response.data)
        const data1M = response.data["Time Series (5min)"]
        // const data1M = response.data["Time Series (Daily)"]
        const data1M_Array = Object.keys(data1M).map((key) => {
          const dataItem = {}
          // turn String to Date
          // const key_parts = key.split('-')
          // dataItem['date'] = new Date(key_parts[0], key_parts[1] - 1, key_parts[2])
          // dataItem['date'] = key.toString() + "T07:00:00.000Z"
          const key_parts = key.split(' ')
          const key_string = '' + key_parts[0] + 'T' + key_parts[1] + '.000Z'
          dataItem['date'] = key_string
          // turn Strin to Integer
          dataItem['close'] = parseFloat(data1M[key]['4. close'])
          // return [key, data1M[key][]]
          return dataItem
        })
        // console.log(JSON.stringify(data1M_Array))
        this.setState({
          data1M: data1M_Array
        })
      })
      .catch(result => {
        console.log('err happened')
        console.log(result)
      })
    }
    render() {
        return (
            <div>
              <Header />
              {/* <Test /> */}
              {/* <StockChartWithTooltip /> */}
              <StockComponent data={this.state.data1M.reverse().slice(0, 331)} />
              {/* <BTCComponent /> */}
            </div>
        )
    }
}

// -------------------redux react binding--------------------
function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}
function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockChart)
