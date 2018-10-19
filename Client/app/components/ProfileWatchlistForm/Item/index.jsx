import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import './style.less'

class Item extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const data = this.props.data
      return (
         <li className="list-group-item">
          {data.text}
          <span className="float-right"
                onClick={this.RemoveHandle.bind(this, data.id)}> delete </span>
        </li>
      )
    }
    RemoveHandle(id){
      this.props.removeItemHandle(id)
    }
}

module.exports = Item
