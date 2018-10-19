import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Footer extends React.Component {
    constructor(props, context){
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      return (
        <div className="footer-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-12">
                <h5>Company</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">About</a></li>
                  <li><a className="text-muted" href="#">Contact</a></li>
                  <li><a className="text-muted" href="#">support@gmail.com</a></li>
                </ul>
              </div>
              <div className="col-md-3 col-12">
                <h5>Services</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Privacy</a></li>
                  <li><a className="text-muted" href="#">Terms</a></li>
                  <li><a className="text-muted" href="#">Team feature</a></li>
                </ul>
              </div>
              <div className="col-md-3 col-12">
                {/* <h5>Features</h5>
                <ul class="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Cool stuff</a></li>
                  <li><a className="text-muted" href="#">Random feature</a></li>
                  <li><a className="text-muted" href="#">Team feature</a></li>
                </ul> */}
              </div>
              <div className="col-md-3 col-12">
                <h5>Logo</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Cool stuff</a></li>
                  <li><a className="text-muted" href="#">@ Canny 2018</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

module.exports = Footer
