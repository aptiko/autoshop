import { compose } from 'redux';

export const findById = compose(
  array => array.length ? array[0] : null,
  (array, id) => array.filter(item => item.id === id),
);

export const findByProperty = compose(
  array => array[0],
  (array, property, value) => array.filter(item => item[property] === value),
);
