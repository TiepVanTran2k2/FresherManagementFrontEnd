import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Autocomplete} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";

const listAttendanceStatus = [
    { id: 0, label: "Present" },
    { id: 1, label: "Absent" },
    { id: 2, label: "Late Coming" },
    { id: 3, label: "Early Leaving" },
    { id: 4, label: "Absent With No Permission" },
    { id: 5, label: "Late Comming With No Permission" },
    { id: 6, label: "Early Leaving With No Permission" },
  ];
function RequestAttendance() {
  const [startDate, setStartDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [newStatusAttendance1, setNewStatusAttendance1] = useState();

  const [endDate, setEndDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [name, setName] = React.useState("Cat in the Hat");

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <>
    <h1>Create request</h1>
      <Box style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Box noValidate autoComplete="off">
          <Box>
            
                <TextField
                sx={{marginBottom:"16px"}}
                  id="outlined-name"
                  label="Reason"
                  value={name}
                  fullWidth
                  onChange={handleChange}
                />
            
                <TextField
                  id="outlined-uncontrolled"
                  label="Uncontrolled"
                  fullWidth
                  defaultValue="foo"
                />
            
          </Box>

          <Autocomplete
          style={{margin:"20px 0"}}
                value={listAttendanceStatus.find(
                  (e) => newStatusAttendance1 === e.id
                )}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => {
                  setNewStatusAttendance1(value.id);
                }}
                disableClearable
                id="free-solo-demo"
                options={listAttendanceStatus}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Status 1" />
                )}
              />

          <Box sx={{ margin: "20px 0" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/dd/yyyy"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Detail Reason"
          multiline
          maxRows={4}
          value={name}
          onChange={handleChange}
        />
        <Box style={{ margin: "10px 0" }}>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
    
}

export default RequestAttendance;
