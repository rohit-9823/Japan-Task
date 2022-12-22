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
import "./insertrecord.scss"
import InsertRecord from "./outlayDesign";
export default function Insertform(props) {
  const [datas, setdatas] = useState({
    username: "",
    description: "",
    screenId: "",
  });
  const [screens, setscreens] = useState([]);
  const [editoption, seteditoption] = useState([]);
  const [multipleScreen, setmultipleScreen] = useState([]);
  const [demo2, setdemo2] = useState([]);
  const [editvalue, seteditvalue] = useState([]);
  const [loadings, setloadings] = useButtonLoader("Submit", "Submitting");
  const [propsavailable, setpropsavailable] = useState();
  let history = useHistory();
//   const getRole = () => {
//     {
//       props.location.state
//         ? httpClient
//             .GET("api/role/get-all/screens", false, true)
//             .then((res) => {
//               // console.log(res);
//               let id = props.location.state.screen;
//               let data = res.data.data.filter(
//                 (values) => !id.includes(values.id)
//               );
//               // console.log("data", data);
//               let newValue = data.map((values) => {
//                 return {
//                   value: values.id,
//                   label: values.name,
//                 };
//               });
//               seteditoption(newValue);
//               let showingData =props.location.state.screenName.map((value)=>{
//               return {
//                 value:value,
//                 label:value,
//               };  
//             })
//             seteditvalue(showingData)
//               // return {
//               //   value: values.id,
//               //   label: values.name,
//               // };
//               // let data2=editvalue.filter((dataa)=>dataa.label==data)
//               // // console.log(data);
//               // // console.log(data2);
//               // setscreens(data);
//             })
//         : httpClient
//             .GET("api/role/get-all/screens", false, true)
//             .then((res) => {
//               // console.log(res);
//               let data = res.data.data.map((values) => {
//                 return {
//                   value: values.id,
//                   label: values.name,
//                 };
//               });
//               setscreens(data);
//             });
//     }
//   };
  useEffect(() => {
    
    
  }, []);

  const ref = useRef(null);

  return (
    <div className="details_user">
      
      <div className="heading_line">
        <h2 className="text04">User</h2>
      </div>

      <div className="buttons-line">
        
          <button className="btn-details">User Detail</button>
        
        <Link to="../viewuser">
        <button className="btn-details" id="btn-selected">
          User View
        </button>
        </Link>
      </div>
      
          <Formik
            innerRef={ref}
            enableReinitialize
            initialValues={datas}
            // validationSchema={Roleverify}
            onSubmit={async (value, { resetForm }) => {
              setloadings(true);
              let createUser = {
                username: value.username,
                description: value.description,
              };
              console.log(value);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                // {/* Form started */}
                <Form className="createBody">
                  <div className="pdf-pform">
                    <div>
                      <label>User Name</label>
                      <Field
                        name="username"
                        className="pdf-input"
                        placeholder="Username"
                      ></Field>
                      {errors.username && touched.username ? (
                        <div className="error-message">{errors.username}</div>
                      ) : null}
                    </div>
                    {propsavailable ? null : (
                      <div>
                        <label>Description</label>
                        <Field
                          name="description"
                          className="pdf-input"
                          placeholder="Description"
                        ></Field>
                        {errors.description && touched.description ? (
                          <div className="error-message">
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                    )}

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
