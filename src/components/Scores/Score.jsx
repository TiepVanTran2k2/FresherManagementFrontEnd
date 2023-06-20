import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid/components";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./style.css";
import { httpGet, httpPost } from "../../helpers/fetchHelper";

const axios = require("axios").default;

export default function Score() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const columns = [
    { field: "fresherId", headerName: "fresherId", hide: true },
    { field: "fresherFirstName", headerName: "First Name", width: 150 },
    { field: "fresherLastName", headerName: "Last Name", width: 150 },
    { field: "fresherAccount", headerName: "Account", width: 150 },
    { field: "quizzAvgScore", headerName: "Quiz", width: 100 },
    { field: "assignmentAvgScore", headerName: "Assignment", width: 100 },
    { field: "finalAuditScore", headerName: "Final Audit", width: 100 },
    { field: "finalMark", headerName: "Final Mark", width: 100 },
    { field: "rank", headerName: "Rate", width: 100 },
    {
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AddIcon />}
          label="Create"
          href
          onClick={() => handleClickOpen(params.row)}
        />,
      ],
      type: "actions",
      width: 100,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedScoreType, setSelectedScoreType] = useState();
  const [score, setScore] = useState("");
  const [classCodefresher, setclassCodefreherList] = useState([]);
  const [planModule, setPlanModule] = useState([]);
  const [fresher, setFresherList] = useState([]);
  const [rowSelected, setRowSelected] = useState("");
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [isSetScore, setIsSetScore] = useState(false);
  const [isTypeScore, setIsTypeScore] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImportScore, setOpenImportScore] = useState(false);
  const [openExportScore, setOpenExportScore] = useState(false);

  const getKey = async (value) => {
    await setSelectedScoreType(value);
  };

  const handleImportScore = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (hasFile) {
      const formData = new FormData();
      formData.append("fileExcel", selectedFile);
      await httpPost("Score/CreateScoresFromFileExcel", formData).then(
        (response) => {
          handleClose(false);
          setIsSetScore((pre) => !pre);
          if (response.statusCode === 400) {
            setMessage(response.message);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      );
    } else {
      setIsOpen(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };
  const changeHandler = async (event) => {
    await setSelectedFile(event.target.files[0]);
    await setHasFile(true);
  };

  let history = useHistory();
  const GotoDetailScore = async (id, moduleId) => {
    await history.push(`/Scores/${id}/${moduleId}`);
  };

  const handleOpenImportScore = async () => {
    await setOpenImportScore(true);
  };
  const handleOpenExportScore = async () => {
    await setOpenExportScore(true);
  };
  const handleClickOpen = async (params) => {
    await setRowSelected(params);
    await setOpen(true);
  };

  const handleClose = async () => {
    await setOpen(false);
    await setOpenImportScore(false);
    await setOpenExportScore(false);
  };

  const handleCreateScore = async () => {
    const body = [
      {
        fresherId: rowSelected.fresherId,
        classId: selectedClassCode.id,
        moduleName: selectedModule.moduleName,
        typeScore: selectedScoreType,
        moduleScore: score,
      },
    ];
    await httpPost("Score/CreateScores", body)
      .then((response) => {
        setIsSetScore((pre) => !pre);
      })
      .catch((error) => console.log("error", error));
    handleClose();
  };

  useEffect(() => {
    httpGet("Score/GetEnumScore", {}).then((response) => {
      setIsTypeScore(response.data);
    });

    httpGet("ClassFresher/GetAllClassFresherPagingsion", {
      pageIndex: 0,
      pageSize: 10,
    }).then((response) => {
      setclassCodefreherList(response.data.items);
    });
  }, []);

  useEffect(() => {
    var planId = selectedClassCode ? selectedClassCode.planId : "";
    httpGet(`Module/GetModuleByPlanId/${planId}`).then((res) => {
      setPlanModule(res.data);
    });
  }, [selectedClassCode]);

  useEffect(() => {
    httpGet("Result/GetModuleResult", {
      classId: selectedClassCode ? selectedClassCode.id : "",
      moduleName: selectedModule ? selectedModule.moduleName : " ",
    }).then((response) => {
      setFresherList(response.data);
    });
  }, [selectedClassCode, selectedModule, isSetScore]);

  const handleExportFresherList = () => {
    var scoreTemp = [];
    // eslint-disable-next-line array-callback-return
    fresher.map((x) => {
      scoreTemp.push({
        classId: selectedClassCode.id,
        moduleName: selectedModule.moduleName,
        fresherId: x.fresherId,
        fresherName: x.fresherFirstName + x.fresherLastName,
        accountName: x.fresherAccount,
        typeScore: selectedScoreType,
        moduleScore: 0,
      });
    });
    axios({
      method: "post",
      url: "https://localhost:5001/api/export/score",
      data: scoreTemp,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", response.headers["file-name"]);
      document.body.appendChild(link);
      link.click();
    });
    handleClose(false);
  };

  return (
    <div className="Container-flex">
      <div className="controlBorder">
        <div className="classCode">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={classCodefresher ? classCodefresher : ""}
            getOptionLabel={(option) => option.classCode}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Class Code" />
            )}
            onChange={(event, newValue) => {
              setSelectedClassCode(newValue);
            }}
          />
        </div>

        <div className="Module">
          <Autocomplete
            disablePortal
            options={planModule ? planModule : ""}
            dataId={planModule.id}
            getOptionLabel={(option) => option.moduleName}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Module" />}
            onChange={(event, newValue) => {
              setSelectedModule(newValue);
            }}
          />
        </div>
      </div>

      <div className="createForm">
        <div>
          <ColorButton onClick={handleOpenExportScore}>
            <DownloadIcon />
            Export Score
          </ColorButton>
        </div>

        <div style={{ marginLeft: "10px" }}>
          <ColorButton onClick={handleOpenImportScore}>
            <FileUploadIcon />
            Import Score
          </ColorButton>
        </div>
      </div>
      <div className="TableScore">
        <DataGrid
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "Gray",
              color: "White",
              fontSize: 16,
            },
          }}
          getRowId={(row) => row.fresherId}
          rows={fresher}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellDoubleClick={(params, event) => {
            GotoDetailScore(params.id, selectedModule.id);
          }}
        />
      </div>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            Create new Score
          </DialogTitle>
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
                <Grid container>
                  <Grid margin={"5px"} item sx={12} xs={12}>
                    <TextField
                      margin="5px"
                      fullWidth
                      dataId={rowSelected.id}
                      id="filled-basic"
                      label="Full Name"
                      value={
                        rowSelected.fresherFirstName +
                        " " +
                        rowSelected.fresherLastName
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid margin={"5px"} item sx={12} xs={12}>
                    <TextField
                      margin="5px"
                      fullWidth
                      id="fresherAccount"
                      label="Account"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={rowSelected.fresherAccount}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid margin={"5px"} item sx={12} xs={12}>
                    <TextField
                      margin="5px"
                      fullWidth
                      id="moduleName"
                      label="Module"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={selectedModule ? selectedModule.moduleName : ""}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid margin={"5px"} item sx={12} xs={12}>
                    <Autocomplete
                      disablePortal
                      id="typeScore"
                      options={isTypeScore}
                      getOptionLabel={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          id={params.key}
                          {...params}
                          label="Type Score"
                        />
                      )}
                      onChange={(event, newValue) => {
                        getKey(newValue.key);
                      }}
                    />
                  </Grid>

                  <Grid margin={"5px"} item sx={12} xs={12}>
                    <TextField
                      margin="5px"
                      fullWidth
                      id="moduleScore"
                      label="Score"
                      type="number"
                      variant="outlined"
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
                </Grid>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateScore} form="myform">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <div class="modal-body">{message}</div>

        <Dialog open={openImportScore} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            Import Score
          </DialogTitle>
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
                <div className="card">
                  {isOpen ? (
                    <div>
                      <div
                        class="toast fade show"
                        role="alert"
                        style={{ backgroundColor: "red" }}
                      >
                        <div class="toast-body" style={{ fontSize: "20px" }}>
                          Please choose file or drag file
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div
                    id="file-upload-Hover"
                    className="card-body"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0px ",
                    }}
                  >
                    <label
                      for="file-upload"
                      style={{
                        width: "100%",
                        height: "40px",
                        paddingTop: "8px",
                        textAlign: "center",
                      }}
                    >
                      <span jsslot="" class="GcVcmc Fxmcue cd29Sd">
                        <span class="lRRqZc Ce1Y1c">
                          <svg
                            focusable="false"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            class="a7AG0 NMm5M"
                          >
                            <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
                          </svg>
                        </span>
                        <span class="RdyDwe snByac">
                          {selectedFile !== undefined
                            ? selectedFile.name
                            : "Drag file to import"}
                        </span>
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      onChange={changeHandler}
                      style={{
                        display: "none",
                        marginTop: "-27px",
                      }}
                    />{" "}
                  </div>
                </div>
              </Box>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <ColorButton onClick={handleImportScore}>
                  <FileUploadIcon /> &nbsp; Import
                </ColorButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Dialog open={openExportScore} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            Export Score
          </DialogTitle>
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
                  <Autocomplete
                    disablePortal
                    id="typeScore"
                    options={isTypeScore}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField
                        id={params.key}
                        {...params}
                        label="Type Score"
                      />
                    )}
                    onChange={(event, newValue) => {
                      getKey(newValue.key);
                    }}
                  />
                </Grid>
              </Box>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <ColorButton onClick={handleExportFresherList}>
                  <DownloadIcon /> &nbsp; Export
                </ColorButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
