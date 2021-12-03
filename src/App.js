import React, { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Spinner from './components/Loader/Spinner';
import pixabayApi from './components/Api/pixabayApi';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showBtnLoadMore, setShowBtnLoadMorey] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    if (query !== '' || page === 1) {
      setStatus('pending');

      pixabayApi(query, page)
        .then(results => {
          setImages([...images, ...results.hits]);
          setShowBtnLoadMorey(checkImageLength(results));
          setStatus('resolved');
        })
        .catch(error => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const checkImageLength = results => {
    return !(results.hits.length < 12 || results.totalHits <= 12);
  };

  const handleLoadMoreBtn = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery items={images} />
      {status === 'pending' && <Spinner />}
      {status !== 'pending' && showBtnLoadMore && (
        <Button onClick={handleLoadMoreBtn} />
      )}
    </div>
  );
}
