import React from 'react';

class AllButtons extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandlerButtonAirship = this.onClickHandlerButtonAirship.bind(this);
    this.onClickHandlerButtonRuby = this.onClickHandlerButtonRuby.bind(this);
    //this.onClickHanderDownload = this.onClickHanderDownload.bind(this);
    //this.pathRub = "../stl/ruby.stl";
  }

  onClickHandlerButtonAirship() {
    this.props.showShip();
  }
  onClickHandlerButtonRuby() {
    this.props.showRuby();
  }
  /*onClickHanderDownload() {
    this.props.downloadModel();
  }*/

  render() {
    return (
      <div id="addButton">
        <div id="airship">
          <button
            onClick={this.onClickHandlerButtonAirship}
            id="airshipButton"
            className="airshipButton button"
          >Airship</button>
        </div>
        <div id="ruby">
          <button
            onClick={this.onClickHandlerButtonRuby}
            id="rubyButton"
            className="rubyButton button"
          >Ruby</button>
        </div>
        <div id="download">
          <a
            href={this.props.path}
            className="downloadButton button"
            download={this.props.fileName}
          >Download Cookie Cutter</a>
        </div>
      </div>
    );
  }
}

AllButtons.propTypes = {
  showShip: React.PropTypes.func.isRequired,
  showRuby: React.PropTypes.func.isRequired
};

export default AllButtons;
