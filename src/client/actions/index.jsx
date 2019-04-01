export const toggleCheck = () => {
  return {
    type: "TOGGLE_CHECK"
  };
};

export const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

export const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

export const inputName = value => {
  return {
    type: "INPUT_NAME",
    value
  };
};

export const inputTextarea = value => {
  return {
    type: "INPUT_TEXT_AREA",
    value
  };
};

export const selectOption = value => {
  return {
    type: "SELECT_OPTION",
    value
  };
};

export const setShowFakeComp = value => {
  return {
    type: "SHOW_FAKE_COMP",
    value
  };
};

export const addEmployee = (employee) => {
  return {
    type: "ADD_EMPLOYEE",
    payload:employee
  };
};

export const deleteEmployee = (id) => {
  return {
    type: "DELETE_EMPLOYEE",
    payload:id
  };
};

export const changeSortRule = (order, orderBy) => {
  return {
    type: "CHANGE_SORT_RULE",
    order,
    orderBy
  }
};

export const changePage = (page) => {
  return {
    type: "CHANGE_PAGE",
    page
  }
};

export const changeRowsPerPage = (rowsPerPage) => {
  return {
    type: "CHANGE_ROWS_PER_PAGE",
    rowsPerPage
  }
};
