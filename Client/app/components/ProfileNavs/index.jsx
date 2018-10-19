import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ProfileAccountForm from '../ProfileAccountForm'
import ProfilePasswordForm from '../ProfilePasswordForm'
import ProfileWatchlistForm from '../ProfileWatchlistForm'

import './style.less'

class ProfileNavs extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    PostWatchList(newItem){
      this.props.postWatchList(newItem)
    }
    DeleteWatchList(id){
      this.props.deleteWatchList(id)
    }
    render() {
      const WatchList = this.props.watchlist
      return (
        <div className="profile-navs-container">
          <div className="navs-container row justify-content-center">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">password</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">watchlist</a>
              </li>
            </ul>
          </div>

          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <ProfileAccountForm />
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <ProfilePasswordForm />
            </div>
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <ProfileWatchlistForm watchList={WatchList}
                                    postWatchList={this.PostWatchList.bind(this)}
                                    deleteWatchList={this.DeleteWatchList.bind(this)} />
            </div>
          </div>

        </div>
      )
    }
}

module.exports = ProfileNavs
