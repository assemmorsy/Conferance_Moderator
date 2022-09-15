const useError = (msg, status) => {
  let error = new Error(msg);
  error.status = status;
  return error;
}

const useValidationError = (errors) => {
	let errorList = [];
  errors.array().reduce((msg, err) => {
    errorList.push(msg + `${err.msg} at field ${err.param}`) ;
  }, "")
  return useError(errorList, 400)
}

module.exports = { useError, useValidationError };
