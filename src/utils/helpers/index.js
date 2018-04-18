const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateId = (size = 15) => {
  let id: string = '';
  Array.apply(null, Array(size)).map((v, i) => {
    id += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  });
  return id;
};

export { generateId };