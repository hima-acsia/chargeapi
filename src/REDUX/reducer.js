
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.data };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.quantity };
    case 'SET_UNIT':
      return { ...state, unit: action.unit };
    case 'SET_CATEGORY':
      return { ...state, category: action.category };
    case 'SUBMITTED_DATA':
      return { ...state, submittedData: action.submittedData };
    default:
      return state;
  }
};

export default reducer;
  
   //assigning the data according to the action to the state variable
  //using switch cases
 // the action type is assigned in the action.js file