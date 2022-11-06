export const ImageGalleryItem = ({ id, webUrl, largeUrl }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={webUrl} alt={id} className="ImageGalleryItem-image" />
    </li>
  );
};
