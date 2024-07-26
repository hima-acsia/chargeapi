export const setData = (data) => ({
  type: 'SET_DATA',
  data,
});

export const setQuantity = (quantity) => ({
  type: 'SET_QUANTITY',
  quantity,
});

export const setUnit = (unit) => ({
  type: 'SET_UNIT',
  unit,
});

export const setCategory = (category) => ({
  type: 'SET_CATEGORY',
  category,
});

export const submitData = (submittedData) => ({
  type: 'SUBMITTED_DATA',
  submittedData,
});

   // defining the action to be done with parameters
  // export the type and values