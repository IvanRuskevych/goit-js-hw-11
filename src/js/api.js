import axios from 'axios';

async function renderGallery(searchQuery, page, per_page) {
  const BASE_URL = `https://pixabay.com/api/?`;
  const searchParams = new URLSearchParams({
    key: '34761066-51cba9c8f44b54f46b1644db8',
    q: searchQuery,
    orientation: 'horizontal',
    safesearch: true,
    image_type: 'photo',
    page,
    per_page,
    lang: 'en',
  });

  try {
    const response = await axios(`${BASE_URL}${searchParams}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return await response.json();
}
export { renderGallery };
