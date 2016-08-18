import React from 'react';
import Select from 'react-select';

class SelectModule extends React.Component {

  constructor(props) {
    super(props);

    this.pickAModel = this.pickAModel.bind(this);
  }

  pickAModel(item, search) {
    const itemClass = classNames(item.label.toLowerCase());
    return(
      <div className={itemClass}>
        <p>{item.modelName}</p>
      </div>
    );
  }


  render() {
    var placeholder = <span>Select a model</span>

    return (
      <div id="superSelect" className={"section superselect "}>
        <h3 className="section-heading"> Model </h3>
        <Select
          onChange={this.props.onSelect}
          options={Object.keys(this.props.items)}
          placeholder={placeholder}
        />
      </div>
    );
  }

}

export default SelectModule;
