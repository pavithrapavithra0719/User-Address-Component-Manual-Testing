const initialState = {
  isLoading: false,
  isError: '',
  company: [],
  message: ''
};

const company = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'GET_COMPANY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isloading: false,
        company: action.payload.data.data
      };

    case 'ADD_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'ADD_COMPANY_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        company: [...state.company, action.payload.data.data],
        message: action.payload.data.message
      };
    case 'ADD_COMPANY_REJECTED':
      // console.log(action.payload.response.data.message);
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        company: [...state.company]
      };
    case 'UPDATE_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'UPDATE_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'UPDATE_COMPANY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        company: state.company.filter(i =>
          i.id === action.id ? action.payload.data.data : i
        )
      };

    case 'DELETE_COMPANY_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'DELETE_COMPANY_FULFILLED':
      // let index = state.company.findIndex(i => i.id === action.id);
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        company: state.company.map(i => i.id !== action.id)
        // company: state.company.splice(index, 1)
      };

    default: {
      return state;
    }
  }
};

export default company;
