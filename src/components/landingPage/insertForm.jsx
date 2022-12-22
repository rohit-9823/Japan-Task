// import CreateableSelect, { components } from "react-select/creatable";
import React, { useEffect, useRef, useState } from "react";
// import Select from "react-select";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik";
import { httpClient } from "../../constants/httpClient";
// import { Roleverify } from "../../components/validation/roleVerify";
import useButtonLoader from "../../constants/btn_Loader";
// import { notify } from "../../constants/notify";
import { Link, useHistory } from "react-router-dom";
import "./insertrecord.scss";
import InsertRecord from "./outlayDesign";
import { BrandingWatermark, DiscFullOutlined } from "@material-ui/icons";
import { RotatingLines } from "react-loader-spinner";
import { notify } from "../../constants/notify";
import InsertProductVerify from "../../validation/inserProductVerify";
export default function Insertform(props) {
  const [datas, setdatas] = useState({
    title: "",
    brand: "",
    category: "",
    discount: "",
    price: "",
    rating: "",
    stock: "",
    description: "",
  });
  const [loadings, setloadings] = useButtonLoader("Submit", "Submitting");
  const [propsavailable, setpropsavailable] = useState();
  const [images, setimages] = useState([]);
  const [Imagevalue, setImagevalue] = useState([]);
  const [reader, setreader] = useState([]);
  let history = useHistory();

  useEffect(() => {
  
  }, []);

  
  const ref = useRef(null);

  const handeimage = (event, allvalues) => {
    setimages(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];
    setImagevalue(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setreader({ preview: reader.result });
    };
    reader.readAsDataURL(file);

    // setimages(URL.createObjectURL(event.target.files[0]));
    // let files = event.target.files[0];
    // setImagevalue(files);
  };

  return (
    <div className="details_user">
      <div className="heading_line">
        <h2 className="text04">Product</h2>
      </div>

      <div className="buttons-line">
        <button className="btn-details">Product Detail</button>

        <Link to="./viewuser">
          <button className="btn-details" id="btn-selected">
            Product View
          </button>
        </Link>
      </div>

      <Formik
        // innerRef={ref}
        enableReinitialize
        initialValues={datas}
        validationSchema={InsertProductVerify}
        onSubmit={async (value, { resetForm }) => {
          setloadings(true);

          let createProduct = {
            title: value.title,
            brand: value.brand,
            description: value.description,
            category: value.category,
            discount: value.discount,
            price: value.price,
            rating: value.rating,
            stock: value.stock,
          };

          httpClient
            .apiCall(createProduct, "POST", "products/add")
            .then((res) => {
              notify.success(`Record Successfully created`);
              setloadings(false);
              resetForm({ createProduct: " " });
            });
        }}
      >
        {({ errors, touched }) => (
          // {/* Form started */}
          <Form className="createBody">
            <div className="pdf-pform">
              <div>
                <label>Title</label>
                <Field
                  name="title"
                  className="pdf-input"
                  placeholder="Title"
                ></Field>
                {errors.title && touched.title ? (
                  <div className="error-message">{errors.title}</div>
                ) : null}
              </div>
              {propsavailable ? null : (
                <div>
                  <label>Brand</label>
                  <Field
                    name="brand"
                    className="pdf-input"
                    placeholder="Brand"
                  ></Field>
                  {errors.brand && touched.brand ? (
                    <div className="error-message">{errors.brand}</div>
                  ) : null}
                  
                </div>
              )}
              <div>
                <label>Description</label>
                <Field
                  name="description"
                  className="pdf-input"
                  placeholder="Description"
                ></Field>
                {errors.description && touched.description ? (
                  <div className="error-message">{errors.description}</div>
                ) : null}
              </div>
            </div>
            <div className="pdf-pform">
              <div>
                <label>Category</label>
                <Field
                  name="category"
                  className="pdf-input"
                  placeholder="Category"
                ></Field>
                {errors.category && touched.category ? (
                  <div className="error-message">{errors.category}</div>
                ) : null}
              </div>
              {propsavailable ? null : (
                <div>
                  <label>Discount</label>
                  <Field
                    name="discount"
                    className="pdf-input"
                    placeholder="Discount"
                  ></Field>
                  {errors.discount && touched.discount ? (
                    <div className="error-message">{errors.discount}</div>
                  ) : null}
                </div>
              )}
              <div>
                <label>Price</label>
                <Field
                  name="price"
                  className="pdf-input"
                  placeholder="Price"
                ></Field>
                {errors.price && touched.price ? (
                  <div className="error-message">{errors.price}</div>
                ) : null}
              </div>
            </div>
            <div className="pdf-pform">
              <div>
                <label>Rating</label>
                <Field
                  name="rating"
                  className="pdf-input"
                  placeholder="Rating"
                ></Field>
                {errors.rating && touched.rating ? (
                  <div className="error-message">{errors.rating}</div>
                ) : null}
              </div>
              {propsavailable ? null : (
                <div>
                  <label>Stock</label>
                  <Field
                    name="stock"
                    className="pdf-input"
                    placeholder="Stock"
                  ></Field>
                  {errors.stock && touched.stock ? (
                    <div className="error-message">{errors.stock}</div>
                  ) : null}
                </div>
              )}
              {/* <div>
                        <label>Thumbnail</label>
                        <input type="file" name="thumbnail" id="" 
                        required
                        onChange={(event) => (
                          handeimage(
                            event,
                            allvalues
                          )
                        )}
                        />
                        {images.length!=0?
                        <img src={images} alt="" className="imageload" />
                        :null}
                        {errors.description && touched.description ? (
                          <div className="error-message">
                            {errors.description}
                          </div>
                        ) : null}
                      </div> */}
            </div>
            <div className="cu-sbutton">
              <button
                //  onClick={handlesubmit}
                type="submit"
                className="save-btns"
                ref={loadings}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
