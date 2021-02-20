export const formValidatorHelper = values => {

  const errors = {};

  if (!values.userName) {
    errors.userName = "user name is required";
  }
  if (!values.password) {
    errors.password = "password is required";
  } else if (values.password.length < 6) {
    errors.password = "password should be with min 6 characters";
  } else if (values.password.length > 20) {
    errors.password = "password should be with max 20 characters";
  }

  console.log(errors);
  return errors;
};