import { FETCH_USER } from "../actions/types";

const INITIAL_STATE = { isSignedIn: null, userId: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isSignedIn: action.payload || false,
        userId: action.payload
      };
    default:
      return state;
  }
}
