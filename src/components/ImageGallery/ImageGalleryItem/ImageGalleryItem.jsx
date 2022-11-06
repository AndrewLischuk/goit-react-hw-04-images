import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webUrl, largeUrl, openModal }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => openModal(largeUrl)}>
      <img src={webUrl} alt={id} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func,
  webUrl: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};
