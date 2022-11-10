import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { hits, openModal } = this.props;
    return (
      <div className="Gallery">
        <ul className="ImageGallery">
          {hits &&
            hits.map(img => {
              return (
                <ImageGalleryItem
                  key={img.id}
                  id={img.id}
                  webUrl={img.webformatURL}
                  largeUrl={img.largeImageURL}
                  openModal={openModal}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  handlerPage: PropTypes.func,
  openModal: PropTypes.func,
  page: PropTypes.number.isRequired,
  searchRequest: PropTypes.string.isRequired,
};
