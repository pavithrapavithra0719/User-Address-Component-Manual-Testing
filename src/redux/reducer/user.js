const initial = {
  user: {},
  token: '',
  isLogin: '',
  isLoading: '',
  isError: '',
  message: ''
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: true,
        visible: true,
        token: action.payload.data.token
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLogin: false,
        visible: true,
        message: action.payload.response.data.message
      };

    case 'REGISTER_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'REGISTER_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        visible: true,
        user: action.payload.data
      };
    case 'REGISTER_USER_REJECTED':
      return {
        ...state,
        isLoading: true,
        isError: false,
        visible: true,
        message: action.payload.response.data.message
      };

    default:
      return state;
  }
};
