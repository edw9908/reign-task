import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import angular from '../assets/angular.png';
import reactjs from '../assets/reactjs.png';
import vuejs from '../assets/vuejs.png';

export const CustomSelect = (props: any) => {
  const { filter, setPage, setFilter } = props;

  const handleChange = (event: any) => {
    localStorage.setItem('filter', event.target.value);
    setPage(0);
    setFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={filter}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={handleChange}
      >
        <MenuItem value='0'>Select your news</MenuItem>
        <MenuItem value='angular'>
          <img src={angular} alt='' style={{ marginRight: '13px' }} />
          Angular
        </MenuItem>
        <MenuItem value='reactjs'>
          <img src={reactjs} alt='' style={{ marginRight: '13px' }} />
          Reactjs
        </MenuItem>
        <MenuItem value='vuejs'>
          <img src={vuejs} alt='' style={{ marginRight: '13px' }} />
          Vuejs
        </MenuItem>
      </Select>
    </FormControl>
  );
};
