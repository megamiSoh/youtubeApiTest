import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios'
import renderHTML from 'react-render-html';

import YouTube from 'react-youtube';
class App extends Component {
  
  constructor(props) {
    super(props); 
    this.callback = this.callback.bind(this)
      this.state={
        videos: [],
        selectedVideo: [],
       news: [],
       videoList: ['JTcTPExaaVo','XMgnXQnyp-g']
    }
  }
  callback(item) {
    // document.querySelector('video').play();
    console.log(item)
  }
  componentWillMount() {
    window.addEventListener('load', this.callback, false)
  }
  componentDidMount() {
    
    axios.get('https://www.googleapis.com/youtube/v3/videos?', {
      params: {
        id: this.state.videoList.join(),
        key:'AIzaSyBiTgaplxmGcwYlyKFzWs8WgDuB9aWz7aY',
        part: 'snippet',
        // type: 'video',
        // maxResult: 10

      }
    }).then(response => {
      console.log(response.data)
      this.setState({
        videos: response.data.items
      })
    })
    
    
    axios.get('http://localhost:8000/news'
  ).then(response => {
    console.log(1)
      console.log(response)
      this.setState({
        news: response.data.items
      })
    })
  }
 
  render() {
    const opts = {
      height: '250',
      width: '500',
      playerVars: {
        autoplay: 0
      }}
   const item = this.state.videos.map((item, key) => {
        return (
        <YouTube 
         key={key}
        videoId={item.id}
        opts={opts}/>
        )
      })
    // const news= this.state.news.map((item, key) => {
    //   return (
    //     <a href={item.link} style={style} key={key}>{renderHTML(item.title)}</a>
    //   )
    // })
    return (
      <div className="App">
      <h1>다이어트 동영상</h1>
      <div>{item}</div>
      <h1>다이어트 뉴스</h1>
      {/* <div>{news}</div> */}
      <input type='text' />
      <button>검색</button>
      {}

       
      </div>
    );
  }
}
const style={
  padding: '10px',
  borderBottom: '1px solid #aaa',
  display: 'block',
  color: 'black',
  textDecoration: 'none'
}
export default App;
