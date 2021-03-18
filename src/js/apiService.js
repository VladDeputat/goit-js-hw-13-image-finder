const KEY = '20734664-af4acccafc6bb35b2dfeb891d';
const baseLink = 'https://pixabay.com/api/';
const perPage = 12;

export default function fetchContent(query, pageNum) {
  return fetch(
    `${baseLink}?image_type=photo&orientation=horizontal&q=${query}&page=${pageNum}&per_page=${perPage}&key=${KEY}`,
  ).then(res => res.json());
}
