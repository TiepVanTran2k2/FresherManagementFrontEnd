import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Table, FormGroup, Col, Row, Button } from 'reactstrap'
import moment from 'moment';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    height: 465,
    width: 550
}));
const Item1 = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    height: 465,
    width: 420,
    marginLeft: -70,
    fontFamily: 'opensans_bold',
}));

function CreatePlanAudit({ id, classCode }) {
    const curDate = new Date();
    const [moduleName, setModuleName] = useState();
    const [dateStart, setDateStart] = useState();
    const [open, setOpen] = useState(false);
    const [listFresher, setListFresher] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [checkClick, setCheckClick] = useState(0);
    const [checkClickRemove, setCheckClickRemove] = useState(0);

    useEffect(() => {
        let mount = true;
        if(id != null){
            Axios.get(`https://localhost:5001/api/AuditResult/GetFresherInClass?classId=${id}`)
                .then(res => {
                    if (mount) {
                        setListFresher(res.data.data);
                        console.log(res.data.data)
                    }
                }); 
        }
    },[id]);
    const [listFresherGet, setListFresherGet] = useState([]);
    const addFresher = (id, accountName, lastName, firstName) => {
        setCheckClick(checkClick+1);
        if(checkClick == 1){
            const data = {
                id: id,
                accountName: accountName,
                lastName: lastName,
                firstName: firstName
            }
            setListFresherGet([...listFresherGet, data]);
            setListFresher(listFresher.filter(item => item.id !== id));
            setCheckClick(0);
        }
    }
    const getAllFresher = () =>{
        setListFresherGet(listFresher);
        setListFresher([]);
    }
    const RemoveAllFresher = () => {
        setListFresher(listFresherGet);
        setListFresherGet([]);
    }
    const removeFresher = (id, accountName, lastName, firstName) => {
        setCheckClickRemove(checkClickRemove+1);
        if(checkClickRemove == 1){
            setListFresherGet(listFresherGet.filter(item => item.id !== id));
            const data = {
                id: id,
                accountName: accountName,
                lastName: lastName,
                firstName: firstName
            }
            setListFresher([...listFresher, data]);
            setCheckClickRemove(0);
        }
    }
    console.log(listFresherGet)
    const handleClose = () => setOpen(false);
    const handlechangeModuleName = e => {
        setModuleName(e.target.value)
    }
    const handlechangeDateStart = e => {
        setDateStart(e.target.value)
    }

    const [moduleNameGet, setmoduleNameGet] = React.useState([]);
    const [textModuleName, setTextModuleName] = React.useState('');
    const handleChangeModuleNameGet = (event) => {
        setTextModuleName(event.target.value);
    };
    useEffect(()=>{
        setmoduleNameGet([])
        if (id != null) {
            Axios.get(`https://localhost:5001/api/PlanInformation/GetByClassId/${id}`)
                .then(res => {
                    setmoduleNameGet(res.data);
                })
        }
    },[id]);
    console.log('name module plan: ',moduleName)
    const datetime = moment(dateStart).format('MM/DD/YYYY hh:mm A');
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const postDataWithMember = async (e) =>{
        e.preventDefault();
        const dataPost = {
            ClassFresherId: id,
            DateStart: datetime,
            ModuleName: textModuleName,
            namePlanAudit: moduleName,
            fresherViewModels: listFresherGet
        }
        if(datetime == null){
            setStatus("warning")
            setMessage("Please enter input date start !!!")
            setOpenAlert(true);
        }
        else if(textModuleName.length == 0){
            setStatus("warning")
            setMessage("Please choose Module !!!")
            setOpenAlert(true);
        }
        else if(listFresherGet.length == 0){
            setStatus("warning")
            setMessage("Please choose Fresher !!!")
            setOpenAlert(true);
        }
        else{
            await Axios.post(`https://localhost:5001/api/AuditResult/CreatePlanAuditForMemberInClass`,
                dataPost
        ,).then(res => {
                    setStatus("success");
                    setMessage("Insert success");
                    setOpenAlert(true);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);         
                })
            .catch(res => {
                setStatus("error");
                setMessage(res.response.data.message);
                setOpenAlert(true);
            });
            
        }
        
    }
    const postData = async (e) => {
         e.preventDefault();
        const dataPost = {
            ClassFresherId: id,
            DateStart: datetime,
            ModuleName: moduleName
        }

        await Axios.post(`https://localhost:5001/api/AuditResult/AddAllFresherForAuditModule`, 
           dataPost
        ,).then(res => {
        });
    }
    
    const columns = [
        { field: "accountName", width: 100 },
        { field: "lastName", width: 100 },
        { field: "firstName", width: 100 }
    ];    
    const columns1 = [
        { field: "accountName", width: 100 },
        { field: "lastName", width: 100 },
        { field: "firstName", width: 100 }
    ];    
    return (
        <div>            
            <div>                
                <h4>Create Plan Audit: {classCode}</h4>                
                <Collapse in={openAlert}>
                    <Alert
                        style={{
                            width: 350,
                            marginTop: '-7%',
                            marginLeft: '72%',
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
                <Table style={{
                    marginTop: '0%'
                }}>
                    <Row style={{
                        marginLeft: '19%'
                    }}>                                              
                        <Col md={3}>
                            <Box sx={{ minWidth: 30 }}>
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
                            </Box>
                        </Col> 
                        <Col md={4} style={{
                            width: 50
                        }}>
                            <Stack component="form" noValidate spacing={3}>
                                <TextField
                                    id="datetime-local"
                                    label="Day Start"
                                    type="datetime-local"
                                    defaultValue={moment(curDate).format('YYYY-MM-DDThh:mm')}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dateStart}
                                    onChange={handlechangeDateStart}
                                />
                            </Stack>
                        </Col>
                        <Col md={1}>
                            <Button color='success' onClick={postDataWithMember} style={{
                                marginLeft: '-40%', marginTop: '30%'
                            }} disabled={!id}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Table>
                <Table style={{
                    marginLeft:'5%'
                }}>
                    <Row>
                        <Col md={4}>
                            {<DataGrid
                                rows={listFresher}
                                columns={columns}
                                pageSize={5}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver',
                                    height: 400, width: '100%', marginLeft: 20
                                }}
                                onCellClick={(value) => addFresher(
                                    value.id, value.row.accountName, value.row.firstName, value.row.lastName
                                )}
                            />}
                        </Col>
                        <Col md={4} >
                            <Row style={{
                                marginTop: '35%'
                            }}>
                                <Col md={6}>
                                    <Button variant="contained"
                                        color='success'
                                        onClick={getAllFresher}
                                    >
                                        <i className="fa-solid fa-angles-right" />
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{
                                marginTop: '5%'
                            }}>
                                <Col md={6}>
                                    <Button variant="contained"
                                        color='danger'
                                        onClick={RemoveAllFresher}
                                    >
                                        <i className="fa-solid fa-angles-left" />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            {<DataGrid
                                rows={listFresherGet}
                                columns={columns1}
                                pageSize={5}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver', width: '100%',
                                    marginLeft: '-40%', height: 400
                                }}
                                onCellClick={(value) => removeFresher(
                                    value.id, value.row.accountName, value.row.firstName, value.row.lastName
                                )}
                            />}
                        </Col>
                    </Row>
                </Table>
                
            </div>
        </div>
    );
}

export default CreatePlanAudit;
