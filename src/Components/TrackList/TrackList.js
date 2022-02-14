import './TrackList.css';
import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => <Track key={track.id} isRemoval={this.props.isRemoval} track={track} onRemove={this.props.onRemove} onAdd={this.props.onAdd}/>)}
      </div>
    );
  }
}

export default TrackList;
