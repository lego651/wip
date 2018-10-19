import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import Item from './Item'
import AddNewItem from './AddNewItem'

import './style.less'

class ProfileWatchlistForm extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
      this.state = {
        // watchList: [
        //   {
        //     id: 'fb',
        //     text: 'FB'
        //   },
        //   {
        //     id: 'amz',
        //     text: 'AMZ'
        //   }
        // ]
        watchList: []
      }
    }

    renderAlert(message){
      return (
        <div className="row alert-container">
          <div className="col-xl-12 justify-content-center alert alert-warning alert-dismissible fade show " role="alert">
            { message }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      )
    }
    renderEmptyList(){
      return (
        <div className="empty-list">
          Your watch list is empty.
        </div>
      )
    }
    componentDidMount(){
      this.setState({
        watchList: this.props.watchList
      })
    }
    componentDidUpdate(){
      this.setState({
        watchList: this.props.watchList
      })
    }
    render() {
      return (
        <div className="profile-watchlist-container">
          {/* { this.props.signinError && this.renderAlert(this.props.signinError) } */}
          <div className="row justify-content-center">
            <div className="col-1">
            </div>
            <div className="layout-container col-10">
              <div className="input-container form-group col-12">
                <AddNewItem addListHandle={this._addListHandle.bind(this)} />
              </div>

              <div className="list-container col-12">
                <ul className="list-group ">
                  {
                    this.state.watchList.length > 0
                    ? this.state.watchList.map((item, index) => {
                      return <Item key={index}
                                   data={item}
                                   removeItemHandle={this._removeItemHandle.bind(this)} />
                    })
                    : this.renderEmptyList()
                  }
                </ul>
                {
                  this.state.watchList.length > 0
                  ? <button className="btn btn-primary submitBtn"
                          type="submit"
                          // onClick={this.SubmitHandle.bind(this)}
                  >
                    Update
                  </button>
                  : <div> </div>
                }

              </div>

            </div>
            <div className="col-1">
            </div>
          </div>
        </div>
      )
    }
    // PostWatchList(newItem){
    //   this.props.postWatchList(newItem)
    // }
    _addListHandle(item){
      console.log('data in _addListHandle is:' + item)
      // this.setState({
      //   watchList: [...this.state.watchList, item]
      // })
      this.props.postWatchList(item)
    }
    _removeItemHandle(id){
      // filter all todos execpt the one to be removed
      // const remainder = this.state.watchList.filter((item) => {
      //   if(item.id !== id) return item
      // })
      //
      // this.setState({
      //   watchList: remainder
      // })
      this.props.deleteWatchList(id)
    }
}

module.exports = ProfileWatchlistForm
