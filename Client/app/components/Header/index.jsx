import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Header extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    renderNameOrSignUp(){
      return (
        <div>
          {
            this.props.logged
            ? <a className="p-2 text-dark" href="#">{ this.props.username }</a>
            : <a className="btn btn-outline-primary signup-btn" href="/#/signup">Sign up</a>
          }
        </div>
      )
    }
    render() {
      return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm header-container">
          <a className="my-0 mr-md-auto">
              <img src="https://dd7tel2830j4w.cloudfront.net/f1501425772294x382150709629058800/zeroqode_logo_last.svg" width="50px"/>
          </a>
          <nav className="my-2 my-md-0 mr-md-3">
            <a className="p-2 text-dark" href="#">Features</a>
            <a className="p-2 text-dark" href="#">Pricing</a>
            <a className="p-2 text-dark" href="#">About</a>
          </nav>
          {/* <a className="btn btn-outline-primary signup-btn" href="#">Sign up</a> */}
          { this.renderNameOrSignUp() }
        </div>
      )
    }
}

module.exports = Header
