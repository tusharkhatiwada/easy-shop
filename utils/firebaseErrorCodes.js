export default function firebaseError(code) {
  console.log("===Code===", code);
  let errorMessage = "";
  switch (code.substr(5)) {
    case "ERROR_EMAIL_ALREADY_IN_USE":
    case "account-exists-with-different-credential":
    case "email-already-in-use":
      errorMessage = "Email already used. Go to login page.";
      break;
    case "ERROR_WRONG_PASSWORD":
    case "wrong-password":
      errorMessage = "Wrong email/password combination.";
      break;
    case "ERROR_USER_NOT_FOUND":
    case "user-not-found":
      errorMessage = "No user found with this email.";
      break;
    case "ERROR_USER_DISABLED":
    case "user-disabled":
      errorMessage = "User disabled.";
      break;
    case "ERROR_TOO_MANY_REQUESTS":
    case "operation-not-allowed":
      errorMessage = "Too many requests to log into this account.";
      break;
    case "ERROR_OPERATION_NOT_ALLOWED":
    case "operation-not-allowed":
      errorMessage = "Server error, please try again later.";
      break;
    case "ERROR_INVALID_EMAIL":
    case "invalid-email":
      errorMessage = "Email address is invalid.";
      break;
    default:
      errorMessage = "Login failed. Please try again.";
      break;
  }
  return errorMessage;
}
