import axios from 'axios';
// import company from '../reducer/company';
export const getCategoryRedux = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(
      `https://chakuri.site/api/v1/categories`
    )
  };
};

export const addCategoryRedux = data => {
  return {
    type: 'ADD_CATEGORY',
    payload: axios.post(
      `https://chakuri.site/api/v1/categories`,
      data
    )
  };
};

export const updateCategoryRedux = (id, data) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios.patch(
      `https://chakuri.site/api/v1/categories/${id}`,
      data
    )
  };
};

export const deleteCategoryRedux = id => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(
      `https://chakuri.site/api/v1/categories/${id}`
    )
  };
};
