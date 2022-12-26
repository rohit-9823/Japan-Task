import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik";
import { httpClient } from "../../constants/httpClient";
import useButtonLoader from "../../constants/btn_Loader";
import { Link, useHistory } from "react-router-dom";
import "../landingPage/insertrecord.scss"
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
  const [propsavailable, setpropsavailable] = useState(false);
  let history = useHistory();

  useEffect(() => {
  checkProps();
  }, []);

  const checkProps=()=>{
    
    if(props?.location?.state){
      setpropsavailable(true)
      setdatas({
        title: props.location.state.title,
      brand: props.location.state.brand,
      category: props.location.state.category,
      discount: props.location.state.discountPercentage,
      price: props.location.state.price,
      rating: props.location.state.rating,
      stock: props.location.state.stock,
      description: props.location.state.description,
      })
     }
    
  }
  

  
  return (
    <div className="details_user">
      <div className="heading_line">
        {propsavailable?
        <h2 className="text04">Edit Product</h2>
 :
        
        <h2 className="text04">Product</h2>
}
      </div>

      <div className="buttons-line">
        <button className="btn-details">Product Detail</button>

        <Link to="./viewproduct">
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

{propsavailable?
  httpClient
            .apiCall(createProduct, "PUT", `products/${props.location.state.id}`)
            .then((res) => {
              notify.success(`Record Successfully Updated`);
              console.log("Updated Record::::",res.data);
              setloadings(false);
              history.push('./viewproduct')
            })
             :
  
          httpClient
            .apiCall(createProduct, "POST", "products/add")
            .then((res) => {
              notify.success(`Record Successfully created`);
              setloadings(false);
              resetForm({ createProduct: " " });
            });
          }
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
