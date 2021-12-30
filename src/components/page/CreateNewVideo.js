import {Form, Formik} from "formik";
import {
    CircularProgress,
    Button, Paper, Alert
} from "@mui/material";
import * as Yup from 'yup';
import TextFieldInput from "../forms/TextFieldInput";
import Container from "@mui/material/Container";
import {createVideo, uploadVideo} from "../api/videoApi";
import {useState} from "react";
import HTTP from "../api/index";


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Value must be greater than 5')
        .max(30, 'Value must be less than 30')
        .required('Name is a required field'),
    category: Yup.string()
        .required('Category is a required field'),
    description: Yup.string()
        .max(300, 'Value must be less than 300')
        .required('Description is a required field'),
    videofile: Yup.mixed()
        .required('Video is required'),
    imagefile: Yup.mixed()
        .required('Thumbnail is required')
});

export default () => {
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});

    const uploadVideo = (file) => {
        let formData = new FormData();
        formData.append('videofile', file)
        return HTTP.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    const uploadImage = (file) => {
        let formData = new FormData();
        formData.append('imagefile', file)
        return HTTP.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const onUploadVideo = (file) => {
        uploadVideo(file)
            .then(() => console.log('success'));
    }
    const onUploadImage = (file) => {
        uploadImage(file)
            .then(() => console.log('success'));
    }

    const createObjects = (file, helpers) => {
        var videoUrl = file.videofile;
        var videoFileName = videoUrl.substring(videoUrl.lastIndexOf('\\') + 1);
        var imageUrl = file.imagefile;
        var imageFileName = imageUrl.substring(imageUrl.lastIndexOf('\\') + 1);


        let video = {
            name: file.name,
            category: file.category,
            description: file.description,
            videofilename: videoFileName,
            imagefilename: imageFileName
        };

        createVideo(video)
            .then(({status}) => {
                if (status === 201) {
                    setNotification({isVisible: true, message: 'Video created successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch(() => setNotification({isVisible: true, severity: 'error', message: 'Something went wrong'}))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik initialValues={{
            name: '',
            category: '',
            description: '',
            videofile: '',
            imagefile: ''
        }}
                onSubmit={createObjects}
                validationSchema={validationSchema}>
            {
                props => (
                    <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                        <Paper elevation={3} sx={{py: 5, px: 5}}>
                            {
                                notification.isVisible &&
                                <Alert severity={notification.severity} sx={{width: '100%'}}>
                                    {notification.message}
                                </Alert>
                            }

                            <Form className="video-input-padding-x" autoComplete="off">
                                <TextFieldInput error={props.touched.name && !!props.errors.name}
                                                fieldName="name" label="Name:"
                                                placeholder="Type name..."
                                />
                                <TextFieldInput error={props.touched.category && !!props.errors.category}
                                                fieldName="category"
                                                label="Category:"
                                                placeholder="Type category..."
                                />
                                <TextFieldInput error={props.touched.description && !!props.errors.description}
                                                fieldName="description"
                                                label="Description:"
                                                placeholder="Type description..."
                                                multiline
                                                rows={3}
                                />
                                <TextFieldInput error={props.touched.videofile && !!props.errors.videofile}
                                                type="file"
                                                fieldName="videofile"
                                                onSubmit={(event) => {
                                                    onUploadVideo(event.currentTarget.files[0]);
                                                }}
                                />
                                <TextFieldInput error={props.touched.imagefile && !!props.errors.imagefile}
                                                type="file"
                                                fieldName="imagefile"
                                                onSubmit={(event) => {
                                                    onUploadImage(event.currentTarget.files[0]);
                                                }}
                                />


                                {
                                    props.isSubmitting ? <div><CircularProgress size={30}/></div> :
                                        <Button type="submit" variant="outlined" sx={{mt: 1}}>Submit</Button>
                                }
                            </Form>
                        </Paper>
                    </Container>
                )
            }
        </Formik>
    )
}