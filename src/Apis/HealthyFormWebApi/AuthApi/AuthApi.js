import HealthySocialWebApi from "../HealthySocialWebApi";

// Auth

/**
 * Register new account
 */
const Register = (formRegister) => {
  return HealthySocialWebApi().post("/register", formRegister);
};

const Login = (formData) => {
  return HealthySocialWebApi().post("/login", formData);
};

const GoogleLogin = (formData) => {
  return HealthySocialWebApi().post("/login/google", formData);
};

/**
 * User logout the backend api
 */
const Logout = () => {
  return HealthySocialWebApi().post("/logout");
};

/**
 * User get auth profile
 */
const GetAuthProfile = () => {
  return HealthySocialWebApi().get("/user");
};

/**
 * User update profile
 * @param formData
 */
const UpdateProfile = (userId, formData) => {
  return HealthySocialWebApi().put(`/users/${userId}/profiles`, formData);
};

/**
 * Send mail reset password
 * @param  formData
 */
const ForgotPassword = (formData) => {
  return HealthySocialWebApi().post("/forgot-password", formData);
};

/**
 * Reset password
 *
 * @param formResetPassword
 */
const ResetPassword = (formResetPassword) => {
  return HealthySocialWebApi().put("/reset-password", formResetPassword);
};

const SendMailVerifyAccount = (email) => {
  return HealthySocialWebApi().post("/email/verification-notification", {
    email: email,
  });
};

/**
 * Handle Update status Verify Account
 */
const VerifyAccount = (formData) => {
  return HealthySocialWebApi().put(`/verify-account`, formData);
};

const UpdatePassword = (userId, formData) => {
  return HealthySocialWebApi().put(`/users/${userId}/passwords`, formData);
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
