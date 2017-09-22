import React from 'react';

export default function Editor(props) {
    return (
      <textarea
        id='editor'
        value={props.value}
        onChange={props.onChange}
      />
    );
}
