import React from "react";
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Modal from "../../components/reminder/create-form-modal";
import axios from 'axios';
import Constants from "../../Constants";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Loading from "../../components/Loading";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { httpGet, httpPost } from '../../helpers/fetchHelper';
import { formatDateToDDMMYYYY , formatDateToMMDDYYYY} from '../../helpers/convertDateHelper';
class Reminder extends React.Component {

    createData(subject, reminderTime1, reminderTime2, type) {
        return { subject, reminderTime1, reminderTime2, type };
    }

    state = {
        rows: [],
        todayReminderRows: [],
        value: "1"
    }
    handleChange = (_, newValue) => {
        this.setState({ value: newValue }, function () {
            console.log(this.state);
        });
    };
    onReminderCreated = reminder => {
        this.setState({
            rows: [...this.state.rows, reminder],

        })
    }
  async   componentDidMount() {
       await  httpGet(`Reminders/GetReminder`)
            .then(res => {
                const result = res.data;
                this.setState({ rows: result });
            })
            .catch(error => console.log(error));
        var today = new Date();
        var eventTime = formatDateToMMDDYYYY(today);
        console.log(today)
        console.log(eventTime)
       await  httpGet(`Reminders/GetReminder`, 
       {eventTime: eventTime})
            .then(res => {
                
                const result = res.data;
                this.setState({ todayReminderRows: result });
            })
            .catch(error => console.log(error));
    }
    render() {
        <Loading></Loading>
        const rows = this.state.rows;
        const todayReminderRows = this.state.todayReminderRows;
        const columns = [
            { field: 'id', headerName: 'Id', width: 20, hide: true},
            { field: 'subject', headerName: 'Subject', width: 450,headerAlign : 'center' },
            { field: 'reminderTime1', headerName: 'First time of reminder',headerAlign : 'center' ,
             width: 160, align : 'center', valueFormatter: ({ value }) =>formatDateToDDMMYYYY(new Date(value).toLocaleDateString()) },
            { field: 'reminderTime2', headerName: 'Second time of reminder', width: 180, align : 'center',headerAlign : 'center' ,
            valueFormatter: ({ value }) => !value ? null : formatDateToDDMMYYYY(new Date(value).toLocaleDateString()) },
            { field: 'reminderType', headerName: 'Type', width: 150,align : 'center',headerAlign : 'center' , valueFormatter: ({ value }) => Constants.ReminderType[value] },
            {
                field: 'isComplete', headerName: 'Status', width: 100, 
                align : 'center',
                headerAlign : 'center' ,
                renderCell: (isComplete) => {
                    if (isComplete.value === false) {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <AccessTimeOutlinedIcon color="danger" fontSize="22"></AccessTimeOutlinedIcon>
                            </div>
                        );
                    }
                    else if (isComplete.value === true) {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}> 
                                <AssignmentTurnedInOutlinedIcon color="success" fontSize="22"></AssignmentTurnedInOutlinedIcon>
                            </div>
                        );
                    }
                },
            }
        ]
        return (

            <div id="body">
                <Loading
                    dataTask={async () => await httpGet(`Reminders/GetReminder`)}
                    onSuccess={(success) => console.log(success)} />

                <div className="container-xl content">
                    <div className="div-button">
                        <Modal onModalFormSubmit={this.onReminderCreated} />
                    </div>
                    <br/>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={this.state.value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={this.handleChange} aria-label="lab API tabs example">
                                    <Tab label="All" value="1" />
                                    <Tab label="Today" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div className="table">
                                    <DataGrid
                                        autoHeight
                                        rows={rows}
                                        columns={columns}
                                        experimentalFeatures={{ newEditingApi: true }}
                                        components = {{Toolbar : GridToolbar }}
                                        sx={{
                                            boxShadow: 2,
                                            border: 2,
                                            borderColor: 'primary.light',
                                            '& .MuiDataGrid-cell:hover': {
                                              color: 'primary.main',
                                            },
                                          }}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div className="table">
                                    <DataGrid
                                        borderColor = '#66FFFF'
                                        autoHeight
                                        rows={todayReminderRows}
                                        columns={columns}
                                        experimentalFeatures={{ newEditingApi: true }}  
                                        sx={{
                                            boxShadow: 2,
                                            border: 2,
                                            borderColor: 'primary.light',
                                            '& .MuiDataGrid-cell:hover': {
                                              color: 'primary.main',
                                            },
                                          }}
                                    />
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>

                </div>
            </div>
        )
    }
}
export default Reminder;