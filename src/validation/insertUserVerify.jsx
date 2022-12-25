import * as Yup from 'yup';

const InsertUserVerify = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid Email')
    .required(' Username is required.'),

password: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
})
export default InsertUserVerify