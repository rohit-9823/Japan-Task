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
import InsertUserVerify from "../../validation/insertUserVerify";
export default function Insertuser(props) {
  const [datas, setdatas] = useState({
    id: "",
    username: "",
    password: "",
  });
  const [loadings, setloadings] = useButtonLoader("Submit", "Submitting");
  const [propsavailable, setpropsavailable] = useState(false);
  const [propsdata, setpropsdata] = useState([]);
  const [showhide, setshowhide] = useState(false);

  const showhidePassword = () => {
    setshowhide(!showhide);
  };

  useEffect(() => {
    checkProps();
    console.log(props);
  }, []);

  let history = useHistory();
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";

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
        validationSchema={InsertUserVerify}
        onSubmit={async (value, { resetForm }) => {
          setloadings(true);
          

          let createUser = {
            id: parseInt(Date.now() * Math.random()).toString(),
            username: value.username,
            password: value.password,
          };

          let old_Data;
          let newvalue_obj;

          if (propsavailable) {
            let newdata = propsdata.map((values) =>
              values.id == value.id
                ? (newvalue_obj = {
                    id: datas.id,
                    username: value.username,
                    password: value.password,
                  })
                : values
            );
            localStorage.clear();
            localStorage.setItem("UserDetails", JSON.stringify(newdata));
            notify.success("Account Updated Successfully");
            setloadings(false);
            history.push('./viewuser')
          } else {
            old_Data = JSON.parse(localStorage.getItem("UserDetails"));
            // console.log("old dataa",old_Data);
            //  old_Data.map((values)=>
            //   values.username==createUser.username ? notify.error("err"))

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
