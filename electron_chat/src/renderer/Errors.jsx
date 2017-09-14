import React from 'react';

const ERRORS_STYLE = {
  padding: 10,
  marginBottom: 30,
  borderRadius: 5,
  color: '#E62626',
  backgroundColor: '#FFDDDF'
};

export default function Errors(props) {
  const { errorMessages } = props;
  if (!errorMessages || !errorMessages.length) {
    return null;
  }
  return (
    <div stype={ERRORS_STYLE}>
      {errorMessages.map(e => <div key={e}>{e}</div> )}
    </div>
  );
}
