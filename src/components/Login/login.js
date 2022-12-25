import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Form, Formik,ErrorMessage,Field } from 'formik';
import * as yup from "yup"
import { useHistory } from 'react-router-dom';
import {httpClient} from "../../constants/httpClient"
import { notify } from '../../constants/notify';
import "./Loginstyle.css";
import Loginverify from "../../validation/loginVerify";
import useButtonLoader from "../../constants/btn_Loader";

import login_img from "../../assets/images/login.png"
function Login(props) {
  
  
  const [loadings, setloadings] = useButtonLoader("Login", "Loading");
  const [showhide, setshowhide] = useState(false);

  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const history = useHistory();

  useEffect(() => {

    

  }, []);
 
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";

  return (
    <div className="container login_container">
      <div class="wrapper login_wrapper">
        <div class="col-left">
          <div class="login-text">
            <img src={login_img} alt="" style={{color:'white',width:"100px"}}/>
            {/* <h2 class="login_h2">Logo</h2> */}
            
            <p className="login_p">
              Welcome to Cloco. A company that makes the world fun and convenient with IT technology and human power
            </p>
          </div>
        </div>
        <div class="col-right">
          <div class="login-form">
            <h2 class="login_h2">Login</h2>

            <Formik
              initialValues={{
                username: "",
                password: "",
                state: true,
              }}
              validationSchema={Loginverify}
              onSubmit={async (values) => {
                setloadings(true)
                let loginDetails = {
                  username: values.username,
                  password: values.password,
                    state: values.state,
                };  
                console.log(loginDetails.username);
                
                
                  // {localData.map((datas)=>{
                  //   if()
                  // })}


                let data=JSON.parse(localStorage.getItem("UserDetails"))
                var show_message=true
                if(data){
                  {data.map((local_value)=>{
                    
                    if(loginDetails.username==local_value?.username && loginDetails.password == local_value?.password){
                
                      notify.success("Login success")
                      setloadings(false)
                      history.push('./insertuser')
                      show_message=false
                                }
                  })}
                  if(show_message){
                                  notify.error("Invalid Credentials")
                                  setloadings(false)
                  }

                
              }
                else{
                  notify.error("Please create account")
                  setloadings(false)
                }
      


              }}
            >
              {({ errors, touched }) => (
                <Form autocomplete="off" novalidate>
                  {/* <!-- Main Row Started--> */}
                  <div class="row">
                    <div class="col-lg-12">
                      {/* <!-- First Row Started--> */}
                      <div class="row" style={{ marginBottom: "30px" }}>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <Field
                              name="username"
                              placeholder="Email address"
                              className={`form-control shadow-none ${
                                errors.username && touched.username && "is-invalid"
                              }`}
                            />
                            {errors.username && touched.username ? (
                              <div className="error-message">
                                {errors.username}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- First Row Ended--> */}

                  {/* <!-- Second Row Started--> */}
                  <div class="row" style={{ marginBottom: "30px" }}>
                    <div class="col-lg-12">
                      <div class="form-group">

                   

                        <Field
                          name="password"
                          type={showhide ? "text" : "password"}
                          placeholder="Password"
                          className={`form-control shadow-none ${
                            errors.password && touched.password && 'is-invalid'
                              ? "redborder"
                              : null
                          } `}
                        />
                        <i
                          class={cls}
                          id="errspan"
                          onClick={showhidePassword}
                        ></i>
                        {errors.password && touched.password ? (
                          <div className="error-message">{errors.password}</div>  
                        ) : null}
                      </div>
                    </div>
                  </div>

                    {/* First Row Ended */}

                  {/* // <!-- Button Started--> */}

                  <div
                    className="w-100 text-right"
                    style={{ margin: "10px 10px 10px 0px" }}
                  >

<button
                    //  onClick={()=>setloadings(true)}
                    
                    type="submit"
                    className="save-btn login-btn"
                    ref={loadings}
                  ></button>

                    
                  </div>
                  <div className="signup">
                  <p className="signup_p">Don't have an account yet? <b className="signup_create" onClick={()=>history.push('/register')}>Create one</b></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
