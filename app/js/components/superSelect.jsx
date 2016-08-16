import React from 'react';
import Select from 'react-select';
// import classNames from 'classnames';

const RUBYOBJECT =  { id: 1, modelName: "Ruby", label: "ruby", group: "stlModel" };
const JSOBJECT = { id: 2, modelName: "JavaScript", label: "javascript", group: "stlModel" }
const AIRSHIPOBJECT = { id: 3, modelName: "Airship", label: "airship", group: "stlModel" }

class SelectModule extends React.Component {

  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.pickAModel = this.pickAModel.bind(this);

    this.stlModels = [
      RUBYOBJECT,
      JSOBJECT,
      AIRSHIPOBJECT
    ]

    this.state = Object.assign({}, RUBYOBJECT);
  }

  handler(item) {
    if(item.label === 'ruby') this.props.showRuby();
    if(item.label === 'airship') this.props.showShip();
    if(item.label === 'javascript') this.props.showJS();
  }

  pickAModel(item, search) {
    const itemClass = classNames(item.label.toLowerCase());
    return(
      <div className={itemClass}>
        <p>{item.modelName}</p>
      </div>
    );
  }

/**/

  render() {
    var placeholder = <span>Select a model</span>

    return (
      <div id="superSelect" className={"section superselect " + this.props.classN}>
        <h3 className="section-heading"> Model </h3>
        <Select
          onChange={this.handler}
          options={this.stlModels}
          placeholder={placeholder}
          value={this.state.modelName}
        />
      </div>
    );
  }

}

export default SelectModule;
