import axios from 'axios';

// export const getJobRedux = (
//   // search = '',
//   // location = '',
//   // limit = 5,
//   // page = 1,
//   // sortby = '',
//   // orderby = ''
//   options
// ) => {
//   return {
//     type: 'GET_JOB',
//     payload: new Promise((resolve, reject) => {
//       const {
//         search = '',
//         page = '',
//         limit = '',
//         location = '',
//         sortby = '',
//         orderby = ''
//       } = options;

// axios
//   .get(
//     `https://chakuri.site/api/v1/jobs?name=${search}&location=${location}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`
//   )
//         .then(result => resolve(result))
//         .catch(err => reject(err));
//     })
//   };
// };

export const getJobRedux = (
  search = '',
  location = '',
  limit = 6,
  page = 1,
  sortby = 'j.updated_at',
  orderby = 'desc'
) => {
  return {
    type: 'GET_JOB',
    payload: new Promise((resolve, reject) => {
      axios
        .get(
          `https://chakuri.site/api/v1/jobs?name=${search}&location=${location}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`
        )
        .then(result => {
          resolve({
            result,
            search,
            location,
            limit,
            page,
            sortby,
            orderby
          });
        })
        .catch(err => {
          reject(err);
        });
    })
  };
};

export const addJobRedux = data => {
  return {
    type: 'ADD_JOB',
    payload: axios.post(
      'https://chakuri.site/api/v1/jobs',
      data
    )
  };
};
export const updateJobRedux = (id, data) => {
  return {
    type: 'UPDATE_JOB',
    id,
    payload: axios.patch(
      'https://chakuri.site/api/v1/jobs/' + id,
      data
    )
  };
};
export const deleteJobRedux = id => {
  return {
    type: 'DELETE_JOB',
    id,
    payload: axios.delete(
      'https://chakuri.site/api/v1/jobs/' + id
    )
  };
};
