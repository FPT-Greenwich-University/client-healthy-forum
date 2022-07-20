import HealthyFormWebApi from "../HealthyFormWebApi";

// Auth

/**
 * Register new account
 */
const Register = (formRegister) => {
  return HealthyFormWebApi().post("/register", formRegister);
};

const Login = (formData) => {
  return HealthyFormWebApi().post("/login", formData);
};

const GoogleLogin = (formData) => {
  return HealthyFormWebApi().post("/login/google", formData);
};

/**
 * User logout the backend api
 */
const Logout = () => {
  return HealthyFormWebApi().post("/logout");
};

/**
 * User get auth profile
 */
const GetAuthProfile = () => {
  return HealthyFormWebApi().get("/user");
};

/**
 * User update profile
 * @param formData
 */
const UpdateProfile = (userId, formData) => {
  return HealthyFormWebApi().put(`/users/${userId}/profiles`, formData);
};

/**
 * Send mail reset password
 * @param  formData
 */
const ForgotPassword = (formData) => {
  return HealthyFormWebApi().post("/forgot-password", formData);
};

/**
 * Reset password
 *
 * @param formResetPassword
 */
const ResetPassword = (formResetPassword) => {
  return HealthyFormWebApi().put("/reset-password", formResetPassword);
};

const SendMailVerifyAccount = (email) => {
  return HealthyFormWebApi().post("/email/verification-notification", {
    email: email,
  });
};

/**
 * Handle Update status Verify Account
 */
const VerifyAccount = (formData) => {
  return HealthyFormWebApi().put(`/verify-account`, formData);
};

const UpdatePassword = (userId, formData) => {
  return HealthyFormWebApi().put(`/users/${userId}/passwords`, formData);
};

export {
  Register,
  Login,
  GoogleLogin,
  Logout,
  GetAuthProfile,
  UpdateProfile,
  ForgotPassword,
  ResetPassword,
  VerifyAccount,
  SendMailVerifyAccount,
  UpdatePassword,
};
