const validateEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

const valid = ({ fullName, username, email, password, cf_password }) => {
  const error = {};

  if (!fullName) {
    error.fullName = "Please add your full name.";
  } else if (fullName.length > 25) {
    error.fullName = "Full name is up to 25 characters long.";
  }

  if (!username) {
    error.username = "Please add your user name";
  } else if (username.replace(/ /g, "").length > 25) {
    error.username = "User name is up to 25 characters long.";
  }

  if (!email) {
    error.email = "Please add your email."
  } else if (!validateEmailFormat(email)) {
    error.email = "Email format is incorrect."
  }

  if (!password) {
    error.password = "Please add your Password";
  } else if (password.length < 6) {
    error.password = "Password must be to least 6 characters.";
  }

  if (password !== cf_password) {
    error.cf_password = "Confirm password did not match."
  }

  return {
    errorMessage: error,
    errorLength: Object.keys(error).length
  }
};

export default valid;
