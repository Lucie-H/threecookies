import React from 'react';
import Select from 'react-select';
import renderSVG from '../svgRenderer.js';
import Viewer from './viewer.jsx';


class SelectModule extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const placeholder = <span>Select a model</span>
    const arr = Object.keys(this.props.items);
    const options = arr.map((key) => ({ value: key, label: key }));

    return (
      <div id="superSelect" className={"section superselect "}>
        <h3 className="section-heading"> Model </h3>
        <Select
          onChange={(option) => { this.props.onSelect(option.value); }}
          options={options}
          optionComponent={SelectOption}
          placeholder={placeholder}
        />
      </div>
    );
  }
}


class SelectOption extends React.Component {

  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}
	handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	}
	handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}

  render() {
    return (
      <div className={this.props.className}
            onMouseDown={this.handleMouseDown}
            onMouseEnter={this.handleMouseEnter}
            onMouseMove={this.handleMouseMove}>
        {this.props.children}
      </div>
    );
  }
}

export {SelectOption};
export default SelectModule;
