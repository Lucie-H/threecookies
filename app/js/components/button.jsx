import React from 'react';

class AllButtons extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandlerButtonAirship = this.onClickHandlerButtonAirship.bind(this);
    this.onClickHandlerButtonRuby = this.onClickHandlerButtonRuby.bind(this);
  }

  onClickHandlerButtonAirship() {
    this.props.showShip();
  }
  onClickHandlerButtonRuby() {
    this.props.showRuby();
  }


  render() {
    return (
      <div id="addButton">
        <div id="airship">
          <button
            onClick={this.onClickHandlerButtonAirship}
            id="airshipButton"
            className={"airshipButton " + this.props.classN}
          >Airship</button>
        </div>
        <div id="ruby">
          <button
            onClick={this.onClickHandlerButtonRuby}
            id="rubyButton"
            className={"rubyButton " + this.props.classN}
          >Ruby</button>
        </div>
        <div id="download">
          <a
            href={this.props.path}
            className={"downloadButton " + this.props.classN}
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
