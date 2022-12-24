import { React, useState,useEffect} from "react";
import { Formik,ErrorMessage,Form,Field} from 'formik';
import SignupVerify from "../../validation/signupVerify";
import useButtonLoader from "../../constants/btn_Loader";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import { useHistory } from "react-router-dom";
import "./register.css";
import { notify } from "../../constants/notify";


function Register(props) {

  const [loadings, setloadings] = useButtonLoader("Sign up", " ");
  const [showhide, setshowhide] = useState(false);
  const [showhide2, setshowhide2] = useState(false);

  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const showhidePassword2 = () => {
    setshowhide2(!showhide2);
  };

  const history = useHistory();
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";
  let cls2 = showhide2 ? "fas fa-eye" : "fas fa-eye-slash";
  
  return (
    <div className="body">
      {/* // Formik Started */}
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          state: true,
        }}
        validationSchema={SignupVerify}
        onSubmit={async (values) => {
          
          let registerDetails = {
            id:parseInt(Date.now() * Math.random()).toString(),
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
            state: values.state,
          };
          console.log(registerDetails);
          if(!localStorage.getItem("UserDetails")){
localStorage.setItem("UserDetails",'[]')            
          }
          var old_Data= JSON.parse(localStorage.getItem("UserDetails"))
          old_Data.push(registerDetails);
          localStorage.setItem("UserDetails",JSON.stringify(old_Data))
          // localStorage.setItem("UserDetails",JSON.stringify(registerDetails))
          notify.success("Account Created Successfully")
          history.push('./');
        }}
      >
        {({ errors, touched }) => (
          // Formik form started
          <Form autocomplete="off" novalidate>
            <div className="content">
              <div class="logo"><img src='https://cloco.co.jp/img/logo.svg'/></div>

              <div class="register_content">
                {/* Upper Display Part */}
                <p class="register-register">Sign up</p>
                {/* Form Started */}
                {/* Username Form Started */}
                <Field
                  name="username"
                  placeholder="Email Address"
                  className={`form-control shadow-none register-input ${
                    errors.username && touched.username && "is-invalid"
                  }`}
                />


                {errors.username && touched.username ? (
                  <div className="error-message">{errors.username}</div>
                ) : null}

                {/* Username form ended */}
                {/* password form started */}

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
                {/* password form ended */}
                {/* Confirm password form Started */}
                
                <Field
                  name="confirmPassword"
                  type={showhide2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`form-control shadow-none register-input ${
                    errors.confirmPassword && touched.confirmPassword && "is-invalid"
                      ? "redborder"
                      : null
                  } `}
                />
                <i class={cls2} id="eyespan" onClick={showhidePassword2}></i>

                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="error-message">{errors.confirmPassword}</div>
                ) : null}
                {/* Confirm password form Ended */}


                <button
                    //  onClick={()=>setloadings(true)}
                    
                    type="submit"
                    className="register-btn"
                    ref={loadings}
                  ></button>

                {/*Form ended */}
              </div>
              <div className="register-text-bottom">Use the application according to the policy rules. Any kind of violations will be subjected to sanctions.</div>
            </div>
          </Form>
          // Formik form ended
        )}
      </Formik>
      {/* Formik ended */}
    </div>
  );
}

export default Register;
