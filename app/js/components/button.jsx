import React from 'react';

function AllButtons(props) {
  const anchor = props.path
  ? (<a href={props.path} className="downloadButton button rubyColor" download={props.fileName}>Download Cookie Cutter</a>)
  : null;

  return (
    <div id="addButton">
      <div id="download">
        {anchor}
      </div>
    </div>
  );
}

export default AllButtons;
