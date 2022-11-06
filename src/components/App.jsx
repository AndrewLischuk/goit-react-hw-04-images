import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchRequest: '',
  };

  handlerSearchRequest = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <>
        <Searchbar handlerSearchRequest={this.handlerSearchRequest} />
        <ImageGallery searchRequest={this.state.searchRequest} />
      </>
    );
  }
}
