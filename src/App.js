/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDVxSunLhBW2tHJiAbkTrmWajo_m_J-oYCS-LFpL0l1hFj5f6FZwpX2I4BOTDYdPUDe5uaClUPOZ91-svbLvMi3o5kZi7WtoCq3vfhv3ZmteeLFMoVNevxXcFhd8lBBA9fBgkx4Vg63FSkM9DEe7_tbFpF3PueE9K9sCvzW1XpvbPCQThob';

function shuffleArray(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      songLoaded: false,playlist:{},currentTrack:{}
    };
  }

  checkAnswer(targetId, trueId) {
      if (targetId == trueId){
        swal('Bravo', 'Bien trouvé ;)', 'success').then(this.next());
      }
      swal('Non', 'Raté ... il y a l\'album, nulos', 'error')
  }

  next() {
    const next = this.state.playlist.items[getRandomNumber(20)].track
    while (next == this.state.currentTrack){
      const next = this.state.playlist.items[getRandomNumber(20)].track
    }
    this.setState({ currentTrack: next});
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({ songLoaded: true, playlist: data, currentTrack: data.items[getRandomNumber(20)].track});
    })
  }

  render() {
    if (this.state.songLoaded) {
    const currentTrack = this.state.currentTrack;
    //this.setState({ currentId: currentTrack.id});
    const Track1 = this.state.currentTrack;
    const Track2 = this.state.playlist.items[getRandomNumber(20)].track;
    while (Track1.id == Track2.id){
      const Track2 = this.state.playlist.items[getRandomNumber(20)].track;
    }
    const Track3 = this.state.playlist.items[getRandomNumber(20)].track;
    while ((Track1.id == Track3.id) || (Track2.id == Track3.id) ){
      const Track3 = this.state.playlist.items[getRandomNumber(20)].track;
    }
    const tracks = [Track1, Track2, Track3]
    shuffleArray(tracks);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <p>Un ptit blind test fait en React !</p>
          <p>Il y a {this.state.playlist.items.length} musiques</p>
          <AlbumCover track={currentTrack}/>
        </div>
        <div className="App-buttons">
          <Button onClick={() => this.checkAnswer(currentTrack.id, tracks[0].id)}>{tracks[0].name}</Button>
          <Button onClick={() => this.checkAnswer(currentTrack.id, tracks[1].id)}>{tracks[1].name}</Button>
          <Button onClick={() => this.checkAnswer(currentTrack.id, tracks[2].id)}>{tracks[2].name}</Button>
        </div>
      </div>
    );
  }
    else{
      return (
        <div className="App">
          <header className="App-header">
            <img src={loading} className="App-logo" alt="logo"/>
            <h1 className="App-title">Chargement des chansons</h1>
          </header>
          <div className="App-buttons">
          </div>
        </div>
      );
    }
}
}

class AlbumCover extends Component {
  render() {
    const track = this.props.track
    return (
      <div>
      <img src={track.album.images[1].url} style={{ width: 400, height: 400 }} />
      <Sound url={track.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
);
  }
}

export default App;
