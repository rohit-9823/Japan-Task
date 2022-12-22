import * as Yup from 'yup';

const Loginverify = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid Email')
    .required(' Email is required.'),
password: Yup.string()
    .required(' Password is required.'),
});

export default Loginverify;
