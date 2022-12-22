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
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,3})?$/, "Must be valid digits")
    .required("Discount is required."),
    price: Yup.string()
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,3})?$/, "Must be valid digits")
    .required("Price is required."),
    rating: Yup.string()
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,3})?$/, "Must be valid digits")
    .required("Rating is required."),
  stock: Yup.string()
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,3})?$/, "Must be valid digits")
    .required("Stock is required."),
});

export default InsertProductVerify;

