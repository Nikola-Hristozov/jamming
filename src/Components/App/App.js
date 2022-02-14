import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName:"New Playlist",
      playlistTracks: []
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track){
    if(!this.state.playlistTracks.some(tracks=>tracks.id===track.id)){
      this.setState({playlistTracks:[...this.state.playlistTracks,track]})
    }
  }

  search(term){
    Spotify.search(term).then(SearchResults=>this.setState({SearchResults:SearchResults}));
    
  }
  removeTrack(track){
    this.setState({playlistTracks:this.state.playlistTracks.filter(tracks=>tracks.id!==track.id)});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    let trackURIs=this.state.playlistTracks.map(element => element.uri);
    let name=this.state.playlistName;
    Spotify.savePlaylist(name,trackURIs);
    this.setState({playlistName:"New Playlist", playlistTracks:[]})
  }

  render() {

    Spotify.getAccessToken();

    return (
      <div>
        <h1><span className="highlight">Jamming</span></h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults tracks={this.state.SearchResults} onAdd={this.addTrack}  />
            <Playlist tracks={this.state.playlistTracks} name={this.state.playlistName} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
