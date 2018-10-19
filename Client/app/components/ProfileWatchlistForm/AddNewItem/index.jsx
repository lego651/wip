import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import './style.less'

class AddNewItem extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
      this.state = {
        value: ''
      }
    }
    render() {
      return (
        <div className="row input-group">
          <input type="text"
                 className="form-control col-10"
                 placeholder="Add New"
                 onChange={this.changeHandle.bind(this)}
                 value={this.state.value} />
          <button className="btn btn-primary addBtn col-2"
                  type="submit"
                  onClick={this.SubmitHandle.bind(this)}>
            Add
          </button>
        </div>
      )
    }
    changeHandle(e){
      this.setState({
        value: e.target.value
      })
    }
    SubmitHandle(){
      if(this.state.value.length > 0){
        console.log('Add button is clicked' + this.state.value)
        const input = this.state.value
        const newItem = {
          id: input.toLowerCase(),
          text: input.toUpperCase()
        }
        this.props.addListHandle(newItem)
        this.setState({
          value: ''
        })
      }
    }
}

module.exports = AddNewItem
