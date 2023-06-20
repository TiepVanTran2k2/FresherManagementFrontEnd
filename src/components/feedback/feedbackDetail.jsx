import {
  Box, Card, CardContent, CardHeader, Typography, Select, MenuItem, TextField,
  InputAdornment, IconButton, InputLabel, FormControl
} from "@mui/material";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { httpGet } from '../../helpers/fetchHelper';
import Alert from '../../components/feedback/alert';

export const FeedbackDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [feedback, setFeedback] = useState();
  const [rows, setRows] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [filterResult, setFilterResult] = useState({ questionId: "", accountName: "" });
  const [alert, setAlert] = useState({ show: false, content: '' });


  const onQuestionSelectionChange = (e) => {
    setSelectedQuestion(e.target.value);
    setFilterResult({ ...filterResult, questionId: e.target.value });
  };

  const columns = [
    { field: "id", flex: 1, headerName: "ID", minWidth: 100, hide: true },
    { field: "accountName", flex: 1, headerName: "Account Name", minWidth: 100 },
    // { field: "fullname", flex: 1, headerName: "Fullname", minWidth: 100 },
    { field: "questionTitle", flex: 1, headerName: "Question", minWidth: 100 },
    { field: "content", flex: 1, headerName: "Answer", minWidth: 100 },
    { field: "note", flex: 1, headerName: "Note", minWidth: 100 },
  ];

  useEffect(() => {
    httpGet(`Feedback/GetFeedbackById`, { feedbackId: id })
      .then((response) => {
        if (response.success) {
          setFeedback(response.data);
        } else {
          console.log(response);
        }
      });

    httpGet(`Feedback/GetAllResultOfFeedback`, { feedbackId: id })
      .then((response) => {
        if (response.success) {
          setRows(response.data);
        } else {
          console.log(response);
        }
      });

    httpGet(`Feedback/SearchFeedbackQuestion`, { feedbackId: id, pageSize: 100 })
      .then((response) => {
        if (response.success) {
          setQuestions(response.data.items);
        } else {
          console.log(response);
        }
      });
  }, []);

  const filterFeedbackResult = (params) => {
    httpGet(`Feedback/SearchFeedbackResult`, { questionId: params.questionId, accountName: params.accountName })
      .then((response) => {
        if (response.success) {
          setRows(response.data.items);
        } else {
          setAlert({ content: response.message, show: true });
        }
      });
  };

  const handleCloseAlert = () => {
    setAlert({ show: false });
  };

  const onSearch = () => filterFeedbackResult(filterResult);
  const onSearchChange = (e) => {
    setSearchBar(e.target.value);
    setFilterResult({ ...filterResult, accountName: e.target.value });
  };

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState([{ field: "id", sort: "asc" }]);

  const handleSortModelChange = (newModel) => setSortModel(newModel);
  return (
    <>
      <Alert Content={alert.content} Show={alert.show} onCloseAlert={handleCloseAlert} />
      <div style={{ width: "100%" }}>
        <Box sx={{ p: 3 }}>
          <Card>
            <CardHeader title="Feedback Details" />
            <CardContent>
              <Button variant="contained" style={{ float: "right" }} onClick={() => { history.push(`/feedback/update/${id}`) }}>
                Update
              </Button>
              <Grid container spacing={2} marginLeft="5px">

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography id="title" label="Title" variant="outlined" fontWeight={900}>Title:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="title" label="Title" variant="outlined">{feedback?.title}</Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography id="description" label="Description" fontWeight={900} variant="outlined">Description:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="description" label="Description" variant="outlined">{feedback?.description}</Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography id="content" label="Content" fontWeight={900} variant="outlined">Content:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="content" label="Content" variant="outlined">{feedback?.content}</Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography id="date_start" label="Date Start" fontWeight={900} variant="outlined">Date Start:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography id="date_start" label="Date Start" variant="outlined">{feedback?.startDate}</Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <Typography id="date_end" label="Date End" fontWeight={900} variant="outlined">Date End:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography type="datetime-local" id="date_end" label="Date End" variant="outlined">{feedback?.endDate}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Box>
        {/* <Box sx={{ p: 3 }} width> */}
        <Box>
          <Card>
            <CardHeader title="Feedback Results" />
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={4} padding="10px">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Question</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" fullWidth value={selectedQuestion}
                      label="Question" variant="outlined" onChange={onQuestionSelectionChange}>
                      <MenuItem value="">All Question</MenuItem>
                      {
                        questions?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.title}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} padding="10px">
                  <TextField
                    fullWidth
                    id="outlined-required"
                    label="Search by account name"
                    onChange={onSearchChange}
                    defaultValue={searchBar}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={onSearch}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <DataGrid
                autoHeight
                columns={columns}
                loading={loading}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSortModelChange={handleSortModelChange}
                pageSize={pageSize}
                page={page}
                rows={rows}
                getRowId={(r) => r.feedbackResultId}
                rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
                rowCount={rows?.length}
                sortModel={sortModel}
                disableVirtualization={true}
              />
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};
