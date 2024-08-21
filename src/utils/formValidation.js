function validationForm(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) {
    return "Email not valid";
  }
  if (!passwordRegex.test(password)) {
    return "Password not valid";
  }
  return null;
}
export default validationForm;
