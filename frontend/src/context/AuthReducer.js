/*
    Giving react info about what type of actions that it accepts
    when dispatch is called with
    Reducers cannot change the state. It can only return a new object

    LEARN React Hooks, Promises

    useForms
    how to implement forms using react components
    
*/

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "UPDATE_BIO":
      return {
        user: { ...state.user, bioDescription: action.payload },
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
