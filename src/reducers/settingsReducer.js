import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        // it will basically toggle it from the settingsActions.js
        disableBalanceOnAdd: action.payload,
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        // it will basically toggle it from the settingsActions.js
        disableBalanceOnEdit: action.payload,
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        // it will basically toggle it from the settingsActions.js
        allowRegistration: action.payload,
      };
    default:
      return state;
  }
}
