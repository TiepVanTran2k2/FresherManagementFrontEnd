import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import {
    FresherReportCompletionStatus,
    FresherReportStatus
} from '../../configs/enums';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { httpGet, httpPost } from '../../helpers/fetchHelper';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const columns = [
    { field: 'employeeId', headerName: 'Employee ID', width: 150, hide: true },
    { field: 'nationalId', headerName: 'National ID', width: 150, hide: true },
    { field: 'account', headerName: 'Account', width: 150, hideable: false },
    { field: 'name', headerName: 'Name', width: 200, hideable: false },
    { field: 'educationInfo', headerName: 'Education Info', width: 150, hide: true },
    { field: 'universityId', headerName: 'University Id', width: 200, hide: true },
    { field: 'University Name', headerName: 'University Name', width: 200, hide: true },
    { field: 'major', headerName: 'Major', width: 200, hide: true },
    { field: 'universityGraduationDate', headerName: 'University Graduation Date', width: 200, hide: true },
    { field: 'universityGPA', headerName: 'University GPA', width: 200, hide: true },
    { field: 'educationLevel', headerName: 'Education Level', width: 200, hide: true },
    { field: 'branch', headerName: 'Branch', width: 200, hide: true },
    { field: 'parentDepartment', headerName: 'Parent Department', width: 200, hide: true },
    { field: 'site', headerName: 'Site', width: 150, hide: true },
    { field: 'courseCode', headerName: 'Course Code', width: 250, hideable: false },
    { field: 'courseName', headerName: 'Course Name', width: 250, hide: true },
    { field: 'subjectType', headerName: 'Subject Type', width: 200, hide: true },
    { field: 'subSubjectType', headerName: 'Sub-Subject Type', width: 200, hide: true },
    { field: 'formatType', headerName: 'Format Type', width: 200, hide: true },
    { field: 'scope', headerName: 'Scope', width: 200, hide: true },
    { field: 'fromDate', headerName: 'FromDate', width: 200, hideable: false },
    { field: 'toDate', headerName: 'To Date', width: 200, hideable: false },
    { field: 'learningTime', headerName: 'Learning Time', width: 200, hide: true },
    { field: 'status', headerName: 'Status', width: 200, hideable: false },
    { field: 'finalGrade', headerName: 'Final Grade', width: 200, hideable: false },
    { field: 'completionLevel', headerName: 'Completion Level', width: 200, hideable: false },
    { field: 'statusAllocated', headerName: 'Status Allocated', width: 200, hide: true },
    { field: 'salaryAllocated', headerName: 'Salary Allocated', width: 200, hide: true },
    { field: 'fsuAllocated', headerName: 'FSU Allocated', width: 200, hide: true },
    { field: 'buAllocated', headerName: 'BU Allocated', width: 200, hide: true },
    { field: 'toeicGrade', headerName: 'TOEIC Grade', width: 200, hide: true },
    { field: 'languageSkill', headerName: 'Language Skill', width: 200, hide: true },
    { field: 'updatedBy', headerName: 'Updated By', width: 200, hide: true },
    { field: 'updatedDate', headerName: 'Updated Date', width: 200, hide: true },
    { field: 'note', headerName: 'Note', width: 400, hideable: false },
    { field: 'employeeValid', headerName: 'Employee Valid', width: 200, hide: true },
    { field: 'courseStatus', headerName: 'Course Status', width: 200, hide: true },
    { field: 'courseValidOrSubjectType', headerName: 'Course Valid/Subject Type', width: 200, hide: true },
    { field: 'courseValidOrSubsubjectType', headerName: 'Course Valid/Subsubject Type', width: 200, hide: true },
    { field: 'courseValidOrFormatType', headerName: 'Course Valid/Format Type', width: 200, hide: true },
    { field: 'courseValidOrScope', headerName: 'Course Valid/Scope', width: 200, hide: true },
    { field: 'courseValidOrStartDate', headerName: 'Course Valid/Start Date', width: 200, hide: true },
    { field: 'courseValidOrEndDate', headerName: 'Course Valid/End Date', width: 200, hide: true },
    { field: 'courseValidOrLearningTime', headerName: 'Course Valid/Learning Time', width: 200, hide: true },
    { field: 'endYear', headerName: 'End Year', width: 200, hide: true },
    { field: 'endMonth', headerName: 'End Month', width: 200, hide: true },
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomGridToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
            showFirstButton
            showLastButton
        />
    );
}

