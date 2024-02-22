const initialState = {
  isLoading: false,
  isError: '',
  category: [],
  message: ''
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_CATEGORY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'GET_CATEGORY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isloading: false,
        category: action.payload.data.data
      };

    case 'ADD_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'ADD_CATEGORY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        category: [...state.category, action.payload.data.data],
        message: action.payload.data.message
      };
    case 'ADD_CATEGORY_REJECTED':
      // console.log(action.payload.response.data.message);
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        category: [...state.category]
      };
    case 'UPDATE_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'UPDATE_CATEGORY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'UPDATE_CATEGORY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        category: state.category.filter(i =>
          i.id === action.id ? action.payload.data.data : i
        )
      };

    case 'DELETE_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_CATEGORY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'DELETE_CATEGORY_FULFILLED':
      // let index = state.category.findIndex(i => i.id === action.id);
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        category: state.category.map(i => i.id !== action.id)
        // category: state.category.splice(index, 1)
      };

    default: {
      return state;
    }
  }
};

export default category;
