import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    hits: null,
    searchRequest: '',
  };

  componentDidUpdate() {
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchRequest}&page=1&key=31117468-704b42021e7758bf0dae2996c&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => this.setState({ hits: data.hits }));
  }

  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.state.hits &&
            this.state.hits.map(img => {
              return (
                <ImageGalleryItem
                  key={img.id}
                  id={img.id}
                  webUrl={img.webformatURL}
                  largeUrl={img.largeImageURL}
                />
              );
            })}
        </ul>
        {this.state.hits && <Button />}
      </>
    );
  }
}

export default ImageGallery;
