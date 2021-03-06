import './SearchResults.css';
import React from 'react';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.tracks} isRemoval={false} onAdd={this.props.onAdd}/>
      </div>
    );
  }
}

export default SearchResults;
