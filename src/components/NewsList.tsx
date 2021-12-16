import React, { useState, useEffect } from 'react';
import { News } from './News';
import { Pagination } from '@mui/material';
import { CustomButtonGroup } from './CustomButtonGroup';
import { Box, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import angular from '../assets/angular.png';
import reactjs from '../assets/reactjs.png';
import vuejs from '../assets/vuejs.png';

interface IResponse {
  created_at: string;
  author: string;
  story_title: string;
  objectID: string;
}

export const NewsList = () => {
  const [filter, setFilter] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);
  const [newsList, setNewsList] = useState<IResponse[]>([]);

  useEffect(() => {
    let filterValue = localStorage.getItem('filter')
      ? localStorage.getItem('filter')
      : 0;
    setFilter(filterValue);
  }, []);

  useEffect(() => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?${
      filter === '0' || filter === 0 ? '' : 'query=' + filter + '&'
    }hitsPerPage=8&page=${page}`;
    axios
      .get(url)
      .then((response) => {
        setNewsList(response.data.hits);
        setNumberPages(response.data.nbPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, filter]);

  const handleChange = (event: any) => {
    localStorage.setItem('filter', event.target.value);
    setPage(0);
    setFilter(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: {
          xs: '70px 30px 0px 30px',
          md: '70px 100px 0px 100px',
        },
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '63px',
        }}
      >
        <CustomButtonGroup />
      </div>
      <Box
        sx={{
          width: '100%',
          marginBottom: '38px',
          display: { xs: 'flex', sm: 'block' },
          justifyContent: 'center',
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={filter}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
          >
            <MenuItem value={0}>Select your news</MenuItem>
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
      </Box>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {newsList.map((news: any) => {
          const { story_title, story_url, author, created_at } = news;
          if (story_title && story_url && author && created_at) {
            return <News key={news.objectID} data={news} />;
          } else {
            return null;
          }
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          marginBottom: '20px',
        }}
      >
        <Pagination
          page={page + 1}
          count={numberPages}
          variant='outlined'
          shape='rounded'
          color='primary'
          onChange={(e, value) => setPage(value - 1)}
        />
      </div>
    </Box>
  );
};
