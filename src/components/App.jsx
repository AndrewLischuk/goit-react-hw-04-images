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
            return this.setState({ hits: data.hits, status: 'resolved' });
          }
          if (prevPage !== nextPage) {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...data.hits],
              status: 'resolved',
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ status: 'idle' }));
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
    const { hits, showModal, searchRequest, largeImageURL, page, status } =
      this.state;
    return (
      <div className="App">
        <Searchbar handlerSearchRequest={this.handlerSearchRequest} />

        {status === 'idle' && <p>Enter your search request</p>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}

        {status === 'pending' && <Audio />}

        {status === 'resolved' && (
          <ImageGallery hits={hits} openModal={this.openModal} />
        )}

        {status === 'error' && <div>There an error has occured</div>}

        <Button handlerPage={this.handlerPage} />
      </div>
    );
  }
}
