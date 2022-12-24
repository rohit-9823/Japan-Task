// import CreateableSelect, { components } from "react-select/creatable";
import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik";
import { httpClient } from "../../constants/httpClient";
import useButtonLoader from "../../constants/btn_Loader";
import { Link, useHistory } from "react-router-dom";
// import "./insertrecord.scss";
import { notify } from "../../constants/notify";
import SignupVerify from "../../validation/signupVerify";
export default function Insertuser(props) {
  const [datas, setdatas] = useState({
    id: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loadings, setloadings] = useButtonLoader("Submit", "Submitting");
  const [propsavailable, setpropsavailable] = useState(false);
  const [propsdata, setpropsdata] = useState([]);
  const [filtervalue, setfiltervalue] = useState([]);
  const [showhide2, setshowhide2] = useState(false);
  const [showhide, setshowhide] = useState(false);

  const showhidePassword2 = () => {
    setshowhide2(!showhide2);
  };
  const showhidePassword = () => {
    setshowhide(!showhide);
  };

  useEffect(() => {
    checkProps();
    console.log(props);
  }, []);

  let history = useHistory();
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";
  let cls2 = showhide2 ? "fas fa-eye" : "fas fa-eye-slash";

  const checkProps = () => {
    if (props?.location?.state) {
      setpropsavailable(true);
      setdatas({
        username: props.location.state.username,
        password: props.location.state.password,
        id: props.location.state.id,
      });
      let get_Data = localStorage.getItem("UserDetails", []);
      let final_value = JSON.parse(get_Data);
      setpropsdata(final_value);
    }
  };

  const ref = useRef(null);

  return (
    <div className="details_user">
      <div className="heading_line">
        {propsavailable ? (
          <h2 className="text04">Edit User</h2>
        ) : (
          <h2 className="text04">User</h2>
        )}
      </div>

      <div className="buttons-line">
        <button className="btn-details">User Detail</button>

        <Link to="./viewuser">
          <button className="btn-details" id="btn-selected">
            User View
          </button>
        </Link>
      </div>

      <Formik
        // innerRef={ref}
        enableReinitialize
        initialValues={datas}
        // validationSchema={SignupVerify}
        onSubmit={async (value, { resetForm }) => {
          console.log(value);
          setloadings(true);
          let createUser = {
            username: value.username,
            password: value.password,
            confirmPassword: value.confirmPassword,
            state: true,
          };
          let old_Data;

          if(propsavailable)
{
    let filter_Data= propsdata.filter((values) => 
     values.id == value.id ? values.username=value.username && values.password==value.password:null
   )
   console.log(filter_Data);
   
}
else{
  (old_Data = JSON.parse(localStorage.getItem("UserDetails")));
  old_Data.push(createUser);
  localStorage.setItem("UserDetails", JSON.stringify(old_Data));
  // localStorage.setItem("UserDetails",JSON.stringify(registerDetails))
  notify.success("Account Created Successfully");
  setloadings(false);
  resetForm({ createUser: " " });
} 
          
        }}
      >
        {({ errors, touched }) => (
          // {/* Form started */}
          <Form className="createBody">
            <div className="pdf-pform">
              <div>
                <label>Username</label>
                <Field
                  name="username"
                  placeholder="Username"
                  className={`form-control shadow-none register-input ${
                    errors.username && touched.username && "is-invalid"
                      ? "redborder"
                      : null
                  } `}
                ></Field>
                {errors.username && touched.username ? (
                  <div className="error-message">{errors.username}</div>
                ) : null}
              </div>

              <div>
                <label>Password</label>

                <Field
                  name="password"
                  type={showhide ? "text" : "password"}
                  placeholder="Password"
                  className={`form-control shadow-none register-input ${
                    errors.password && touched.password && "is-invalid"
                      ? "redborder"
                      : null
                  } `}
                />
                <i class={cls} id="eyespan" onClick={showhidePassword}></i>

                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </div>
              {propsavailable ? null : (
                <div>
                  <label>Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type={showhide2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`form-control shadow-none register-input ${
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      "is-invalid"
                        ? "redborder"
                        : null
                    } `}
                  />
                  <i class={cls2} id="eyespan" onClick={showhidePassword2}></i>

                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-message">
                      {errors.confirmPassword}
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
