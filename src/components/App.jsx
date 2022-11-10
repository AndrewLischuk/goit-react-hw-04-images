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
        .then(data => this.setState({ hits: data.hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ loading: false }));
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
    this.setState(({ showModal }) => ({
      showModal: true,
      largeImageURL: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: false,
      largeImageURL: '',
    }));
  };

  render() {
    const { hits, showModal, searchRequest, largeImageURL, page, status } =
      this.state;
    if (status === 'idle') {
      return <p>Enter your search request</p>;
    }
    if (status === 'pending') {
      return <Audio />;
    }
    if (status === 'resolved') {
      return <ImageGallery hits={hits} openModal={this.openModal} />;
    }

    //   return (
    //     <div className="App">
    //       {showModal && (
    //         <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
    //       )}

    //       <Searchbar handlerSearchRequest={this.handlerSearchRequest} />

    //       <ImageGallery hits={hits} openModal={this.openModal} />
    //       {hits.length !== 0 && <Button handlerPage={this.handlerPage} />}
    //     </div>
    //   );
  }
}
