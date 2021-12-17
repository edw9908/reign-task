import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import { NewsList } from './components/NewsList';

interface IResponse {
  created_at: string;
  author: string;
  story_title: string;
  objectID: string;
}

function App() {
  let filterValue = localStorage.getItem('filter')
    ? localStorage.getItem('filter')
    : '0';
  const [filter, setFilter] = useState<any>(filterValue);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);
  const [newsList, setNewsList] = useState<IResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    if (!showFavs) {
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
    } else {
      let favorites: any = localStorage.getItem('favorites');
      let parsedFavorites = favorites ? JSON.parse(favorites) : [];
      setNewsList(parsedFavorites.slice(page * 8, 8 * (page + 1)));
      setNumberPages(Math.ceil(parsedFavorites.length / 8));
    }
  }, [page, filter, showFavs]);

  return (
    <div>
      <Header />
      <NewsList
        newsList={newsList}
        loading={loading}
        filter={filter}
        page={page}
        numberPages={numberPages}
        showFavs={showFavs}
        setPage={setPage}
        setFilter={setFilter}
        setShowFavs={setShowFavs}
      />
    </div>
  );
}

export default App;
