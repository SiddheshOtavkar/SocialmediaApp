import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button, FormControlLabel, Radio, TextField } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router';

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" };

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("handle submit", values);

    dispatch(registerUserAction({ data: values }))
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  }

  return (
    <>
      <Formik onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className='space-y-5'>

          <div className='space-y-5'>

            <div className="mb-4">
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-gray-50 shadow-md"
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-gray-50 shadow-md"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-gray-50 shadow-md"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-gray-50 shadow-md"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center space-x-4">
              <RadioGroup
                onChange={handleChange}
                aria-labelledby="gender"
                row
                name="gender"
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
              </RadioGroup>
              <ErrorMessage
                name="gender"
                component={"div"}
                className="text-red-500 text-sm mt-1"
              />
            </div>

          </div>

          <Button
            sx={{
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              backgroundImage: "linear-gradient(to right, #4CAF50, #2196F3)",
              color: "white",
              fontWeight: "bold",
              transition: "background-image 0.3s ease",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #45a049, #1e87eb)",
              },
            }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>

        </Form>
      </Formik>

      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>Already have a account ?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  )
}

export default Register