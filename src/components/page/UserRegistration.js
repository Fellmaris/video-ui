import * as Yup from 'yup';
import Container from "@mui/material/Container";
import {Button, CircularProgress, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import TextFieldInput from "../forms/TextFieldInput";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
    userName: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .required("Email is required")});

export default () => (
    <Formik initialValues={{
        userName: '',
        password: '',
        passwordConfirmation: '',
        email: ''
    }}
            onSubmit={(values, helpers)=>{
                console.log('values ', values);
                console.log('helpers ', helpers);

                helpers.setSubmitting(true);

                setTimeout(() => {
                    helpers.setSubmitting(false);
                }, 1000)}}
            validationSchema={validationSchema}>
        {
            props => (
                <Container disableGutters maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
                    <Paper elevation={3} sx={{py: 5, px:5}}>
                        <Form>
                            <TextFieldInput error={props.touched.userName && !!props.errors.userName}
                                            fieldName="userName" label="Username:"
                                            placeholder="Type username..."/>
                            <TextFieldInput error={props.touched.email && !!props.errors.email}
                                            fieldName="email" label="Email:"
                                            placeholder="Type email..."
                                            type = "email"/>
                            <TextFieldInput error={props.touched.password && !!props.errors.password}
                                            fieldName="password" label="Password:"
                                            placeholder="Type password..."
                                            type = "password"/>
                            <TextFieldInput error={props.touched.passwordConfirmation && !!props.errors.passwordConfirmation}
                                            fieldName="passwordConfirmation" label="Password confirmation:"
                                            placeholder="Type repeat password..."
                                            type = "password"/>
                            {
                                props.isSubmitting ? <div><CircularProgress size={30} /></div> : <Button type="submit" variant = "outlined" sx={{mt: 1}}>Submit</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )
        }
    </Formik>
)
