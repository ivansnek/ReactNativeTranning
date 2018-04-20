const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const IMAGE_HOST = 'https://image.tmdb.org/t/p/';
const MONTHS_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const generateId = (size = 15) => {
  let id: string = '';
  Array.apply(null, Array(size)).map((v, i) => {
    id += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  });
  return id;
};

const populateImageURIs = data =>
  Array.isArray(data)
    ? data.map(movie => updateImages(movie)) : updateImages(data);

const updateImages = item => {
  item.poster_path = `${IMAGE_HOST}w300${item.poster_path}`;
  item.backdrop_path = `${IMAGE_HOST}w500${item.backdrop_path}`;
  return item;
}

const formatDate = value => {
  if (!value) return 'No especified';
  const date = new Date(value);
  const day = date.getDate();
  const month = MONTHS_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const formatCurrency = currency =>
  currency ? `$${currency.toLocaleString()}` : 'No especified';

export { generateId, populateImageURIs, formatDate, formatCurrency };