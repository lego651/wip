import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as authActions from '../../actions/authentication'
import SigninForm from '../../components/SigninForm'
import Header from '../../components/Header'
// import Header from '../HeaderContainer'

class Signin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
              <Header />
              <SigninForm
                    signinHandle={this._signinHandle.bind(this)}
                    signinError = {this.props.error} />
            </div>
        )
    }
    _signinHandle(user){
      const actions = this.props.authActions
      actions.signIn(user)
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
)(Signin)
