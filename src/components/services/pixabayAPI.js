function fetchImage({ name, page }) {
  fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=31117468-704b42021e7758bf0dae2996c&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('There an error has occured'));
  });
}

const api = {
  fetchImage,
};
export default api;
