import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class HomeSec1 extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      return (
        <div>
          <h2> HomeSec 1</h2>
        </div>
      )
    }
}

module.exports = HomeSec1
