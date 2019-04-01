import { combineReducers } from "redux";
var _ = require('lodash');

const defaultState = {
  employees: []
};

const initState = {
  order: 'desc',
  orderBy: 'name',
  page: 0,
  rowsPerPage: 10,
};

const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    return {
      checked: !store.checked
    };
  }

  return store || { checked: false };
};

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || { value: 0 };
};

const username = (store, action) => {
  if (action.type === "INPUT_NAME") {
    return {
      value: action.value
    };
  }

  return store || { value: "" };
};

const textarea = (store, action) => {
  if (action.type === "INPUT_TEXT_AREA") {
    return {
      value: action.value
    };
  }

  return store || { value: "" };
};

const selectedOption = (store, action) => {
  if (action.type === "SELECT_OPTION") {
    return {
      value: action.value
    };
  }
  return store || { value: "0-13" };
};

const showFakeComp = (store, action) => {
  if (action.type === "SHOW_FAKE_COMP") {
    return {
      value: action.value
    };
  }
  return store || { value: false };
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_SORT_RULE':
      return {
        ...state,
        order: action.order,
        orderBy: action.orderBy
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.page
      }
    case 'CHANGE_ROWS_PER_PAGE':
      return {
        ...state,
        rowsPerPage: action.rowsPerPage
      }
    default:
      return state;
  }
};

const employees = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      {
        let employee = action.payload;
        let newEmployee = {
          id: employee.id,
          name: employee.name,
          title: employee.title,
          sex: employee.sex,
          startDate: employee.startDate,
          officePhone: employee.officePhone
        };
        let newState = _.cloneDeep(state);
        newState.employees.push(newEmployee);
        return newState;
      };
    case 'DELETE_EMPLOYEE':
      {
        let newState = _.cloneDeep(state);
        let index = _.findIndex(newState.employees, { id: action.payload });
        newState.employees.splice(index, 1);
        return newState;
      };
    default: return state;
  };
}

export default combineReducers({
  checkBox,
  number,
  username,
  textarea,
  selectedOption,
  showFakeComp,
  employees,
  pageReducer
});
