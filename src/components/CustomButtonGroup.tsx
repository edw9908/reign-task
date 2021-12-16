import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

export const CustomButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  return (
    <ButtonGroup variant='outlined'>
      <Button
        color={selectedButton === 1 ? 'primary' : 'secondary'}
        onClick={() => setSelectedButton(1)}
        style={{ width: '100px' }}
      >
        All
      </Button>
      <Button
        color={selectedButton === 2 ? 'primary' : 'secondary'}
        onClick={() => setSelectedButton(2)}
        style={{ width: '100px' }}
      >
        My faves
      </Button>
    </ButtonGroup>
  );
};
