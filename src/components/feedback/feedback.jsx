import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  DataGrid, GridActionsCellItem, GridToolbarColumnsButton, GridToolbarContainer,
  GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, IconButton, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { httpGet, httpDelete } from '../../helpers/fetchHelper';
import Alert from '../../components/feedback/alert';
import CircularProgress from '@mui/material/CircularProgress';
import {Stack} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { GridCellModes } from "@mui/x-data-grid/models";

const Feedbacks = () => {
  const history = useHistory();
  const active = useRef(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState();
  const [sortModel, setSortModel] = useState([{ field: "id", sort: "asc" }]);
  const [upsertOpen, setUpsertOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState('');
  const [alert, setAlert] = useState({ show: false, content: '' });

  const handleAddClick = () => { history.push("/feedback/create") };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  //Callback từ AlertComponent để close alert
  const handleCloseAlert = () => {
    setAlert({ show: false });
  };

  //load data vào datagrid
  const loadData = async () => {
    await httpGet('Feedback/SearchFeedback')
      .then((response) => {
        setRows(response.data.items);
      }).catch((error) => {
        console.log(error);
      });
  }

  //Event Click xác nhận Delete
  const handleConfirmationClick = async () => {
    var url = 'Feedback/DeleteFeedback/' + feedbackId;
    await httpDelete(url)
      .then((response) => {
        if (response.success) {
          setAlert({ content: 'Deleted Successfully!', show: true });
          loadData();
        } else {
          setAlert({ content: response.message, show: true });
        }
      });
    setConfirmationOpen(false)
  };

  // Event click nút Delete
  const handleDeleteClick = async (params) => {
    setFeedbackId(params.id);
    setRowData(params.row);
    setConfirmationOpen(true);
  };

  // Event click nút Edit
  const handleEditClick = (params) => {
    setRowData(params.row);
    setUpsertOpen(true);
  };

  const handleFetch = useCallback(async () => {
    setLoading(true)
    try {
    } catch (error) { }
    setLoading(false);
  }, [active, page, pageSize, sortModel]);

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  useEffect(() => {
    active.current = true;
    handleFetch();
    return () => { active.current = false };
  }, [active, handleFetch]);

  const columns = [
    { field: "id", flex: 1, headerName: "Feedback ID", identity: true, hide: true, minWidth: 100 },
    { field: "title", flex: 1, headerName: "Title", minWidth: 100 },
    { field: "startDate", flex: 1, headerName: "Start Date", minWidth: 100,type:'date',valueGetter: ({ value }) => value && new Date(value) },
    { field: "endDate", flex: 1, headerName: "End Date", minWidth: 100,type:'date',valueGetter: ({ value }) => value && new Date(value) },
    {
      field: "actions", flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          style={{ color: '#FC4850' }}
          onClick={() => handleDeleteClick(params)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          style={{ color: 'orange' }}
          onClick={() => handleEditClick(params)}
        />,
      ],
      type: "actions",
      minWidth: 100,
    },
  ];

  const toolbar = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <GridToolbarContainer>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  const loadingOverlay = () => (
    <Stack height="100%" direction="column" alignItems="center" justifyContent="center">
      {rows !== [] ? <CircularProgress /> : <ErrorIcon color='error' fontSize='large' />}
      {rows !== [] ? <p>Getting data...</p> : <p>Something went wrong !</p>}
    </Stack>
  );

  const dataGrid = (
    <DataGrid
      autoHeight
      columns={columns}
      getRowId={(r) => r.feedbackId}
      rows={rows}
      onRowClick={(e) => history.push(`feedback/${e.id}`)}
      rowCount={rows.length}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      components={{ Toolbar: toolbar ,
                    NoRowsOverlay:loadingOverlay
                }}
      loading={loading }
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      onSortModelChange={handleSortModelChange}
      style={{ cursor: 'pointer' }}
      pageSize={pageSize}
      pagination
      sortModel={sortModel}
      disableVirtualization={true}
     
    />
  );

  const dialog = (
    <Dialog
      aria-describedby="alert-dialog-description"
      open={confirmationOpen}
      onClose={() => setConfirmationOpen(false)}
    >
      <DialogContent sx={{ minWidth: 240 }}>
        <DialogContentText id="alert-dialog-description">
          Delete feedback?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
        <Button onClick={handleConfirmationClick} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box p={3} width>
      <Card sx={{ p: 1 }}>
        <CardHeader
          action={
            <Box sx={{ mr: 1 }}>
              <Button onClick={handleAddClick}
                startIcon={<AddCircleIcon />}
                variant="outlined">
                Add Feedback
              </Button>
            </Box>
          }
          title="Feedback"
          titleTypographyProps={{ component: "h3", variant: "h5" }}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sx={12} marginY="10px">
              <TextField
                fullWidth
                id="outlined-required"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sx={12}>
              {dataGrid}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {dialog}
      <Alert Content={alert.content} Show={alert.show} onCloseAlert={handleCloseAlert} />
    </Box>
  );
};

export default Feedbacks;
