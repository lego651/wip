import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as authActions from '../../actions/authentication'
import SignupForm from '../../components/SignupForm'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class Watchlist extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
      const authActions = this.props.authActions
      const token = localStorage.getItem('token')
      if(token && token.length > 0){
        authActions.reducerLoggedIn()
        authActions.getUserInfo(token)
      } else {
        console.log('No token in Header Container')
      }
    }
    render() {
        return (
            <div>
              {
                this.props.logged && this.props.user
                ? <div>
                    <Header logged={this.props.logged}
                        username={this.props.user.profile.name} />

                    <Footer />
                  </div>
                : <div> Loading... </div>
              }
            </div>
        )
    }
}

// -------------------redux react binding--------------------
function mapStateToProps(state) {
  return {
    logged: state.auth.logged, // boolean,
    user: state.auth.user, // object, user.profile.name, user.email等
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
)(Watchlist)
