import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

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
    const { showModal, searchRequest, largeImageURL, page } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}

        <Searchbar handlerSearchRequest={this.handlerSearchRequest} />
        <ImageGallery
          searchRequest={searchRequest}
          openModal={this.openModal}
          page={page}
          handlerPage={this.handlerPage}
        />
      </div>
    );
  }
}
