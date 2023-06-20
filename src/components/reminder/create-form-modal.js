import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { httpGet, httpPost } from '../../helpers/fetchHelper';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const subjectTextInput = React.useRef("");
  const descriptionTextInput = React.useRef("");
  const eventTimeTextInput = React.useRef("");
  const reminderEmailTextInput = React.useRef("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues:
    {
      subject: "[Remind]",
      description: "",
      eventTime: "",
      reminderEmail: "",
      reminderType : 0,
    },
    validationSchema : yup.object().shape({
      subject: yup.string().required('Required'),
      description: yup.string().required('Required'),
      eventTime: yup.date().required('Please choose event time'),
      reminderEmail: yup.string().required('Required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email")
    }),
    onSubmit:async  (reminder, {resetForm}) => {
    
     await  httpPost(`Reminders/CreateReminder`, reminder)
        .then(res => {
          reminder.id = res.data.id;
          reminder.reminderTime1 = res.data.reminderTime1;
          reminder.reminderTime2 = res.data.reminderTime2;
          props.onModalFormSubmit(reminder);
          subjectTextInput.current.value = "";
          descriptionTextInput.current.value = "";
          eventTimeTextInput.current.value = "";
          reminderEmailTextInput.current.value = "";
          alert("Create new reminder is success ")
          resetForm();
        })
       
      setOpen(false);
    }
    
  })


  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>
      <Button 
      variant="outlined" onClick={handleClickOpen}>
        Create New Remind
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >{"Input Yours Remind Information"}<hr /></DialogTitle>
        <DialogContent full>
          <form>
            <InputLabel sx={{fontWeight : "bold"}} size="normal" id="subject">Subject</InputLabel>
            <TextField             
              error={formik.errors.subject ? true : false}
              autoFocus
              margin="dense"
              id="subject"
              label="Subject"
              hintText="Subject...."
              type="text"
              inputRef={subjectTextInput}
              fullWidth
              value = {formik.values.subject}
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.subject && formik.errors.subject}
            />
            <InputLabel id="reminderDescription" margin='normal'>Description</InputLabel>
            <TextField
              error={formik.errors.description ? true : false}
              autoFocus
              margin='dense'
              id="description"
              label="Enter description"
              type="text"
              inputRef={descriptionTextInput}
              value = {formik.values.description}
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.description && formik.errors.description}
            />
            <InputLabel id="reminderEventTime" margin='normal'>Event time</InputLabel>
            <TextField
              error={formik.errors.eventTime ? true : false}
              autoFocus
              margin='dense'
              id="eventTime"
              type="datetime-local"
              inputRef={eventTimeTextInput}
              value = {formik.values.eventTime}
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.eventTime && formik.errors.eventTime}
            />

            <InputLabel id="reminderTo" margin="normal">Reminder to</InputLabel>
            <TextField
              error={formik.errors.reminderEmail ? true : false}
              autoFocus
              margin="dense"
              id="reminderEmail"
              label="Reminder to email"
              hintText="example@gmail.com"
              type="text"
              inputRef={reminderEmailTextInput}
              value = {formik.values.reminderEmail}
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              helperText={formik.errors.reminderEmail && formik.errors.reminderEmail}
            />

            <InputLabel id="type-select-label" margin="normal">Type of reminder</InputLabel>
            <div style={{ display: 'flex' }}>
              <Select
                sx={{
                  width: "60%"
                }}
                labelId="type-select-label"
                id="reminderType"
                value={formik.values.reminderType}
                label="Type of reminder"
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>Audit</MenuItem>
                <MenuItem value={1}>Contract Transfer</MenuItem>
                <MenuItem value={2}>Custom</MenuItem>
              </Select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} >Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}