import React from 'react';
import { News } from './News';
import { Pagination } from '@mui/material';
import { CustomButtonGroup } from './CustomButtonGroup';
import { CustomSelect } from './CustomSelect';
import { Box } from '@mui/material';
import loadingGif from '../assets/loading.gif';

export const NewsList = (props: any) => {
  const {
    newsList,
    loading,
    filter,
    page,
    numberPages,
    showFavs,
    setPage,
    setFilter,
    setShowFavs,
  } = props;

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
          let favorites: any = localStorage.getItem('favorites');
          let parsedFavorites = favorites ? JSON.parse(favorites) : [];
          let isFavorite = parsedFavorites.find(
            (fav: any) => fav.objectID === news.objectID
          );
          if (story_title && story_url && author && created_at) {
            return (
              <News
                key={news.objectID}
                data={news}
                isFavorite={isFavorite ? true : false}
              />
            );
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
        <CustomButtonGroup
          showFavs={showFavs}
          setShowFavs={setShowFavs}
          setPage={setPage}
        />
      </div>
      {!showFavs ? (
        <Box
          sx={{
            width: '100%',
            marginBottom: '38px',
            display: { xs: 'flex', sm: 'block' },
            justifyContent: 'center',
          }}
        >
          <CustomSelect
            filter={filter}
            setPage={setPage}
            setFilter={setFilter}
          />
        </Box>
      ) : null}
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
