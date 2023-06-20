import React, { useState, useEffect } from 'react';
import {useLocation, useHistory} from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material'
import  Axios  from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 465,
    width: 610
}));
function UpdateDetailAudit() {  
    const location = useLocation();
    const history = useHistory();
    const classId = location.state.classId;
    const id = location.state.id;
    const moduleName = location.state.moduleName;
    const codeClass = location.state.codeClass;
    const accountName = location.state.accountName;
    const auditorId = location.state.auditorId;
    const numberAudit = location.state.numberAudit;
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState();
    const [status, setStatus] = useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [listQuestion, setListQuestion] = useState([]);
    const [numberQuestion, setNumberQuestion] = useState(0);
    const dataGetQuestion = {
        moduleName: moduleName,
        numberAudit: numberAudit
    }
    const handleOpen = (numberQuestion) => {
        setOpen(true);
        setNumberQuestion(numberQuestion)
        let mount = true;
        if (id != null) {
            Axios.post(`https://localhost:5001/api/QuestionManagement/GetAllQuestionInPlanAudit`, 
                            dataGetQuestion 
                    ,)
                .then(res => {
                    if (mount) {
                        if(res.data.data.length > 0){
                            setListQuestion(res.data.data); 
                        }
                        console.log("Khong có dữ liệu");                       
                    }
                });
        }
    };
    const columns1 = [
        { field: "questionName", width: 450 }
    ];
    const ChooseQuestion = (questionName) => {
        setQuestionQ1(questionName)
    }
    // get location evaluate
    const evaluateQ1Get = location.state.evaluateQ1;
    const evaluateQ2Get = location.state.evaluateQ2;
    const evaluateQ3Get = location.state.evaluateQ3;
    const evaluateQ4Get = location.state.evaluateQ4;
    // useState Evaluate
    const [evaluateQ1, setevaluateQ1] = React.useState('');
    const handleChangeEvaluateQ1 = (event) => {
        setevaluateQ1(event.target.value);
    };
    const [evaluateQ2, setevaluateQ2] = React.useState('');
    const handleChangeEvaluateQ2 = (event) => {
        setevaluateQ2(event.target.value);
    };
    const [evaluateQ3, setevaluateQ3] = React.useState('');
    const handleChangeEvaluateQ3 = (event) => {
        setevaluateQ3(event.target.value);
    };
    const [evaluateQ4, setevaluateQ4] = React.useState('');
    const handleChangeEvaluateQ4 = (event) => {
        setevaluateQ4(event.target.value);
    };
    // get question
    const questionQ1Get = location.state.questionQ1;
    const questionQ2Get = location.state.questionQ2;
    const questionQ3Get = location.state.questionQ3;
    const questionQ4Get = location.state.questionQ4;
    console.log(classId);
    // useState question
    const [questionQ1, setQuestionQ1] = React.useState(questionQ1Get);
    const handleChangeQuestionQ1 = (event) => {
        setQuestionQ1(event.target.value);
        console.log(questionQ1);
    };
    const [questionQ2, setQuestionQ2] = React.useState(questionQ2Get);
    const handleChangeQuestionQ2 = (event) => {
        setQuestionQ2(event.target.value);
    };
    const [questionQ3, setQuestionQ3] = React.useState(questionQ3Get);
    const handleChangeQuestionQ3 = (event) => {
        setQuestionQ3(event.target.value);
    };
    const [questionQ4, setQuestionQ4] = React.useState(questionQ4Get);
    const handleChangeQuestionQ4 = (event) => {
        setQuestionQ4(event.target.value);
    };
    // get comment
    const commentQ1Get = location.state.commentQ1;
    const commentQ2Get = location.state.commentQ2;
    const commentQ3Get = location.state.commentQ3;
    const commentQ4Get = location.state.commentQ4;
    // useState comment
    const [commentQ1, setCommentQ1] = React.useState(commentQ1Get);
    const handleChangeCommentQ1 = (event) => {
        setCommentQ1(event.target.value);
    };
    const [commentQ2, setCommentQ2] = React.useState(commentQ2Get);
    const handleChangeCommentQ2 = (event) => {
        setCommentQ2(event.target.value);
    };
    const [commentQ3, setCommentQ3] = React.useState(commentQ3Get);
    const handleChangeCommentQ3 = (event) => {
        setCommentQ3(event.target.value);
    };
    const [commentQ4, setCommentQ4] = React.useState(commentQ4Get);
    const handleChangeCommentQ4 = (event) => {
        setCommentQ4(event.target.value);
    };
    // get data end
    const practiceCommentGet = location.state.practiceComment;
    const practiceScoreGet = location.state.practiceScore;
    const auditCommentGet = location.state.auditComment;
    // useState end
    const [practiceComment, setPracticeComment] = React.useState(practiceCommentGet);
    const handleChangePracticeComment = (event) => {
        setPracticeComment(event.target.value);
    };
    const [practiceScore, setPracticeScore] = React.useState(practiceScoreGet);
    const handleChangePracticeScore = (event) => {
        setPracticeScore(event.target.value);
    };
    const [auditComment, setAuditComment] = React.useState(auditCommentGet);
    const handleChangeAuditComment = (event) => {
        setAuditComment(event.target.value);
    };
    const postData = async (e) => {
        e.preventDefault();
        console.log(evaluateQ1);
        const UpdateAuditViewModel = {
            auditorId: auditorId,
            questionQ1: questionQ1,
            commentQ1: commentQ1,
            evaluateQ1: evaluateQ1,
            questionQ2: questionQ2,
            commentQ2: commentQ2,
            evaluateQ2: evaluateQ2,
            questionQ3: questionQ3,
            commentQ3: commentQ3,
            evaluateQ3: evaluateQ3,
            questionQ4: questionQ4,
            commentQ4: commentQ4,
            evaluateQ4: evaluateQ4,
            practiceComment: practiceComment,
            practiceScore: practiceScore,
            auditComment: auditComment,
            status: true
        };
        if(questionQ1.length == 0){
            setStatus('warning')
            setMessage('Please enter input QuestionQ1');
            setOpenAlert(true);
        }
        else if(commentQ1.length == 0){
            setStatus('warning')
            setMessage('Please enter input commentQ1');
            setOpenAlert(true);
        }
        else if(evaluateQ1.length == 0){
            setStatus('warning')
            setMessage('Please enter input EvaluateQ1');
            setOpenAlert(true);
        }
        else if(questionQ2.length == 0){
            setStatus('warning')
            setMessage('Please enter input QuestionQ2');
            setOpenAlert(true);
        }
        else if(commentQ2.length == 0){
            setStatus('warning')
            setMessage('Please enter input CommentQ2');
            setOpenAlert(true);
        }
        else if(evaluateQ2.length == 0){
            setStatus('warning')
            setMessage('Please enter input EvaluateQ2');
            setOpenAlert(true);
        }
        else if (questionQ3.length == 0) {
            setStatus('warning')
            setMessage('Please enter input QuestionQ3');
            setOpenAlert(true);
        }
        else if (commentQ3.length == 0) {
            setStatus('warning')
            setMessage('Please enter input CommentQ3');
            setOpenAlert(true);
        }
        else if (evaluateQ3.length == 0) {
            setStatus('warning')
            setMessage('Please enter input EvaluateQ3');
            setOpenAlert(true);
        }
        else if (questionQ4.length == 0) {
            setStatus('warning')
            setMessage('Please enter input QuestionQ4');
            setOpenAlert(true);
        }
        else if (commentQ4.length == 0) {
            setStatus('warning')
            setMessage('Please enter input CommentQ4');
            setOpenAlert(true);
        }
        else if (evaluateQ4.length == 0) {
            setStatus('warning')
            setMessage('Please enter input EvaluateQ4');
            setOpenAlert(true);
        }
        else if(practiceComment.length == 0){
            setStatus('warning')
            setMessage('Please enter input Practice Comment');
            setOpenAlert(true);
        }
        else if(practiceScore.length == 0){
            setStatus('warning')
            setMessage('Please enter input practice score');
            setOpenAlert(true);
        }
        else if(practiceScore < 0 || practiceScore > 10){
            setStatus('warning')
            setMessage('Please enter input practice score to 0 from 10');
            setOpenAlert(true);
        }
        else if(auditComment.length == 0){
            setStatus('warning')
            setMessage('Please enter input Audit Comment');
            setOpenAlert(true);
        }
        else{
            await Axios.put(`https://localhost:5001/api/AuditResult/UpdateAuditForStudent/${id}`,
                UpdateAuditViewModel
        ,).then(res => {
                    console.log(res);
                    setStatus('success')
                    setMessage('Submit success');
                    setOpenAlert(true);
                    setTimeout(function () {
                        history.goBack();
                    }, 1500);
                })
          .catch(res => {
              setStatus('error')
              setMessage(res.response.data.message);
              setOpenAlert(true);
          });
        }
    }
    console.log(classId, id, moduleName, codeClass);
    return (
        <div style={{
            position: 'absolute', left: '55%', top: '60%',
            transform: 'translate(-50%, -50%)', height: '60%', width: '70%'
        }}>
            <Grid container spacing={2} xs={12} style={{
                marginTop: '-10%'
            }}>
                <Grid item xs={6}>
                    <h4>Module Name: {moduleName}</h4>
                </Grid>
                <Grid item xs={6} style={{
                    marginLeft: '-15%'
                }}>
                    <h4>Account Name: {accountName}</h4>
                </Grid>
            </Grid>
            <Collapse in={openAlert}>
                <Alert
                    style={{
                        width: 350,
                        marginTop: '-5%',
                        marginLeft: '65%'
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
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{
                    marginTop: '-2%'
                }}>                    
                    <Grid container spacing={4} xs={12}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Question Q1"
                                multiline
                                maxRows={4}
                                value={questionQ1}
                                onChange={handleChangeQuestionQ1}
                            />
                        </Grid>
                        <Grid item xs={2} style={{
                            marginTop: '2%'
                        }}>
                            <Button variant='contained' color="success" onClick={handleOpen}>
                                <i className="fa-solid fa-circle-plus" />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Comment Q1"
                                multiline
                                maxRows={4}
                                value={commentQ1}
                                onChange={handleChangeCommentQ1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Evaluate Q1</InputLabel>
                                <Select
                                    displayEmpty
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={evaluateQ1}
                                    label="Evaluate Q1"
                                    onChange={handleChangeEvaluateQ1}
                                >
                                    <MenuItem value={0}>Don't Pass</MenuItem>
                                    <MenuItem value={1}>Improve</MenuItem>
                                    <MenuItem value={2}>Pass</MenuItem>
                                    <MenuItem value={3}>Good</MenuItem>
                                    <MenuItem value={4}>Excellence</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>                        
                    </Grid>
                    <Grid container spacing={4} xs={12}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Question Q2"
                                multiline
                                maxRows={4}
                                value={questionQ2}
                                onChange={handleChangeQuestionQ2}
                            />
                        </Grid>
                        <Grid item xs={2} style={{
                            marginTop: '2%'
                        }}>
                            <Button variant='contained' color="success" onClick={handleOpen}>
                                <i className="fa-solid fa-circle-plus" />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Comment Q2"
                                multiline
                                maxRows={4}
                                value={commentQ2}
                                onChange={handleChangeCommentQ2}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Evaluate Q2</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={evaluateQ2}
                                    label="Evaluate Q2"
                                    onChange={handleChangeEvaluateQ2}
                                >
                                    <MenuItem value={0}>Don't Pass</MenuItem>
                                    <MenuItem value={1}>Improve</MenuItem>
                                    <MenuItem value={2}>Pass</MenuItem>
                                    <MenuItem value={3}>Good</MenuItem>
                                    <MenuItem value={4}>Excellence</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} xs={12}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Question Q3"
                                multiline
                                maxRows={4}
                                value={questionQ3}
                                onChange={handleChangeQuestionQ3}
                            />
                        </Grid>
                        <Grid item xs={2} style={{
                            marginTop: '2%'
                        }}>
                            <Button variant='contained' color="success" onClick={handleOpen}>
                                <i className="fa-solid fa-circle-plus" />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Comment Q3"
                                multiline
                                maxRows={4}
                                value={commentQ3}
                                onChange={handleChangeCommentQ3}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Evaluate Q3</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={evaluateQ3}
                                    label="Evaluate Q3"
                                    onChange={handleChangeEvaluateQ3}
                                >
                                    <MenuItem value={0}>Don't Pass</MenuItem>
                                    <MenuItem value={1}>Improve</MenuItem>
                                    <MenuItem value={2}>Pass</MenuItem>
                                    <MenuItem value={3}>Good</MenuItem>
                                    <MenuItem value={4}>Excellence</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} xs={12}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Question Q4"
                                multiline
                                maxRows={4}
                                value={questionQ4}
                                onChange={handleChangeQuestionQ4}
                            />
                        </Grid>
                        <Grid item xs={2} style={{
                            marginTop: '2%'
                        }}>
                            <Button variant='contained' color="success">
                                <i className="fa-solid fa-circle-plus" />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Comment Q4"
                                multiline
                                maxRows={4}
                                value={commentQ4}
                                onChange={handleChangeCommentQ4}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Evaluate Q4</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={evaluateQ4}
                                    label="Evaluate Q4"
                                    onChange={handleChangeEvaluateQ4}
                                >
                                    <MenuItem value={0}>Don't Pass</MenuItem>
                                    <MenuItem value={1}>Improve</MenuItem>
                                    <MenuItem value={2}>Pass</MenuItem>
                                    <MenuItem value={3}>Good</MenuItem>
                                    <MenuItem value={4}>Excellence</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} xs={12}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Practice Comment"
                                multiline
                                maxRows={4}
                                value={practiceComment}
                                onChange={handleChangePracticeComment}
                            />
                        </Grid>
                        <Grid item xs={2} style={{
                            marginTop: '2%'
                        }}>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Practice Score"
                                multiline
                                maxRows={4}
                                value={practiceScore}
                                onChange={handleChangePracticeScore}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Audit Comment"
                                multiline
                                maxRows={4}
                                value={auditComment}
                                onChange={handleChangeAuditComment}
                            />
                        </Grid>
                        
                    </Grid>
                </div>
            </Box>
            <Button variant="contained"
                onClick={postData}
                style={{
                    marginBottom: 20,
                    marginLeft: '93%', marginTop: '-8%'
                }}
            >Submit</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div style={{
                    marginTop: '5%', height: 400, width: '80%',
                    marginLeft: '30%'
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Item>
                            <Button onClick={handleClose}></Button>
                            {<DataGrid
                                rows={listQuestion}
                                columns={columns1}
                                pageSize={5}
                                style={{
                                    borderRadius: '10px', borderColor: 'silver',
                                    height: '87%', marginTop: '7%'
                                }}
                                onCellClick={(value) => ChooseQuestion(
                                    value.row.questionName
                                )}
                            />}
                        </Item>
                    </Box>
                </div>
            </Modal>
        </div>
    );
}

export default UpdateDetailAudit;
