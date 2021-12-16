import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

export const CustomButtonGroup = (props: any) => {
  const { showFavs, setShowFavs, setPage } = props;
  return (
    <ButtonGroup variant='outlined'>
      <Button
        color={!showFavs ? 'primary' : 'secondary'}
        onClick={() => {
          setPage(0);
          setShowFavs(false);
        }}
        style={{ width: '100px' }}
      >
        All
      </Button>
      <Button
        color={showFavs ? 'primary' : 'secondary'}
        onClick={() => {
          setPage(0);
          setShowFavs(true);
        }}
        style={{ width: '100px' }}
      >
        My faves
      </Button>
    </ButtonGroup>
  );
};
