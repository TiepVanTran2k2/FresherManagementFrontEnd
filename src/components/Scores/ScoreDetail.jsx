import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid/components";
import { useHistory } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { httpGet, httpPut } from "../../helpers/fetchHelper";

const axios = require("axios").default;

export default function ScoreDetail() {
  const { id, module } = useParams();
  const [isSetScore, setIsSetScore] = useState(false);
  const [viewModule, setViewModule] = useState([]);
  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [assignmentScore, setAssignmentScore] = useState([]);
  const [quizScore, setQuizScore] = useState([]);
  const [bonusScore, setBonusScore] = useState([]);
  const [penaltyScore, setPenaltyScore] = useState([]);
  const [score, setScore] = useState();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  const columnsAssignment = [
    { field: "id", headerName: "Id", hide: true },
    { field: "typeScore", headerName: "typeScore", hide: true },
    {
      field: "moduleScore",
      headerName: "Score",
      width: 200,
    },
    { field: "creationDate", headerName: "Date Create", width: 330 },
    {
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleClickOpen(params.row)}
        />,
      ],
      type: "actions",
      width: 360,
    },
  ];

  const columnsQuiz = [
    { field: "id", headerName: "Id", hide: true },
    { field: "typeScore", headerName: "typeScore", hide: true },
    { field: "moduleScore", headerName: "Score", width: 200 },
    { field: "creationDate", headerName: "Date Create", width: 330 },
    {
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleClickOpen(params.row)}
        />,
      ],
      type: "actions",
      width: 360,
    },
  ];
  const handleUpdateScore = async () => {
    const body = {
      id: rowSelected.id,
      typeScore: rowSelected.typeScore,
      moduleScore: score,
    };
    await httpPut("Score/UpdateScore", body)
      .then((response) => {
        setIsSetScore((pre) => !pre);
        handleClose();
      })
      .catch((error) => console.log("error", error));
  };

  const handleClickOpen = (params) => {
    setRowSelected(params);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();
  const gotoBack = (id, moduleId) => {
    history.push(`/Scores`);
  };

  async function fetchData() {
    await httpGet(`Fresher/GetFresherById/${id}`).then((response) => {
      if (response.data !== "") {
        setInfo(response.data);
      }
    });

    await httpGet(`Module/GetModuleById/${module}`).then((response) => {
      if (response.data !== "") {
        setViewModule(response.data);
      }
    });
  }

  async function fetchDataPenaltyScore() {
    await httpGet(
      `Score/GetScoreByTypeScoreAndFresherIdAndModuleId/fresher/${id}/module/${encodeURIComponent(
        viewModule.moduleName
      )}/3`
    ).then((response) => {
      if (response.success) {
        setPenaltyScore(response.data);
        console.log(response.data);
      }
    });
  }
  async function fetchDataBonusScore() {
    await httpGet(
      `Score/GetScoreByTypeScoreAndFresherIdAndModuleId/fresher/${id}/module/${encodeURIComponent(
        viewModule.moduleName
      )}/2`
    ).then((response) => {
      if (response.success) {
        setBonusScore(response.data);
      }
    });
  }
  async function fetchDataQuizScore() {
    await httpGet(
      `Score/GetScoreByTypeScoreAndFresherIdAndModuleId/fresher/${id}/module/${encodeURIComponent(
        viewModule.moduleName
      )}/1`
    ).then((response) => {
      if (response.success) {
        setQuizScore(response.data);
      }
    });
  }
  async function fetchDataAssignmentScore() {
    await httpGet(
      `Score/GetScoreByTypeScoreAndFresherIdAndModuleId/fresher/${id}/module/${encodeURIComponent(
        viewModule.moduleName
      )}/0`
    ).then((response) => {
      if (response.success) {
        console.log(response.data);
        setAssignmentScore(response.data);
      }
    });
  }
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  useEffect(() => {
    (() => {
      fetchDataAssignmentScore();
      fetchDataQuizScore();
      fetchDataBonusScore();
      fetchDataPenaltyScore();
    })();
  }, [viewModule, isSetScore]);

  return (
    <div className="ScoreDetailBorder">
      <div>
        <Box sx={{ p: 3 }}>
          <Card>
            <CardHeader title="Fresher Information" />
            <CardContent>
              <Grid container spacing={2} marginLeft="5px">
                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography
                      id="title"
                      label="Title"
                      variant="outlined"
                      fontWeight={900}
                    >
                      Class :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="title" label="Title" variant="outlined">
                      {info.classCode}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography
                      id="content"
                      label="Content"
                      fontWeight={900}
                      variant="outlined"
                    >
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="content" label="Content" variant="outlined">
                      {info.firstName + info.lastName}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      fontWeight={900}
                      variant="outlined"
                    >
                      Account :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      variant="outlined"
                    >
                      {info.accountName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      fontWeight={900}
                      variant="outlined"
                    >
                      Email :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      variant="outlined"
                    >
                      {info.email}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      fontWeight={900}
                      variant="outlined"
                    >
                      Phone :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography
                      id="date_start"
                      label="Date Start"
                      variant="outlined"
                    >
                      {info.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>

      <div className="" style={{ display: "inline" }}>
        <Box sx={{ p: 3 }}>
          <Card>
            <CardHeader title="Module" />
            <CardContent>
              <Grid container spacing={2} marginLeft="5px">
                <Grid container>
                  <Grid item sm={1}>
                    <Typography
                      id="title"
                      label="Title"
                      variant="outlined"
                      fontWeight={900}
                    >
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item sm={6} style={{ width: "auto" }}>
                    <Typography id="title" label="Title" variant="outlined">
                      {viewModule.moduleName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>
      <div className="soreDetail">
        <Box sx={{ p: 3 }}>
          <Card>
            <CardHeader title="Score Detail" />

            <div className="" style={{ textAlign: "left" }}>
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Assignment " />
                  <Grid item xs={12} sm={10}>
                    <div className="assignmentTable">
                      <DataGrid
                        sx={{
                          ".MuiDataGrid-columnSeparator": {
                            display: "none",
                          },
                          "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "Gray",
                            color: "White",
                            fontSize: 14,
                          },
                        }}
                        getRowId={(row) => row.id}
                        rows={assignmentScore}
                        columns={columnsAssignment}
                        pageSize={10}
                        rowsPerPageOptions={[20]}
                        onCellDoubleClick={(params, event) => {}}
                      />
                    </div>
                  </Grid>
                </Card>
              </Box>
            </div>

            <div className="">
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Quiz" />
                  <Grid item xs={12} sm={10}>
                    <div className="assignmentTable">
                      <DataGrid
                        sx={{
                          ".MuiDataGrid-columnSeparator": {
                            display: "none",
                          },
                          "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "Gray",
                            color: "White",
                            fontSize: 14,
                          },
                        }}
                        getRowId={(row) => row.id}
                        rows={quizScore}
                        columns={columnsQuiz}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                      />
                    </div>
                  </Grid>
                </Card>
              </Box>
            </div>

            <div className="">
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Audit" />
                  <CardContent>
                    <Grid container spacing={2} marginLeft="5px">
                      <Grid container>
                        {/* <Grid item xs={1} sm={2}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                            fontWeight={900}
                          >
                            Audit :
                          </Typography>
                        </Grid> */}
                        <Grid item xs={20} sm={1}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                          >
                            {}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </div>

            <div className="">
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Practice" />
                  <CardContent>
                    <Grid container spacing={2} marginLeft="5px">
                      <Grid container>
                        {/* <Grid item xs={1} sm={2}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                            fontWeight={900}
                          >
                            Practice :
                          </Typography>
                        </Grid> */}
                        <Grid item xs={20} sm={1}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                          >
                            {}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </div>

            <div className="">
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Bonus" />
                  <CardContent>
                    <Grid container spacing={2} marginLeft="5px">
                      <Grid container>
                        <Grid item xs={1} sm={0}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                          >
                            {bonusScore &&
                              bonusScore.map((bonus, index) => (
                                <p>{bonus.moduleScore}</p>
                              ))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </div>

            <div className="">
              <Box sx={{ p: 3 }}>
                <Card>
                  <CardHeader title="Penalty" />
                  <CardContent>
                    <Grid container spacing={2} marginLeft="5px">
                      <Grid container>
                        <Grid item xs={20} sm={1}>
                          <Typography
                            id="title"
                            label="Title"
                            variant="outlined"
                          >
                            {penaltyScore &&
                              penaltyScore.map((penalty, index) => (
                                <p>{penalty.moduleScore}</p>
                              ))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </div>
          </Card>
        </Box>
      </div>
      <div>
        <ColorButton variant="contained" onClick={gotoBack}>
          Back
        </ColorButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Score</DialogTitle>
          <DialogContent>
            <form id="myform">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Grid margin={"5px"} item sx={12} xs={12}>
                  <TextField
                    style={{ textAlign: "center" }}
                    margin="5px"
                    id="moduleScore"
                    label="Score"
                    type="number"
                    variant="outlined"
                    defaultValue={rowSelected.moduleScore}
                    onChange={(e) => {
                      if (e.target.value > 10) {
                        e.target.value = 10;
                      } else if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                      setScore(e.target.value);
                    }}
                  />
                </Grid>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdateScore}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
