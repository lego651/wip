import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findDOMNode } from 'react-dom'

import './style.less'

class ProfilePasswordForm extends React.Component {
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
        <div className="account-password-container">
          {/* { this.props.signinError && this.renderAlert(this.props.signinError) } */}
          <div className="row justify-content-center">
            <div className="form-container">
              <div className="col-2 col-md-4">
              </div>
              <div className="col-8 col-md-4">
                <form>
                  <div className="form-group">
                    <label> Old Password </label>
                    <input ref="password-old" type="password" className="form-control" />
                    {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <label> New Password </label>
                    <input ref="password-new" type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label> Confirm Password </label>
                    <input ref="password-confirm" type="password" className="form-control" />
                  </div>
                  <button className="btn btn-primary submitBtn"
                          type="submit"
                          // onClick={this.SubmitHandle.bind(this)}
                  >
                    SAVE
                  </button>
                </form>
              </div>
              <div className="col-2 col-md-4">
              </div>
            </div>
          </div>
        </div>
      )
    }
}

module.exports = ProfilePasswordForm
