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
        <button
          onClick={this.onClickHandlerButtonAirship}
          id="airshipButton"
          className="jsButton"
        >Airship</button>
        <button
          onClick={this.onClickHandlerButtonRuby}
          id="rubyButton"
          className="rubyButton"
        >Ruby</button>
      </div>
    );
  }
}

AllButtons.propTypes = {
  showShip: React.PropTypes.func.isRequired,
  showRuby: React.PropTypes.func.isRequired
};

export default AllButtons;
