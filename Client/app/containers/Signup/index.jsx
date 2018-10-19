import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as authActions from '../../actions/authentication'
import SignupForm from '../../components/SignupForm'
import Header from '../../components/Header'


class Signup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
              <Header />
              <SignupForm
                    signupHandle={this.signupHandle.bind(this)}
                    signupError = {this.props.error} />
            </div>
        )
    }
    signupHandle(user){
      const actions = this.props.authActions
      actions.signUp(user)
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
)(Signup)
