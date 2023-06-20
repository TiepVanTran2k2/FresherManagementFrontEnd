import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import {  Link } from 'react-router-dom';
import CreatePlanAudit from './CreatePLanAudit';
import moment from 'moment';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 580,
    width: '95%',
    marginLeft: 120,
    fontFamily: 'opensans_bold',
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    width: '50%',
    marginLeft: '25%',
    marginTop: '10%'
}));

function ViewPlanAudit({ id, codeClass }) {
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [numberAuditor, setNumberAuditor] = useState(0);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    };
    
    const [updateClassFresherId, setUpdateClassFresherId] = useState();
    const [updateModuleName, setUpdateModuleName] = useState();
    const [updateNumberAudit, setUpdateNumberAudit] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [getDate, setGetDate] = useState();
    const handleUpdatePlanAudit = (classFresherId, moduleName, numberAudit, date) => {
        setUpdateClassFresherId(classFresherId);
        setUpdateNumberAudit(numberAudit);
        setUpdateModuleName(moduleName);
        setOpenUpdate(true);
        setGetDate(date);
    }
    const [dateStart, setDateStart] = useState();
    const handlechangeDateStart = e => {
        setDateStart(e.target.value)
    }
    const UpdateInformationPlanAudit = (moduleNameNew) => {
        const dataPost = {
            classId: updateClassFresherId,
            nameModuleOld: updateModuleName,
            nameModuleNew: textModuleName,
            numberAudit: updateNumberAudit,
            dateStart: dateStart
        }
        Axios.put('https://localhost:5001/api/AuditResult/UpdateInformationOfPlanAudit',
                dataPost,)
                .then(res => {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                })
    }
    const [moduleNameGet, setmoduleNameGet] = useState([]);
    const [textModuleName, setTextModuleName] = useState('');
    const handleChangeModuleNameGet = (event) => {
        setTextModuleName(event.target.value);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setTextModuleName('');
    };
    console.log(id);
    useEffect(() => {
        setmoduleNameGet([])
        if (id != null) {
            Axios.get(`https://localhost:5001/api/PlanInformation/GetByClassId/${id}`)
                .then(res => {
                    setmoduleNameGet(res.data);
                })
        }
    }, [id]);
    const columns = [
        { 
            field: "moduleName",
            width: 130,
            renderCell: (cellValues) => {
                return <Link to={{
                        pathname: "/viewPlanAuditDetail",
                        state: {
                            moduleName: `${cellValues.getValue(cellValues.id, "moduleName")}`,
                            numberAudit: `${cellValues.getValue(cellValues.id, "numberAudit")}`,
                            classId: `${cellValues.getValue(cellValues.id, "classFresherId")}`,
                            codeClass: codeClass
                        }
                    }} style={{
                        color: 'black'
                    }}>
                        {cellValues.getValue(cellValues.id, "moduleName")}
                    </Link>
            } 
        },
        { 
            title: "Start Date", 
            field: "dateStart", 
            width: 180, 
            valueFormatter: pr => moment(pr?.value).format("DD/MM/YYYY hh:mm A"),
            renderCell: (cellValues) => {
                return <Link to={{
                    pathname: "/viewPlanAuditDetail",
                    state: {
                        moduleName: `${cellValues.getValue(cellValues.id, "moduleName")}`,
                        numberAudit: `${cellValues.getValue(cellValues.id, "numberAudit")}`,
                        classId: `${cellValues.getValue(cellValues.id, "classFresherId")}`,
                        codeClass: codeClass
                    }
                }} style={{
                    color: 'black'
                }}>
                    {cellValues.getValue(cellValues.id, "dateStart")}
                </Link>
            } 
        },        
        {
            field:"Auditor",
            renderCell: (cellValues) => {
                const dataGet = {
                    classId: cellValues.getValue(cellValues.id, "classFresherId"),
                    nameModule: cellValues.getValue(cellValues.id, "moduleName"),
                    numberAudit: cellValues.getValue(cellValues.id, "numberAudit")
                }
                let mount = true;
                Axios.post(`https://localhost:5001/api/AuditResult/GetCountAuditorOfClassAudit`,
                    dataGet
                        ,)
                    .then(res => {
                        if (mount) {
                            setNumberAuditor(res.data.data)
                        }
                    });
                return <Link to={{
                    pathname: "/viewAuditor",
                    state: {
                        classId: `${cellValues.getValue(cellValues.id, "classFresherId")}`,
                        moduleName: `${cellValues.getValue(cellValues.id, "moduleName")}`,
                        numberAudit: `${cellValues.getValue(cellValues.id, "numberAudit")}`,
                        codeClass: codeClass
                    }
                }}>
                    Auditor
                </Link>
            }
        },
        {
            renderCell: (cellValues) => {
                return <Button
                    onClick={() => handleUpdatePlanAudit(
                        cellValues.getValue(cellValues.id, "classFresherId"),
                        cellValues.getValue(cellValues.id, "moduleName"),
                        cellValues.getValue(cellValues.id, "numberAudit"),
                        cellValues.getValue(cellValues.id, "dateStart")
                    )}>
                    <i className='fa-solid fa-pen-to-square'/>
                </Button>
            }
        }
    ];
    useEffect(() => {
        setList([]);
        if(id != null){
            let mount = true;
            Axios.get(`https://localhost:5001/api/AuditResult/GetAuditByAuditor/${id}`)
                .then(res => {
                    if (mount) {
                        setList(res.data.data);
                        console.log(res.data.data)
                    }
                });
        }
    }, [id]); 
    return (
        <div style={{ 
            height: 300, width: 650,
            marginLeft: 14,
            marginTop: 20
        }}>

            <Modal
                keepMounted
                open={openUpdate}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div style={{
                    marginTop: 20, height: 400, width: '80%',
                    marginLeft: 150
                }}>
                    <Item>
                        <Button
                            variant="contained" color="error"
                            onClick={handleCloseUpdate}
                            style={{
                                marginTop: '-0%', marginLeft: '-90%', height: 30
                            }}>
                            <ClearIcon fontSize="inherit" />
                        </Button>

                        <Box sx={{ minWidth: 30 }} style={{
                            marginTop: '10%'
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Module Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={textModuleName}
                                    label="Module Name"
                                    onChange={handleChangeModuleNameGet}
                                >
                                    {
                                        moduleNameGet.map((item) => (
                                            <MenuItem value={item.moduleName}>{item.moduleName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth={'100%'} style={{
                                marginTop: '10%'
                            }}>
                                <Stack component="form" noValidate spacing={3}>
                                    <TextField
                                        id="datetime-local"
                                        label="Day Start"
                                        type="datetime-local"
                                        defaultValue={moment(getDate).format('YYYY-MM-DDThh:mm')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={dateStart}
                                        onChange={handlechangeDateStart}
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl style={{
                                marginTop: '10%'
                            }}>
                                    <Button                                         
                                        variant="contained" color="primary"
                                        disabled={!textModuleName}
                                        onClick={UpdateInformationPlanAudit}>
                                        Submit
                                    </Button>
                            </FormControl>
                        </Box>
                    </Item>
                </div>
            </Modal>
            <h4 style={{
                textAlign: 'left'
            }}>Plan Audit Class: {codeClass}</h4>
            <Button variant='contained' style={{
                marginTop: '-15%', marginLeft: '75%', width: 160
            }} onClick={handleOpen}>Create Audit<i class="fa-solid fa-plus"
            style={{
                marginLeft: '6%'
            }}
            ></i></Button>
            {<DataGrid
                sx={{
                    ".MuiDataGrid-columnSeparator": {
                        display: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#3366CC",
                        color: "White",
                        fontSize: 16,
                    },
                }}
                rows={list}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div style={{
                    marginTop: 20, height: 400, width: '80%',
                    marginLeft: 150
                }}>
                    <Item1>
                        <CreatePlanAudit id={id} classCode={codeClass} />
                        <Button
                         variant="contained" color="error"
                         onClick={handleClose}
                         style={{
                            marginTop: '-110%', marginLeft: '-93%', height: 30
                        }}>
                            <ClearIcon fontSize="inherit" />
                        </Button>
                    </Item1>
                </div>
            </Modal>
        </div>
    );
}
export default ViewPlanAudit;