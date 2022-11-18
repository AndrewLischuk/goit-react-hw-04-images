import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { Audio } from 'react-loader-spinner';
import imageAPI from './services/pixabayAPI';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [hitsLength, setHitsLength] = useState(1);

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    setStatus('pending');

    imageAPI
      .fetchImage(searchRequest, page)
      .then(data => {
        setHits(prev => [...prev, ...data.hits]);
        setStatus('resolved');
        setHitsLength(data.hits.length);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchRequest, page]);

  const handlerSearchRequest = (searchRequest, page) => {
    setSearchRequest(searchRequest);
    setPage(page);
    setHits([]);
  };

  const handlerPage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };
  return (
    <div className="App">
      <Searchbar handlerSearchRequest={handlerSearchRequest} />

      {showModal && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}

      <div className="Gallery">
        {status === 'idle' && <p>Enter your search request</p>}

        {hitsLength === 0 && (
          <p>No images on "{searchRequest}", try another one</p>
        )}

        {status === 'pending' && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClassName
          />
        )}

        {status === 'resolved' && (
          <ImageGallery hits={hits} openModal={openModal} />
        )}

        {status === 'error' && <div>{error}</div>}

        {hitsLength >= 12 && <Button handlerPage={handlerPage} />}
      </div>
    </div>
  );
};
