import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { NewsList } from './components/NewsList';

function App() {
  return (
    <div>
      <Header />
      <NewsList />
    </div>
  );
}

export default App;
