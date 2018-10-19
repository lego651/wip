import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import './style.less'

class SignupForm extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    renderAlert(message){
      return (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4 alert alert-warning alert-dismissible fade show" role="alert">
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
        <div className="signup-page-container">
          { this.props.signupError && this.renderAlert(this.props.signupError) }
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4 signup-form-container">
              <img src="https://dd7tel2830j4w.cloudfront.net/f1501425772294x382150709629058800/zeroqode_logo_last.svg" />
              <p> Start your journey for free </p>
              <form className="col-12 col-sm-8">
                <div className="form-group">
                  <input ref="email" type="text" className="form-control" placeholder="Email Address" />
                  {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                  <input ref="username" type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input ref="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button className="btn btn-primary submitBtn"
                        type="submit"
                        onClick={this.SubmitHandle.bind(this)}>
                  SIGN UP
                </button>
                <p className="toSignin"> Already have an account? <a>Sign in</a></p>
              </form>
            </div>
          </div>
        </div>
      )
    }
    SubmitHandle(){
      const user = {
        email: findDOMNode(this.refs.email).value,
        name: findDOMNode(this.refs.username).value,
        password: findDOMNode(this.refs.password).value,
      }
      // console.log(user)
      const signupHandle = this.props.signupHandle
      signupHandle(user)
    }
}

module.exports = SignupForm
