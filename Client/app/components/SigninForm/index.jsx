import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import './style.less'

class SigninForm extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
    render() {
      return (
        <div className="signin-page-container">
          { this.props.signinError && this.renderAlert(this.props.signinError) }
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4 signin-form-container">
              <img src="https://dd7tel2830j4w.cloudfront.net/f1501425772294x382150709629058800/zeroqode_logo_last.svg" />
              <p> Sign in to the Zeroqode </p>
              <form className="col-12 col-sm-8">
                <div className="form-group">
                  <input ref="email" type="text" className="form-control" placeholder="Email Address" />
                  {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                  <input ref="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button className="btn btn-primary submitBtn"
                        type="submit"
                        onClick={this.SubmitHandle.bind(this)}>
                  SIGN IN
                </button>
                <p className="toSignup"> Don't have an account? <a>Sign up</a></p>
              </form>
            </div>
          </div>
        </div>
      )
    }
    SubmitHandle(){
      const user = {
        email: findDOMNode(this.refs.email).value,
        password: findDOMNode(this.refs.password).value,
      }
      // console.log(user)
      const signinHandle = this.props.signinHandle
      signinHandle(user)
    }
}

module.exports = SigninForm
