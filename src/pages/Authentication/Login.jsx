import { Formik } from 'formik';
import * as Yup from "yup";
import { Form } from 'formik';
import { Field } from 'formik';
import { Button, TextField } from '@mui/material';
import { ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUserAction } from './../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router';

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({ data: values }))
  };

  return (
    <>
      <Formik onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className='space-y-5'>

          <div className='space-y-5'>
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
            Login
          </Button>

        </Form>
      </Formik>

      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you don't have account ?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  )
}

export default Login