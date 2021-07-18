import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SigninElements";
import Storage from '../../tokenStorage.js';

const SignIn = () => {
  const [message, setMessage] = useState("");

  //required files
  var bp = require("../Path.js");

  //variables used to login
  var LoginName;
  var LoginPassword;
  var Acc;

  // doLogin just a login function
  const doLogin = async (event) => {
    event.preventDefault();

    //JSON OBJECT
    var obj = { username: LoginName.value, password: LoginPassword.value };
    var js = JSON.stringify(obj);

    //Making a Payload
    var config = {
      method: "post",
      url: bp.buildPath("api/account/login"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };

    //Sending Payload to the server
    axios(config)
      .then(function (response) {
        var res = response.data;

        if (res.err_Code) {
          //Error Message
          setMessage(res.description);
        } else {
          Storage.storeToken(res);
          Acc = res.role;

          //Go to the user Window
          if (Acc === 'guest') {
            window.location.href = "/guest";
          }
          if (Acc === 'employee') {
            window.location.href = "/employee";
          }
          if (Acc === 'admin') {
            window.location.href = "/admin";
          }
        }


      })
      .catch(function (error) {
        //Error function to show error as consol logs
        setMessage(" " + error);
      });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">CyberHotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor="for">Username</FormLabel>
              <FormInput type="text" required ref={(c) => LoginName = c} />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput type="password" required ref={(c) => LoginPassword = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" class="button" onClick={doLogin}>Continue</FormButton>
              <br />
              <p classname="forgot-password text-right">
                <Link to={"/resetpassword"}>Forgot password?</Link>
              </p>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
