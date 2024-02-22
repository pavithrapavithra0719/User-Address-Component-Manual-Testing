const initialState = {
  job: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  totalPage: '',
  infoPage: '',
  message: ''
};

const job = (state = initialState, action) => {
  switch (action.type) {
    //GET_JOB
    case 'GET_JOB_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_JOB_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        job: []
      };
    case 'GET_JOB_FULFILLED':
      const { location, limit, page, sortby } = action.payload;
      return {
        ...state,
        isloading: false,
        isError: false,
        job: action.payload.result.data.data.result,
        search: action.payload.search,
        location,
        limit,
        page,
        sortby,
        orderby: action.payload.orderby,
        totalPage: action.payload.result.data.data.infoPage.maxPage,
        infoPage: action.payload.result.data.data.infoPage
      };

    case 'ADD_JOB_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'ADD_JOB_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'ADD_JOB_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        job: [...state.job, action.payload.data.data]
      };

    case 'UPDATE_JOB_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'UPDATE_JOB_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'UPDATE_JOB_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        job: state.job.map(i =>
          i.id === action.id ? action.payload.data.data : i
        )
      };

    case 'DELETE_JOB_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_JOB_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.data.message
      };
    case 'DELETE_JOB_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        job: state.job.filter(i => i.id !== action.id)
      };
    default: {
      return state;
    }
  }
};

export default job;
