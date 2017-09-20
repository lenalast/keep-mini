import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({match}) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({match}) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Test = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/test/home">Home</Link></li>
        <li><Link to="/test/about">About</Link></li>
        <li><Link to="/test/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/test/home" component={Home}/>
      <Route path="/test/about" component={About}/>
      <Route path="/test/topics" component={Topics}/>
    </div>
  </Router>
)
export default Test