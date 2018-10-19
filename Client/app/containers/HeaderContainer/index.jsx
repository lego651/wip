import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as authActions from '../../actions/authentication'
import Header from '../../components/Header'


class HeaderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
      const actions = this.props.authActions
      const token = localStorage.getItem('token')
      if(token && token.length > 0){
        actions.reducerLoggedIn()
        actions.getUserInfo(token)
      } else {
        console.log('No token in Header Container')
      }
    }
    render() {
        return (
            <div>
              {
                this.props.logged && this.props.user
                ?   <Header logged={this.props.logged}
                            username={this.props.user.profile.name} />
                :
                    <Header logged={false} />
              }
            </div>
        )
    }
}

// -------------------redux react binding--------------------
function mapStateToProps(state) {
  return {
    logged: state.auth.logged, // boolean,
    user: state.auth.user // object, we only need: user.name
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
)(HeaderContainer)
