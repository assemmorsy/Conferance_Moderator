const useError = (msg, status) => {
  let error = new Error(msg);
  error.status = status;
  return error;
}

const useValidationError = (errors) => {
  let errorMsgs = errors.array().reduce((msg, err) => {
    return msg + `${err.msg} at field ${err.param} / `;
  }, "")
  return useError(errorMsgs, 400);
}

module.exports = { useError, useValidationError };
