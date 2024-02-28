const showPassword = false;
const isLoading = false;
const showAlert = false;
let alert = { msg: "", type: "" };
let userWallet = {};
let walletPayoutForm = { receiver: "", amount: "" };
let normalPayoutForm = { email: "", amount: "" };
const setWalletPayoutForm = jest.fn();
const setNormalPayoutForm = jest.fn();
const setAlert = jest.fn();
const setShowAlert = jest.fn();
const setIsLoading = jest.fn();
const setShowPassword = jest.fn();
const handleAlert = jest.fn();
const handlePayout = jest.fn();
const handleClickShowPassword = jest.fn();
const handleMouseDownPassword = jest.fn();
const handleChange = jest.fn();

const signupForm = {};
const signinForm = {};
const user = {};
const setUser = jest.fn();
const setSignupForm = jest.fn();
const setSigninForm = jest.fn();
const handleSignup = jest.fn();
const handleSignin = jest.fn();
const handleSignout = jest.fn();

const appValue = {
  showPassword,
  isLoading,
  showAlert,
  alert,
  userWallet,
  walletPayoutForm,
  normalPayoutForm,
  setWalletPayoutForm,
  setNormalPayoutForm,
  setAlert,
  setShowAlert,
  setIsLoading,
  setShowPassword,
  handleAlert,
  handlePayout,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleChange,
};

const authValue = {
  signupForm,
  signinForm,
  user,
  setUser,
  setSigninForm,
  setSignupForm,
  handleSignin,
  handleSignup,
  handleSignout,
};

export { appValue, authValue };
