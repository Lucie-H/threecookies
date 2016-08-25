import React from 'react';

class AllButtons extends React.Component {
  constructor(props) {
    super(props);

    this.downloadElement;
    this.createLink = this.createLink.bind(this);
  }

  createLink() {
    this.downloadElement = document.createElement('a');
    this.downloadElement.href = this.props.path;
    this.downloadElement.id = 'mimi';
    this.downloadElement.className = 'downloadButton button rubyColor';
    this.downloadElement.download = this.props.fileName;
    this.downloadElement.innerHTML = 'Download Cookie Cutter';

    if(this.props.selected && this.props.path !== 'undefined') {
      document.getElementById('download').appendChild(this.downloadElement);

    } else if(this.props.path === 'undefined') {
      const bla = document.getElementById('download');
      const bli = document.getElementById('mimi');
      const tada = bla.removeChild(bli);
    }
  }

  render() {

    this.createLink();

    return (
      <div id="addButton">
        <div id="download">
        </div>
      </div>
    );
  }
}

export default AllButtons;
