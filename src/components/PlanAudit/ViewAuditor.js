import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 410,
    width: 610
}));
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 465,
    width: 420,
    marginLeft: '25%',

    fontFamily: 'opensans_bold'
}));

function ViewAuditor() {
    const [list, setList] = useState([]);
    const location = useLocation();
    const classId = location.state.classId;
    const moduleName = location.state.moduleName;
    const codeClass = location.state.codeClass;
    const numberAudit = location.state.numberAudit;
    const [id, setId] = useState();
    const [listAuditor, setListAuditor] = useState([]);
    const [checkClickAdd, setCheckClickAdd] = useState(0);
    const [checkClickRemove, setCheckClickRemove] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    console.log(classId)
    const dataGet = {
        classId: classId,
        nameModule: moduleName,
        numberAudit: numberAudit
    }
    useEffect(() => {
        let mount = true;
        Axios.post(`https://localhost:5001/api/AuditResult/GetAuditorOfClassModule`,
            dataGet
        ,)
            .then(res => {
                if (mount) {
                    setListAuditor(res.data)
                    if(res.data.length === 0){
                        setListAuditor([]);
                        console.log("khong cos du lieu");
                    }
                    console.log(res.data)

                }
            });
    }, []);
    const addAudit = (id, accountName, email, skill) => {
        setCheckClickAdd(checkClickAdd+1);
        if(checkClickAdd == 1){
            setId(id);
            const data = {
                id: id,
                username: accountName,
                email: email,
                skills: skill
            }
            setListAuditor([...listAuditor, data]);
            setList(list.filter(item => item.id !== id));
        }
        setTimeout(function(){
            setCheckClickAdd(0);
        },1000)
    }
    const removeAuditor = (id, accountName, email, skill) => {
        setCheckClickRemove(checkClickRemove+1);
        if(checkClickRemove == 1){
            const data = {
                id: id,
                username: accountName,
                email: email,
                skills: skill
            }
            setListAuditor(listAuditor.filter(item => item.id !== id));
            setList([...list, data]);
        }
        setTimeout(function(){
            setCheckClickRemove(0);
        }, 1000)        
    } 
    const postData = async (e) => {
        e.preventDefault();
        const dataPost = {
            GetAuditByClassIdAndNumberAuditViewModel: dataGet,
            AuditorViewModels: listAuditor
        };
        await Axios.put(`https://localhost:5001/api/AuditResult/AddAduditorForPlanAudit`,
            dataPost
        ,).then(res => {
            console.log(res);
            setStatus("success")
            setMessage(res.data.message)
            setOpenAlert(true);
        });
    }
    const columns = [
        { 
            width: 0,
            renderCell: (cellValues) => {
                return <i class="fa-solid fa-user-large"
                style={{
                    marginLeft: '75%'
                }}
                ></i>
            }
        },
        { field: "username", width: 100 },
        { field: "email", width: 190 },
        { field: "skills", width: 200 }
    ];
    const columns1 = [
        {
            width: 0,
            renderCell: (cellValues) => {
                return <i class="fa-solid fa-user-large"
                    style={{
                        marginLeft: '75%'
                    }}
                ></i>
            }
        },
        { field: "username", width: 100 },        
        { field: "skills", width: 250 }      

    ];
    useEffect(() => {
        let mount = true;
        Axios.post(`https://localhost:5001/api/AuditResult/GetAllAudit`, dataGet ,)
            .then(res => {
                if (mount) {
                    setList(res.data.data);
                    console.log(res.data.data)

                }
            });
    }, []);
    return (
        <div style={{
            position: 'absolute',
            marginTop: '0%', height: 400, width: '63%',
            marginLeft: 25
        }}>
            <h5>Code Class: {codeClass}</h5>
            <h5>Add auditor module: {moduleName}</h5>
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

            <Box sx={{ flexGrow: 1 }}>                
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={8}>
                        <Item>
                            {<DataGrid
                                rows={list}
                                columns={columns}
                                pageSize={5}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver'
                                }}
                                onCellClick = {
                                    (value) => addAudit(
                                        value.id, value.row.username, value.row.email, value.row.skills
                                    )
                                }

                            />}
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item1>
                            {<DataGrid
                                style={{
                                    borderRadius: '10px', borderColor: 'silver',
                                    height: 400, marginBottom: 10
                                }}
                                rows={listAuditor}
                                columns={columns1}   
                                onCellClick={
                                    (value) => removeAuditor(
                                        value.id, value.row.username, value.row.email, value.row.skills
                                    )
                                }                          
                            />}
                            <Button variant="contained" onClick={postData} disabled={!listAuditor.length}>Submit</Button>

                        </Item1>
                    </Grid>                    
                </Grid>
            </Box>
        </div>
    );
}
export default ViewAuditor;