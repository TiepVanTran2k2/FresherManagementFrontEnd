import * as yup from 'yup';
import {useFormik} from 'formik';
export const formik = useFormik({
    initialValues : 
    {
        subject : "",
        description:"",
        eventTime : "",
        reminderEmail: "",
    },
    onSubmit : values =>
    {
        
    }
})
export const createFormSchema = yup.object().shape({
    subject : yup.string().required(),
    description : yup.string().required(),
    eventTime : yup.date().required(),
    reminderEmail : yup.string().required()
})