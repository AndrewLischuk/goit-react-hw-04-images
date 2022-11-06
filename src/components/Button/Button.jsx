import PropTypes from 'prop-types';

export const Button = ({ handlerPage }) => {
  return (
    <button className="Button" onClick={handlerPage}>
      Load More
    </button>
  );
};

Button.propTypes = {
  handlerPage: PropTypes.func,
};
