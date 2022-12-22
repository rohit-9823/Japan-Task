import * as Yup from 'yup';

const SignupVerify = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid Email')
    .required(' Email is required.'),

password: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password must and should match'),
})
export default SignupVerify; 