import React from 'react';
import headerLogo from '../assets/hacker-news.svg';
import { Box } from '@mui/material';

const styles = {
  headerContainer: {
    boxShadow: '0 1px 4px 0 rgba(0, 21, 41, 0.12)',
    padding: {
      xs: '24px 0px 22px 0px',
      sm: '44px 0px 42px 150px',
    },
    display: {
      xs: 'flex',
      sm: 'block',
    },
    justifyContent: 'center',
  },
};

export const Header = () => {
  return (
    <Box sx={styles.headerContainer}>
      <img src={headerLogo} alt='' />
    </Box>
  );
};
