import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class ProfileHeader extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      return (
        <div className="profile-header-container">
          <div className="row justify-content-center">
            <div className="col-12 img-container">
              <img src="https://dd7tel2830j4w.cloudfront.net/f1501425772294x382150709629058800/zeroqode_logo_last.svg" width="80px"/>
            </div>
            <div className="col-12 username-container">
              <h3> {this.props.username} </h3>
            </div>
            <div className="col-12 email-container">
              <p> {this.props.email} </p>
            </div>
          </div>
        </div>
      )
    }
}

module.exports = ProfileHeader
