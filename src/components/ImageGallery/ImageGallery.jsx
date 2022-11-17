import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, openModal }) => {
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
};

export default ImageGallery;

ImageGallery.propTypes = {
  hits: PropTypes.array,
  openModal: PropTypes.func,
};
