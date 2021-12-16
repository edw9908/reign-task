import React, { useState, useEffect, useLayoutEffect } from 'react';
import { News } from './News';
import { Pagination } from '@mui/material';
import { CustomButtonGroup } from './CustomButtonGroup';
import { CustomSelect } from './CustomSelect';
import { Box } from '@mui/material';
import axios from 'axios';
import loadingGif from '../assets/loading.gif';

interface IResponse {
  created_at: string;
  author: string;
  story_title: string;
  objectID: string;
}

export const NewsList = () => {
  let filterValue = localStorage.getItem('filter')
    ? localStorage.getItem('filter')
    : '0';
  console.log(typeof filterValue);
  const [filter, setFilter] = useState<any>(filterValue);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);
  const [newsList, setNewsList] = useState<IResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const NewsMapped = () => {
    return (
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
    );
  };

  const Loading = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={loadingGif} alt='Loading...' />
      </div>
    );
  };

  // useEffect(() => {
  //   let filterValue = localStorage.getItem('filter')
  //     ? localStorage.getItem('filter')
  //     : 0;
  //   setFilter(filterValue);
  // }, []);

  useEffect(() => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?${
      filter === '0' ? '' : 'query=' + filter + '&'
    }hitsPerPage=8&page=${page}`;
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setNewsList(response.data.hits);
        setNumberPages(response.data.nbPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, filter]);

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
        <CustomSelect filter={filter} setPage={setPage} setFilter={setFilter} />
      </Box>
      {loading ? <Loading /> : <NewsMapped />}
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
