import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import axios from 'axios'

// import Header from '../../components/Header'
import HeaderContainer from '../HeaderContainer'
import HomeSec1 from '../../components/HomeSec1'
import Footer from '../../components/Footer'
// import HomeSec2 from '../../components/HomeSec2'

const rootURL = 'http://localhost:5000'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
      axios(`${rootURL}/test`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <HeaderContainer />
                <HomeSec1 />
                <Footer />
            </div>
        )
    }
}

export default Home

// style="background-color: #e3f2fd;"