const customDataGridStyles = {
    width: '100%',
    '& .MuiDataGrid-main': {
        backgroundColor: 'white',
    },
    '& .MuiDataGrid-toolbarContainer': {
        backgroundColor: '#f7f7f7',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f7f7f7',
    },
    '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#f7f7f7',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: '1px solid #f0f0f0',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
}

export default function FresherReportView() {
    const [weeklyReportData, setWeeklyReportData] = React.useState('');
    const [monthlyReportData, setMonthlyReportData] = React.useState('');
    const [weeklyReportDataGrid, setWeeklyReportDataGrid] = React.useState([]);
    const [monthlyReportDataGrid, setMonthlyReportDataGrid] = React.useState([]);
    const [tabValue, setTabValue] = React.useState(0);
    const [backDrop, setBackDrop] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const generateReportData = async (isMonthly) => {
        // await axios.get(configEnv.FETCH_STRING + 'FresherReport/GenerateFresherReport?isMonthly=' + isMonthly, {
        //     headers: {
        //         'Authorization': 'Bearer ' + token,
        //     }
        // })

        await httpGet(
            'FresherReport/GenerateFresherReport',
            {
                isMonthly: isMonthly
            })
            .then((response) => {
                if (response.success) {
                    if (isMonthly === 'false') {
                        setWeeklyReportData(response.data);
                        const reportDataGrid = JSON.parse(JSON.stringify(response.data));
                        reportDataGrid.forEach(element => {
                            element.status = FresherReportStatus[element.status];
                            element.completionLevel = FresherReportCompletionStatus[element.completionLevel];
                            element.courseStatus = FresherReportStatus[element.courseStatus];
                        });
                        setWeeklyReportDataGrid(reportDataGrid);
                    }
                    else {
                        setMonthlyReportData(response.data);
                        const reportDataGrid = JSON.parse(JSON.stringify(response.data));
                        reportDataGrid.forEach(element => {
                            element.status = FresherReportStatus[element.status];
                            element.completionLevel = FresherReportCompletionStatus[element.completionLevel];
                            element.courseStatus = FresherReportStatus[element.courseStatus];
                        });
                        setMonthlyReportDataGrid(reportDataGrid);
                    }
                }
            }).catch((error) => {
                console.log(error);
                handleErrorMessage(error);
            });
    }

    React.useEffect(() => {
        (
            async () => {
                await generateReportData('false');
            }
        )();
    }, [])

    const handleErrorMessage = (error) => {
        if (error.response === undefined) {
            setErrorMessage('Request timeout.');
        }
        else {
            const errorStatusCode = error.response.status;
            switch (errorStatusCode) {
                case 0:
                    setErrorMessage('Server downed.');
                    break;
                case 401:
                    setErrorMessage('You are not login.');
                    break;
                case 403:
                    setErrorMessage('You are not login.');
                    break;
                default:
                    setErrorMessage('An error has occurred.');
                    break;
            }
        }
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClose = () => {
        setBackDrop(false);
    };

    const handleTabClick = async (reportType) => {
        if (reportType === 'weeklyReport') {
            setWeeklyReportData('');
            setWeeklyReportDataGrid([]);
            setErrorMessage('');
            await generateReportData('false');
        }
        else {
            setMonthlyReportData('');
            setMonthlyReportDataGrid([]);
            setErrorMessage('');
            await generateReportData('true');
        }
    }

    const handleClickExport = async (event) => {
        setBackDrop(false);
        switch (event.currentTarget.id) {
            case 'exportWeeklyReportButton':
                if (weeklyReportData !== '') {
                    setBackDrop(true);
                    // axios.post(configEnv.FETCH_STRING + 'export/employee-training-history', weeklyReportData, {
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     responseType: 'blob'
                    // })

                    await httpPost(
                        'export/employee-training-history',
                        weeklyReportData,
                        {
                            responseType: 'blob'
                        })
                        .then(response => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', response.headers['file-name']);
                            document.body.appendChild(link);
                            link.click();
                            setBackDrop(false);
                        });
                }
                break;
            case 'exportMonthlyReportButton':
                if (monthlyReportData !== '') {
                    setBackDrop(true);
                    // axios.post(configEnv.FETCH_STRING + 'export/employee-training-history', monthlyReportData, {
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     responseType: 'blob'
                    // })

                    await httpPost(
                        'export/employee-training-history',
                        monthlyReportData,
                        {
                            responseType: 'blob'
                        })
                        .then(response => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', response.headers['file-name']);
                            document.body.appendChild(link);
                            link.click();
                            setBackDrop(false);
                        });
                }
                break;
            default:
                break;
        }
    };

    if (!weeklyReportData || !monthlyReportData) return (
        <Box sx={{ width: '100%' }}>
            <Container maxWidth='xl'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Weekly Report" {...a11yProps(0)} onClick={e => handleTabClick('weeklyReport')} />
                        <Tab label="Monthly Report" {...a11yProps(1)} onClick={e => handleTabClick('monthlyReport')} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Stack spacing={1} direction="row" style={{ marginBottom: 10 }}>
                        <Button id="exportWeeklyReportButton" color="success" variant="contained" startIcon={<FileDownloadIcon />} onClick={handleClickExport}>Export To Excel</Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={backDrop}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Stack>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            sx={customDataGridStyles}
                            rows={weeklyReportDataGrid}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                            pagination
                            components={{
                                Toolbar: CustomGridToolbar,
                                Pagination: CustomPagination,
                                NoRowsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        {errorMessage === '' ? <CircularProgress /> : <ErrorIcon color='error' fontSize='large' />}
                                        {errorMessage === '' ? <p>Getting fresher data...</p> : <p>{errorMessage}</p>}
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        <InfoIcon color='warning' fontSize='large' />
                                        <p>No result</p>
                                    </Stack>
                                )
                            }}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Stack spacing={1} direction="row" style={{ marginBottom: 10 }}>
                        <Button id="exportMonthlyReportButton" color="success" variant="contained" startIcon={<FileDownloadIcon />} onClick={handleClickExport}>Export To Excel</Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={backDrop}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Stack>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            sx={customDataGridStyles}
                            rows={monthlyReportDataGrid}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                            pagination
                            components={{
                                Toolbar: CustomGridToolbar,
                                Pagination: CustomPagination,
                                NoRowsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        {errorMessage === '' ? <CircularProgress /> : <ErrorIcon color='error' fontSize='large' />}
                                        {errorMessage === '' ? <p>Getting fresher data...</p> : <p>{errorMessage}</p>}
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        <InfoIcon color='warning' fontSize='large' />
                                        <p>No result</p>
                                    </Stack>
                                )
                            }}
                        />
                    </div>
                </TabPanel>
            </Container>
        </Box>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Container maxWidth='xl'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Weekly Report" {...a11yProps(0)} onClick={e => handleTabClick('weeklyReport')} />
                        <Tab label="Monthly Report" {...a11yProps(1)} onClick={e => handleTabClick('monthlyReport')} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Stack spacing={1} direction="row" style={{ marginBottom: 10 }}>
                        <Button id="exportWeeklyReportButton" color="success" variant="contained" startIcon={<FileDownloadIcon />} onClick={handleClickExport}>Export To Excel</Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={backDrop}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Stack>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            sx={customDataGridStyles}
                            rows={weeklyReportDataGrid}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                            pagination
                            components={{
                                Toolbar: CustomGridToolbar,
                                Pagination: CustomPagination,
                                NoRowsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        {errorMessage === '' ? <CircularProgress /> : <ErrorIcon color='error' fontSize='large' />}
                                        {errorMessage === '' ? <p>Getting fresher data...</p> : <p>{errorMessage}</p>}
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        <InfoIcon color='warning' fontSize='large' />
                                        <p>No result</p>
                                    </Stack>
                                )
                            }}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Stack spacing={1} direction="row" style={{ marginBottom: 10 }}>
                        <Button id="exportMonthlyReportButton" color="success" variant="contained" startIcon={<FileDownloadIcon />} onClick={handleClickExport}>Export To Excel</Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={backDrop}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Stack>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            sx={customDataGridStyles}
                            rows={monthlyReportDataGrid}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                            pagination
                            components={{
                                Toolbar: CustomGridToolbar,
                                Pagination: CustomPagination,
                                NoRowsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        {errorMessage === '' ? <CircularProgress /> : <ErrorIcon color='error' fontSize='large' />}
                                        {errorMessage === '' ? <p>Getting fresher data...</p> : <p>{errorMessage}</p>}
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                                        <InfoIcon color='warning' fontSize='large' />
                                        <p>No result</p>
                                    </Stack>
                                )
                            }}
                        />
                    </div>
                </TabPanel>
            </Container>
        </Box>
    );
}