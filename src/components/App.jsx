import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { Audio } from 'react-loader-spinner';
import imageAPI from './services/pixabayAPI';
import { Button } from './Button/Button';

export default class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    hits: [],
    error: null,
    status: 'idle',
    hitsLength: 1,
  };

  componentDidUpdate(_, prevState) {
    const prevReq = prevState.searchRequest;
    const nextReq = this.state.searchRequest;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevReq !== nextReq || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      imageAPI
        .fetchImage(this.state.searchRequest, this.state.page)
        .then(data => {
          if (prevReq !== nextReq) {
            return this.setState({
              hits: data.hits,
              status: 'resolved',
              hitsLength: data.hits.length,
            });
          }
          if (prevPage !== nextPage) {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...data.hits],
              status: 'resolved',
              hitsLength: data.hits.length,
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handlerSearchRequest = (searchRequest, page) => {
    this.setState({ searchRequest, page });
  };

  handlerPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const {
      hits,
      showModal,
      hitsLength,
      largeImageURL,
      error,
      status,
      searchRequest,
    } = this.state;
    return (
      <div className="App">
        <Searchbar handlerSearchRequest={this.handlerSearchRequest} />

        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
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
            <ImageGallery hits={hits} openModal={this.openModal} />
          )}

          {status === 'error' && <div>{error}</div>}

          {hitsLength >= 12 && <Button handlerPage={this.handlerPage} />}
        </div>
      </div>
    );
  }
}
