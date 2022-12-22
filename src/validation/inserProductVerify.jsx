import * as Yup from 'yup';

const InsertProductVerify = Yup.object().shape({
    title : Yup.string()
    .required("Title is required."),
  brand: Yup.string()
    .required("Brand is required."),
    description: Yup.string()
    .required("Description is required."),
    category: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required("Category is required."),
    discount: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Discount is required."),
    price: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Price is required."),
    rating: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Rating is required."),
  stock: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Stock is required."),
});

export default InsertProductVerify;

