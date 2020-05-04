import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'; 
import 'whatwg-fetch'
import Intro from '../Intro'
import './App.css';

class App extends Component{
  state = {
    series:[],
    rating:[]
  }
  componentDidMount(){
    fetch('http://api.tvmaze.com/search/shows?q=steven-universe')
      .then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({ series: data[0].show.summary})
        this.setState({rating: data[0].show.rating.average })
        })
  }

  render(){
    return (
    <div className="App">
      <header className="App-header">
        <p>
         TV Series List
        </p>
      </header>
      <Intro message ="Here you can find all of your most loved series."/>
      <br/>
      { ReactHtmlParser (this.state.series) }
      { ReactHtmlParser (this.state.rating) }
    </div>
  );
    }
}

export default App;
