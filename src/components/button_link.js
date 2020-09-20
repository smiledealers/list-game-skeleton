import React from 'react';

import { Button } from 'react-bootstrap';

const ButtonLink = ({ href, transition, ...props }) => {
  return href ? (
    <Button
      onClick={() => {
        console.log('clicked');
      }}
      {...props}
    />
  ) : (
    <Button {...props} />
  );
};

export default ButtonLink;
