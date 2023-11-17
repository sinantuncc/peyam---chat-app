const formValidate = ({ username, email, password, confirmPassword }) => {
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 20) return 'Username cannot be more 20 characters';
  if (!validateUsername(username))
    return 'Username must start with a letter and can only contain letters, numbers and underscore.';

  const checkEmailLength = email.split('@')[0].length;
  if (checkEmailLength < 3)
    return 'Email username must be at least 3 characters';
  if (checkEmailLength > 30)
    return 'Email username cannot be more 30 characters';
  if (email.length > 50) return 'Email cannot be more 50 characters';
  if (!validateEmail(email)) return 'Invalid Email';

  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password.length > 50) return 'Password cannot be more 50 characters';
  if (password !== confirmPassword) return "Confirm password don't match";
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateUsername(username) {
  const re = /^([a-zA-Z])[a-zA-Z0-9_]+$/i;
  return re.test(username);
}

export function validateFullname(fullName) {
  const re = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
  return re.test(fullName);
}

export function validatePhoneNumber(phone) {
  const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  return re.test(phone);
}

export default formValidate;
