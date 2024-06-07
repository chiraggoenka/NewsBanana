import './App.css';
import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<News key='general' pageSize={12} country='in' category='general' apiKey={apiKey} />}></Route>
            <Route exact path='/business' element={<News key='business' pageSize={12} country='in' category='business' apiKey={apiKey} />}></Route>
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={12} country='in' category='entertainment' apiKey={apiKey} />}></Route>
            <Route exact path='/health' element={<News key='health' pageSize={12} country='in' category='health' apiKey={apiKey} />}></Route>
            <Route exact path='/science' element={<News key='science' pageSize={12} country='in' category='science' apiKey={apiKey} />}></Route>
            <Route exact path='/sports' element={<News key='sports' pageSize={12} country='in' category='sports' apiKey={apiKey} />}></Route>
            <Route exact path='/technology' element={<News key='technology' pageSize={12} country='in' category='technology' apiKey={apiKey} />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
