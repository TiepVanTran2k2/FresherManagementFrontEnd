import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as XLSX from "xlsx";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20
}));
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20
}));
function ViewPlanAuditDetail() {
    const [list, setList] = useState([]);
    const [items, setItems] = useState([]);
    const [items1, setItems1] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const location = useLocation()
    const history = useHistory()
    const moduleName = location.state.moduleName;
    const classCode = location.state.codeClass;
    const numberAudit = location.state.numberAudit;
    const classId = location.state.classId;
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const dataGet = {
        classId: classId,
        nameModule: moduleName,
        numberAudit: numberAudit
    }
    const dataGetQuestion = {
        moduleName: moduleName,
        numberAudit: numberAudit
    }
    const Exit = () =>{
        history.goBack();
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                {/* <GridToolbarDensitySelector /> */}
            </GridToolbarContainer>
        );
    }
    console.log(classId, moduleName, numberAudit);
    
    const columns1 = [
        {field: "id"},
        {field: "QuestionName", width: 550 },
        {
            renderCell: (cellValues) => {
                return <Button onClick={() => RemoveQuestion(`${cellValues.getValue(cellValues.id, 'QuestionName')}`)}>
                    Remove
                </Button>
            }
        }
    ];
    const columns2 = [
        { field: "questionName", width: 550 }        
    ];
    const RemoveQuestion = (id) => {
        setItems(items.filter(a => a.QuestionName !== id));
    }
    const postQuestionData = () => {
        const DataPost = {
            moduleName: moduleName,
            numberAudit: numberAudit,
            questionManagementViewModels: items
        }
        Axios.post(`https://localhost:5001/api/QuestionManagement/CreateListQuestionForPlanAudit`,
            DataPost
        ,)
                .then(res => {
                    setOpenAlert(true);
                    setMessage('Insert question success');
                    setStatus('success');
                })
                .catch(res => {
                    setOpenAlert(true);
                    setMessage('Insert Fail !!!');
                    setStatus('error');
                })
    }
    const columns = [
        { title: "Module Name", field: "accountName", width: 130 },
        { title: "Auditor Name", field: "auditorName", width: 130 },
        { title: "Auditor Id", field: "rank", width: 90 },
        { title: "Auditor Id", field: "practiceScore", width: 120 },
        {
            field: "status",
            renderCell: (cellValues) => {
                if(cellValues.getValue(cellValues.id, "status") == true)
                {
                    return <Button>
                        <Link to={{
                            pathname: "/updateDetailAudit",
                            state: {
                                classId: classId,
                                id: `${cellValues.getValue(cellValues.id, "id")}`,
                                accountName: `${cellValues.getValue(cellValues.id, "accountName")}`,
                                auditorId: `${cellValues.getValue(cellValues.id, "auditorId")}`,
                                moduleName: moduleName,
                                codeClass: classCode,
                                numberAudit: numberAudit,
                                evaluateQ1: `${cellValues.getValue(cellValues.id, "evaluateQ1")}`,
                                evaluateQ2: `${cellValues.getValue(cellValues.id, "evaluateQ2")}`,
                                evaluateQ3: `${cellValues.getValue(cellValues.id, "evaluateQ3")}`,
                                evaluateQ4: `${cellValues.getValue(cellValues.id, "evaluateQ4")}`,

                                questionQ1: `${cellValues.getValue(cellValues.id, "questionQ1")}`,
                                questionQ2: `${cellValues.getValue(cellValues.id, "questionQ2")}`,
                                questionQ3: `${cellValues.getValue(cellValues.id, "questionQ3")}`,
                                questionQ4: `${cellValues.getValue(cellValues.id, "questionQ4")}`,

                                commentQ1: `${cellValues.getValue(cellValues.id, "commentQ1")}`,
                                commentQ2: `${cellValues.getValue(cellValues.id, "commentQ2")}`,
                                commentQ3: `${cellValues.getValue(cellValues.id, "commentQ3")}`,
                                commentQ4: `${cellValues.getValue(cellValues.id, "commentQ4")}`,

                                practiceComment: `${cellValues.getValue(cellValues.id, "practiceComment")}`,
                                practiceScore: `${cellValues.getValue(cellValues.id, "practiceScore")}`,
                                auditComment: `${cellValues.getValue(cellValues.id, "auditComment")}`,
                            }
                        }}>
                            <i className='fa-solid fa-circle-check'></i>
                        </Link>
                    </Button>
                }
                else{
                    return <Button>
                        <Link to={{
                            pathname: "/updateDetailAudit",
                            state: {
                                classId: classId,
                                id: `${cellValues.getValue(cellValues.id, "id")}`,
                                accountName: `${cellValues.getValue(cellValues.id, "accountName")}`,
                                auditorId: `${cellValues.getValue(cellValues.id, "auditorId")}`,
                                moduleName: moduleName,
                                codeClass: classCode,
                                numberAudit: numberAudit,
                                evaluateQ1: `${cellValues.getValue(cellValues.id, "evaluateQ1")}`,
                                evaluateQ2: `${cellValues.getValue(cellValues.id, "evaluateQ2")}`,
                                evaluateQ3: `${cellValues.getValue(cellValues.id, "evaluateQ3")}`,
                                evaluateQ4: `${cellValues.getValue(cellValues.id, "evaluateQ4")}`,

                                questionQ1: `${cellValues.getValue(cellValues.id, "questionQ1")}`,
                                questionQ2: `${cellValues.getValue(cellValues.id, "questionQ2")}`,
                                questionQ3: `${cellValues.getValue(cellValues.id, "questionQ3")}`,
                                questionQ4: `${cellValues.getValue(cellValues.id, "questionQ4")}`,

                                commentQ1: `${cellValues.getValue(cellValues.id, "commentQ1")}`,
                                commentQ2: `${cellValues.getValue(cellValues.id, "commentQ2")}`,
                                commentQ3: `${cellValues.getValue(cellValues.id, "commentQ3")}`,
                                commentQ4: `${cellValues.getValue(cellValues.id, "commentQ4")}`,

                                practiceComment: `${cellValues.getValue(cellValues.id, "practiceComment")}`,
                                practiceScore: `${cellValues.getValue(cellValues.id, "practiceScore")}`,
                                auditComment: `${cellValues.getValue(cellValues.id, "auditComment")}`,
                            }
                        }}>
                            <i className='fa-solid fa-rectangle-xmark' color='danger'/>
                        </Link>
                    </Button>
                }
            }
        }
    ]
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handleOpen = () => {
        setOpen(true);        
    };
    const handleOpen1 = () => {
        setOpen1(true);
        let mount = true;
        Axios.post(`https://localhost:5001/api/QuestionManagement/GetAllQuestionInPlanAudit`,
            dataGetQuestion
        ,)
            .then(res => {
                if (mount) {
                    if(res.data.data.length == 0){
                        setItems1([]);
                    }
                    else{
                        setItems1(res.data.data);
                    }
                }
            });
    };

    // useEffect(() => {
    //     let mount = true;
    //     Axios.get(`https://localhost:5001/api/QuestionManagement/GetAllQuestionInPlanAudit?namePlanAudit=${namePlanAuditClear}&nameModule=${moduleNameClear}`)
    //         .then(res => {
    //             if (mount) {
    //                 setItems1(res.data.data);
    //             }
    //         });
    // }, [])
    useEffect(() => {
        let mount = true;
        Axios.post(`https://localhost:5001/api/AuditResult/GetDetailPlanAudit`, dataGet ,)
            .then(res => {
                if (mount) {
                    setList(res.data.data);
                    console.log(res.data.data)
                }
            });
    }, []);

    const viewQuestion = () => {
        
    }
    // import excel
    

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
        promise.then((d) => {
            setItems(d);
            console.log(d);
            for(let i = 0; i < d.length; i++){
                setQuestionData({
                    QuestionName: d[i].Id
                })
            }
            console.log(questionData);
        });
    };

    return (
        <div>
            <Button variant="contained" color="error" style={{
                marginTop: '3%', left: '13.5%'
            }} onClick={Exit}>
                <i class="fa-solid fa-right-from-bracket"/>
            </Button>
            <div style={{
                position: 'absolute', left: '60%', top: '50%',
                transform: 'translate(-50%, -50%)', height: '60%', width: '60%'
            }}>
                <h5>Class Code: {classCode}</h5>
                <h5>Module Name: {moduleName}</h5>
                <Button variant="contained" style={{
                    marginTop: '-12%', marginLeft: '45%'
                }} onClick={handleOpen}>
                    Import Question <i class="fa-solid fa-cloud-arrow-up" style={{
                        marginLeft: 5
                    }}></i>
                </Button>

                <Button variant="contained" style={{
                    marginTop: '-18%', marginLeft: '70%'
                }} onClick={handleOpen1}>
                    View Question <i class="fa-solid fa-book" style={{
                        marginLeft: 5
                    }}/>
                </Button>

                {<DataGrid
                    rows={list}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    style={{
                        borderRadius: '10px', borderColor: 'silver',
                        marginTop: '-5%', width: '85%'
                    }}
                    components={{
                        Toolbar: CustomToolbar,
                        NoRowsOverlay: () => (
                            <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                <CircularProgress />
                                <p>Getting fresher data...</p>
                            </Stack>
                        ),
                        NoResultsOverlay: () => (
                            <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                <p>No result</p>
                            </Stack>
                        )
                    }}
                />}
                <div>
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >                      
                        <Item>                            
                            <Button variant="contained" component="label">
                                Choose File
                                <input
                                    hidden
                                    multiple
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        readExcel(file);
                                    }}
                                />
                            </Button>

                            <Collapse in={openAlert}>
                                <Alert
                                    style={{
                                        width: 350, marginTop: '-3.2%'
                                    }}
                                    severity={status}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenAlert(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {message}
                                </Alert>
                            </Collapse>

                            {<DataGrid
                                rows={items}
                                columns={columns1}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver',
                                    height: 400, marginTop: '1%'
                                }}
                            />}
                            <Button variant="contained" style={{
                                marginTop: '1%'
                            }} onClick={postQuestionData}>
                                Submit
                            </Button>
                        </Item>
                    </Modal>

                    <Modal
                        keepMounted
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Item1>
                            {<DataGrid
                                rows={items1}
                                columns={columns2}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver',
                                    height: 400, marginTop: '1%'
                                }}
                            />}
                        </Item1>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default ViewPlanAuditDetail;