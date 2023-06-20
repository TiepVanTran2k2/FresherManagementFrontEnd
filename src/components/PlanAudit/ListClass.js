import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ViewPlanAudit from './ViewPlanAudit';

const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    //padding: theme.spacing(1),
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    height: 410,
    width: 310
}));
const Item1 = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    height: 410,
    width: 690,
    marginLeft: 190,
    fontFamily: 'opensans_bold',
}));
function ListClass() {

    const [list, setList] = useState([]);
    const [id, setId] = useState();
    const [codeClass, setCodeClass] = useState("None");
    const GetId = (id,codeClass) =>{
        setCodeClass(codeClass);
        setId(id);
    }
    console.log(id, codeClass);
    const columns = [
        {  
          width: 25,
            renderCell: (cellValues) => {
                return <i class="fa-solid fa-house">                    
                </i>
            }
        },
        { title: "Class Code", field: "classCode", width: 255 }
    ];
    useEffect(() => {
        let mount = true;
        Axios.get('https://localhost:5001/api/AuditResult/GetPlanAudit')
            .then(res => {
                if (mount) {
                    setList(res.data.data);
                    console.log(res.data.data)
                }
            });
    }, []);    
    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', height: '60%', width: '60%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <Item>
                            {<DataGrid
                                sx={{
                                    ".MuiDataGrid-columnSeparator": {
                                        display: "none",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "green",
                                        color: "White",
                                        fontSize: 16,
                                    },
                                }}
                                rows={list}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onCellClick={(value) =>GetId(
                                    value.id, value.row.classCode
                                )}
                            />}
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item1>
                            <ViewPlanAudit id={id} codeClass={codeClass} />
                        </Item1>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default ListClass;
