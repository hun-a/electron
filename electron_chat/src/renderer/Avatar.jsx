import React from 'react';

const AVATAR_STYLE = {
  width: 32,
  textAlign: 'center',
  fontSize: 24
};

export default function Avatar(props) {
  const { photoURL } = props.user;
  if (photoURL) {
    // printing photo from url if url exists
    return <img className='img-rounded' src={photoURL} srtle={AVATAR_STYLE} />;
  } else {
    // printing icon when url not exists
    return (
      <div style={AVATAR_STYLE}>
        <span className='icon icon-user' />
      </div>
    );
  }
}
