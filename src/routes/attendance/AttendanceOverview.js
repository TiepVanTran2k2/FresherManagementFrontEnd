import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import QRCode from "qrcode";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { httpGet, httpPost } from "../../helpers/fetchHelper";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function AttendanceOverview() {
  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "accountName",
      headerName: "Account",

      width: 150,
      renderCell: (params) => (
        <Link
          to={{
            pathname: "/detail-attendance",
            state: {
              id: params.row.id,
              accountName: params.row.accountName,
            },
          }}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Chip
            label={params.value}
            variant="outlined"
            color="warning"
            style={{ cursor: "pointer" }}
          />
        </Link>
      ),
    },
    {
      field: "attendances",
      headerName: "Attendances",
      width: 150,
      hide: true,
    },
    {
      field: "p",
      headerName: "Present",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" , fontWeight:600}}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 0).length +
              params.row.attendances.filter((x) => x.status2 === 0).length}
          </div>
        </div>
      ),
    },
    {
      field: "an",
      headerName: "Absent With No Permission",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", fontWeight:600 }}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 4).length +
              params.row.attendances.filter((x) => x.status2 === 4).length}
          </div>
        </div>
      ),
    },

    {
      field: "a",
      headerName: "Absent",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" , fontWeight:600}}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 1).length +
              params.row.attendances.filter((x) => x.status2 === 1).length}
          </div>
        </div>
      ),
    },
    {
      field: "l",
      headerName: "Late Coming",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" , fontWeight:600}}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 2).length +
              params.row.attendances.filter((x) => x.status2 === 2).length}
          </div>
        </div>
      ),
    },
    {
      field: "e",
      headerName: "Early Coming",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" , fontWeight:600}}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 3).length +
              params.row.attendances.filter((x) => x.status2 === 3).length}
          </div>
        </div>
      ),
    },
    {
      field: "ln",
      headerName: "Late Coming With No Permission",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", fontWeight:600}}>
          <div>
            {params.row.attendances.filter((x) => x.status1 === 5).length +
              params.row.attendances.filter((x) => x.status2 === 5).length}
          </div>
        </div>
      ),
    },
    {
      field: "en",
      headerName: "Early Coming With No Permission",
      width: 100,
      renderCell: (params) => (
        <strong sx={{ padding: "10px" , fontWeight:600}}>
          {params.row.attendances.filter((x) => x.status1 === 6).length +
            params.row.attendances.filter((x) => x.status2 === 6).length}
        </strong>
      ),
    },
    {
      field: "xem",
      headerName: "",
      width: 280,
      renderCell: (params) => (
        <Link
          to={{
            pathname: "/detail-attendance",
            state: {
              id: params.row.id,
              accountName: params.row.accountName,
            },
          }}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Button variant="outlined" color="success" sx={{ width: "100px" , fontWeight:600 }}>
            Detail
          </Button>
        </Link>
      ),
    },
  ];
  const [listAttendance, setListAttendance] = useState([]);
  const location = useLocation();
  const classId = location.state.id;
  const classCode = location.state.classCode;
  const [date, setDate] = useState(new Date());
  const [linkQR, setLinkQR] = useState("");
  const [time, setTime] = useState(5);
  const [type, setType] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const urlGet = `Attendance/ListAttendanceOfFresherByClass`;
  const urlPost = `Attendance/CreateLinkAttendanceClass`;

  console.log(linkQR);
  useEffect(() => {
      (async () => {
        var data = {
          id : classId,
          month : date.getMonth() + 1,
          year : date.getFullYear()
        };
        var response = await httpGet(
          urlGet,
          data
        );
        setListAttendance(response.data);
      })();
  }, [date]);

  useEffect(() => {
     QRCode.toDataURL(linkQR).then(setLinkQR);
  }, [linkQR]);

  const handleGenerateQRCode = async () => {
    const data = {
      classId: classId,
      expiredLinkMinutes: time,
      typeAttendance: type,
    };
    await httpPost(
        urlPost,
        data
      )
      .then((response) => {
        setOpen(true);
        setLinkQR(response.data);
        setIsLoading(true)
        setTimeout(() => {setIsLoading(false)}, 1000) 
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  //setup Dialog Component
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ marginLeft: "3%", padding: "10px" }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/attendances"
            >
              Class
            </a>
          </li>
          <li className="breadcrumb-item">
            <a  href="/overview-attendance">List Attendance</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Detail
          </li>
        </ol>
      </nav>
   
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <h2 style={{ textTransform: "uppercase" }}>{classCode}</h2>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleGenerateQRCode}
              sx={{ width: "90px", height: "54px" }}
            >
              QR
            </Button>
            <FormControl sx={{ m: 1, minWidth: 136 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Time
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={time}
                onChange={handleChange}
                autoWidth
                label="Age"
              >
                <MenuItem value={5}>5 minutes</MenuItem>
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={20}>20 minutes</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 20 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={type}
                onChange={handleChangeType}
                autoWidth
                label="Type"
              >
                <MenuItem value={1}>Morning</MenuItem>
                <MenuItem value={2}>Afternoon</MenuItem>
              </Select>
            </FormControl>           
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}         
            >
               {isLoading ? 
               < DialogContent dividers >
                  <CircularProgress  color="success"/>           
               </DialogContent> :
              <>
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Scan QR Code Attendance Here !
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>               
                  <Box>
                    {linkQR !== "" ?
                      <img id="qr-gen" src={linkQR } style={{ width: "350px", height: "350px" , margin : '0px 30px'}} />         
                    : <CircularProgress color="success" />}
                  </Box>
                </Typography>
              </DialogContent>
              <DialogActions>                            
                <Button style={{margin: 'auto', display: "flex"}}>
                <a download="QR-Code.png"  href = {linkQR}>Download QR Code</a>                
                </Button>                   
              </DialogActions>
              </>}
            </BootstrapDialog> 
          </Stack>
        </Box>
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box marginTop={8}>
          <DatePicker
            inputFormat="yyyy-MM"
            views={["year", "month"]}
            label="Year and Month"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </Box>
      </LocalizationProvider>
      <Box sx={{ height: 500, width: "95%", marginTop: "10px" }}>
        <DataGrid
          rowHeight={100}
          rows={listAttendance}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
}
