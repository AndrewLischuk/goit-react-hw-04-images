import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    hits: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, _) {
    const prevReq = prevProps.searchRequest;
    const nextReq = this.props.searchRequest;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevReq !== nextReq || prevPage !== nextPage) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchRequest}&page=${this.props.page}&key=31117468-704b42021e7758bf0dae2996c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(new Error('There an error has occured'));
        })
        .then(data => this.setState({ hits: data.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { hits, loading, error } = this.state;
    const { openModal, handlerPage } = this.props;
    return (
      <div className="Gallery">
        {error && <div>There an error has occured</div>}
        {loading && (
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
        {hits.length === 0 && (
          <p>No more images... Enter your search request</p>
        )}

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

        {hits.length !== 0 && <Button handlerPage={handlerPage} />}
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
