import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Autocomplete,
  Button,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ChipAttendance from "../../components/Chip/ChipAttendance";
import { configEnv } from '../../configs/config'
import ChipStatus from "../../components/Chip/ChipStatus";
import { httpGet, httpPut } from "../../helpers/fetchHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const listAttendanceStatus = [
  { id: 0, label: "Present" },
  { id: 1, label: "Absent" },
  { id: 2, label: "Late Coming" },
  { id: 3, label: "Early Leaving" },
  { id: 4, label: "Absent With No Permission" },
  { id: 5, label: "Late Comming With No Permission" },
  { id: 6, label: "Early Leaving With No Permission" },
];

export default function DetailAttendance() {
  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "attendDate1",
      headerName: "Morning",
      width: 150,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString("en-GB")}</div>
      ),
    },
    {
      field: "status1",
      headerName: "Status 1",
      width: 150,
      renderCell: (params) => <ChipAttendance status={params.value} />,
    },
    {
      field: "attendDate2",
      headerName: "Afternoon",
      width: 150,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    {
      field: "status2",
      headerName: "Status 2",
      width: 150,
      renderCell: (params) => <ChipAttendance status={params.value} />,
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
    },
    {
      field: "xem",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="success"
          sx={{fontWeight:600}}
          onClick={() => {
            setEdit(!edit);
            setIdAttendance(params.row.id);
            setNewStatusAttendance1(params.row.status1);
            setNewStatusAttendance2(params.row.status2);
            setNote(params.row.note);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  const [listAttendance, setListAttendance] = useState([]);
  const location = useLocation();
  const classId = location.state.id;
  const accountName = location.state.accountName;
  const [date, setDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [newStatusAttendance1, setNewStatusAttendance1] = useState();
  const [newStatusAttendance2, setNewStatusAttendance2] = useState();
  const [idAttendance, setIdAttendance] = useState("");
  const [note, setNote] = useState("");
  const historyback = useHistory();
  const urlGet = `Attendance/ListAttendanceOfFresher`;
  const urlPut = `Attendance/UpdateAttendance`;
  // const handleUpdateReport = async () => {
  //   const data = {
  //     monthAttendance: date.getMonth() + 1,
  //     yearAttendance: date.getFullYear(),
  //   };
  //   await httpPut(
  //     `ReportAttendance/UpdateDataReportAttendance`,
  //       data
  //     )
  //     .then((response) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    const data = {
      id : classId,
      month : date.getMonth() + 1,
      year : date.getFullYear()
    };
    httpGet(
        urlGet,
        data
      )
      .then((response) => {
        setListAttendance(response.data);
      });
  }, [date]);

  const handleCloseEditForm = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const onSubmitUpdateAttendanceStatus = (e) => {
    e.preventDefault();
    const data = {
      attendanceId : idAttendance,
      status1: newStatusAttendance1,
      status2: newStatusAttendance2,
      note: note,
    };
    httpPut(
        urlPut,
        data
      )
      .then((response) => {
        window.location.reload();
        //handleUpdateReport();
      });
  };

  return (
    <Box style={{ marginLeft: "3%" ,padding:"10px" }}>
      <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/attendances"
            >
              Class
            </a>
          </li>
          <li className="breadcrumb-item active">
          <span
              onClick={() => {
                historyback.goBack();
              }}
              style={{
                color: "#007bff",
                cursor: "pointer",
              }}
            >
              List Attendance
            </span>

          </li>
          <li className="breadcrumb-item active" aria-current="page">
          <a href="/detail-attendance">Detail</a>

          </li>
        </ol>
      </nav>
      
        <h2 style={{ textTransform: "uppercase" }}>{accountName}</h2>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box">
              <span className="info-box-icon bg-info elevation-1">
                <i className="fas fa-cog"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Absent </span>
                <span className="info-box-number">
                {listAttendance.filter((x) => x.status1 === 1).length +
                    listAttendance.filter((x) => x.status2 === 1).length}
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-danger elevation-1">
                <i className="fas fa-thumbs-up"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Present</span>
                <span className="info-box-number">
                {listAttendance.filter((x) => x.status1 === 0).length +
                    listAttendance.filter((x) => x.status2 === 0).length}
                </span>
              </div>
            </div>
          </div>

          <div className="clearfix hidden-md-up"></div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-success elevation-1">
                <i className="fas fa-clock"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Late &amp; Early Leaving</span>
                <span className="info-box-number">
                  {" "}
                  {
                    listAttendance.filter((x) => x.status1 === 2).length +
                    listAttendance.filter((x) => x.status2 === 2).length + 
                    listAttendance.filter((x) => x.status1 === 3).length +
                      listAttendance.filter((x) => x.status2 === 3).length
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-warning elevation-1">
                <i className="fas fa-users"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Absent No permission</span>
                <span className="info-box-number">
                  {" "}
                  {listAttendance.filter((x) => x.status1 === 4).length +
                    listAttendance.filter((x) => x.status2 === 4).length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Box sx={{ height: 400, width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box marginTop={5} marginBottom={5}>
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
          <DataGrid rows={listAttendance} columns={columns} />
        </Box>
      </div>
      <Box style={{ display: "flex", marginTop: "100px" }}>
        <ChipStatus label="Absent" color="error" labelChip={"A"} />
        <ChipStatus label="Present" color="success" labelChip={"P"} />
        <ChipStatus label="Late Comming" color="warning" labelChip={"L"} />
        <ChipStatus label="Early Leaving" color="warning" labelChip={"E"} />
        <ChipStatus
          label="Absent With No Permission"
          color="error"
          labelChip={"An"}
        />
        <ChipStatus
          label="Late Comming With No Permission"
          color="error"
          labelChip={"Ln"}
        />
        <ChipStatus
          label="Early Leaving With No Permission"
          color="error"
          labelChip={"En"}
        />
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={edit}
        onClose={handleCloseEditForm}
        closeAfterTransition
      >
        <Fade in={edit}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Edit Attendance Status
            </Typography>
            <Box marginBottom={2} marginTop={2}>
              <h5>Status 1</h5>

              <Autocomplete
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
            </Box>

            <Box marginBottom={2}>
              <h5>Status 2</h5>

              <Autocomplete
                value={listAttendanceStatus.find(
                  (e) => newStatusAttendance2 === e.id
                )}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => {
                  setNewStatusAttendance2(value.id);
                }}
                disableClearable
                id="free-solo-demo"
                options={listAttendanceStatus}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Status 2" />
                )}
              />
            </Box>
            <Box>
              <h5>Note</h5>

              <TextField
                sx={{ width: 300 }}
                required
                id="outlined-required"
                label="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                defaultValue={note}
              />
            </Box>
            <Button
              variant="contained"
              color="success"
              to="#"
              style={{ marginTop: 15, color: "#fff" }}
              startIcon={<SaveIcon />}
              onClick={onSubmitUpdateAttendanceStatus}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
