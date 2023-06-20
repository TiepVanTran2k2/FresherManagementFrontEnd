import {  Box,  Card,  CardContent,  Divider,  CardHeader,  Dialog,  Typography} from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useState } from "react";
import { UpdateFeedbackQuestion } from "../../components/feedback/updateQuestionDialog";
import { AddNewFeedbackQuestion } from "../../components/feedback/createQuestionDialog";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { FeedbackQuestionType } from "../../common/Constant";
import { AddNewAnswer } from "../../components/feedback/createAnswerDialog";
import { httpGet, httpDelete } from '../../helpers/fetchHelper';

export const UpdateFeedback = (props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [questions, setQuestions] = useState(props.questions ?? []);
  const [question, setQuestion] = useState(null);
  const [index, setIndexSelected] = useState(0);
  const { id } = useParams();
  const [indexQuestion, setQuestionIndex] = useState(0);
  const [indexAnswer, setAnswerIndex] = useState(-1);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  const handleUpdateDialogClose = () => { setOpenUpdateDialog(false) };

  const openUpdateQuestionDialog = (index) => {
    setQuestion(questions[index]);
    setIndexSelected(index);
    setOpenUpdateDialog(true);
  };

  const addAnswer = (questionParam, answer, index) => {
    let feedbackAnswers = [
      ...(questionParam.feedbackAnswers ? questionParam.feedbackAnswers : []),
    ];
    feedbackAnswers.push(answer);
    questionParam.feedbackAnswers = [...feedbackAnswers];
    let questionArray = [];
    questionArray.push(questionParam);
    setQuestions([
      ...questions.slice(0, index),
      ...questionArray,
      ...questions.slice(index + 1, questions.length),
    ]);
  };

  const onTitleChange = (e) => { setTitle(e.target.value); };

  const onDescriptionChange = (e) => { setDescription(e.target.value) };

  const onContentChange = (e) => { setContent(e.target.value) };

  const onDateStartChange = (e) => { setDateStart(e.target.value) };

  const onDateEndChange = (e) => { setDateEnd(e.target.value) };

  useEffect(() => {

    httpGet('Feedback/GetFeedbackById', { feedbackId: id })
      .then(response => {
        if (response.success) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setContent(response.data.content);
          setDateStart(response.data.startDate);
          setDateEnd(response.data.endDate);
        } else {
          console.log(response.message);
        }
      });

      httpGet('Feedback/SearchFeedbackQuestion', { feedbackId: id,pageSize:100 })
      .then(response => {
        if (response.success) {
          setQuestions(response.data.items);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  const addQuestion = (param) => {
    let newQuestions = [...questions];
    newQuestions.push(param);
    setQuestions(newQuestions);
  };

  const updateQuestion = (param) => {
    const questionArray = [];
    questionArray.push(param);
    setQuestions([
      ...questions.slice(0, index),
      ...questionArray,
      ...questions.slice(index + 1, questions.length),
    ]);
  };

  const removeQuestion = (param) => {
    setQuestions([
      ...questions.slice(0, param),
      ...questions.slice(param + 1, questions.length),
    ]);
  };

  const onCreateNewFeedbackQuestionClick = (question) => {
    const data = { ...question, feedBackId: id };
    axios
      .post(`https://localhost:5001/api/Feedback/CreateFeedbackQuestion`, data)
      .then((response) => {
        if (response.data) {
          addQuestion(response.data);
        }
      });
  };

  const onAddFeedbackAnswerClick = (question, content, index) => {
    const data = { content, questionId: question.id };
    axios
      .post(`https://localhost:5001/api/Feedback/CreateFeedbackAnswer`, data)
      .then((response) => {
        if (response.data) {
          addAnswer(question, response.data, index);
        }
      });
  };

  const onUpdateFeedbackQuestionClick = (question) => {
    const { id, title, content, description, status } = question;
    const data = { id, title, content, description, status, feedBackId: id };
    axios
      .put(`https://localhost:5001/api/Feedback/UpdateFeedbackQuestion`, data)
      .then((response) => {
        console.log(response);
      });
  };

  const onUpdateFeedbackAnswerClick = (question, answerIndex, index, content) => {
    const answer = question.feedbackAnswers[answerIndex];
    const data = { content, questionId: question.id, id: answer.id };
    axios
      .put(`https://localhost:5001/api/Feedback/UpdateFeedbackAnswer`, data)
      .then((response) => {
        if (response.data) {
          updateAnswer(question, answerIndex, index, content);
        }
      });
  };

  const handleClickOpenAnswerDialog = (index, isUpdate, answerIndex) => {
    setIsUpdate(isUpdate);
    setAnswerIndex(answerIndex);
    setOpenAnswerDialog(true);
    setQuestionIndex(index);
  };

  const handleCloseAnswerDialog = () => { setOpenAnswerDialog(false) };

  const onUpdateFeedbackClick = () => {
    const body = {
      id,
      title,
      description,
      content,
      startDate: dateStart,
      endDate: dateEnd,
    };
    axios
      .put(`https://localhost:5001/api/Feedback/UpdateFeedback`, body)
      .then((response) => {
        console.log("response", response);
      });
  };

  const onBackClick = () => { history.push(`/feedback`) };

  const updateAnswer = (question, answerIndex, index, content) => {
    const answerArray = [];
    const answer = question.feedbackAnswers[answerIndex];
    answer.content = content;
    answerArray.push(answer);
    const answers = [...question.feedbackAnswers];
    question.feedbackAnswers = [
      ...answers.slice(0, answerIndex),
      ...answerArray,
      ...answers.slice(answerIndex + 1, questions.length),
    ];
    const questionArray = [];
    questionArray.push(question);
    setQuestions([
      ...questions.slice(0, index),
      ...questionArray,
      ...questions.slice(index + 1, questions.length),
    ]);
  };

  const removeAnswer = (question, answerIndex, index) => {
    let { feedbackAnswers } = question;
    axios
      .delete(`https://localhost:5001/api/Feedback/DeleteFeedbackAnswer/${feedbackAnswers[answerIndex].id}`)
      .then((response) => {
        feedbackAnswers = [
          ...feedbackAnswers.slice(0, answerIndex),
          ...feedbackAnswers.slice(answerIndex + 1, feedbackAnswers.length),
        ]; 
        question.feedbackAnswers = [...feedbackAnswers];
        let questionArray = [];
        questionArray.push(question);
        setQuestions([
          ...questions.slice(0, index),
          ...questionArray,
          ...questions.slice(index + 1, questions.length),
        ]);
      });
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Card>
          <CardHeader title="Update Feedback Information" />
         
          <CardContent>
            <Grid container spacing={2}>
            
            <Grid item xs={7} height={500} sx={{ overflow: 'auto' }}>
            {
              questions?.map((question, index) => {
              return (
                <Box key={index} margin="5px" padding="5px" >
                  <Card>
                  <Grid container display='flex'>
                  <Grid item sm={10}>
                  <CardHeader title={`Question ${index + 1}`} />

                  </Grid>
                  <Grid item sm={2}>
                          <Button style={{margin:'15px auto'}} onClick={() => openUpdateQuestionDialog(index)}>Update</Button>
                  </Grid>
                  </Grid>
                    
                    <CardContent>
                      <Grid container spacing={2} display="flex">

                        <Grid container sm={11} item spacing={2}>
                         
                          <Grid item sm={5} display="flex" margin={"4px"}>
                            <Typography fontWeight={600}>Title: </Typography>
                            <Typography>{question.title}</Typography>
                          </Grid>
                          
                          <Grid item sm={5} display="flex" margin={"4px"}>
                            <Typography fontWeight={600}>Description:</Typography>
                            <Typography>{question.description}</Typography>
                          </Grid>
                         
                          <Grid item sm={5} display="flex" margin={"4px"}>
                            <Typography fontWeight={600}>Content:</Typography>
                            <Typography>{question.content}</Typography>
                          </Grid>
                          
                          <Grid item sm={5} display="flex" margin={"4px"}>
                            <Typography fontWeight={600}>Question Type:</Typography>
                            <Typography>
                              {
                                FeedbackQuestionType.getFeedbackQuestionType(question.questionType)
                              }
                            </Typography>
                          </Grid>
                          
                          <Grid item sm={12}>
                            <Divider  />
                          </Grid>

                        </Grid>
                      </Grid>
                      <Grid container spacing={2} display="flex">
                        <Grid container sm={11} item spacing={2}>
                          {
                            question.feedbackAnswers?.map(
                              (answer, answerIndex) => {
                                return (
                                  <Grid item md={5} key={answerIndex}
                                    display="flex" justifyContent="space_between" alignItems="center" marginLeft={"10px"}
                                  >
                                    <div style={{ display: "flex", alignItems: "center" }}>

                                      <Typography fontWeight={600}>Answer {answerIndex + 1}:</Typography>
                                      <Typography>{answer.content}</Typography>

                                      <Button size="small" onClick={() => handleClickOpenAnswerDialog(index, true, answerIndex)}>
                                        <EditIcon />
                                      </Button>

                                      <Button size="small" onClick={() => removeAnswer(question, answerIndex, index)}>
                                        <DeleteIcon />
                                      </Button>

                                    </div>
                                  </Grid>
                                );
                              })
                          }
                        </Grid>
                        <Grid item style={{  margin: "10px 5px 0px auto"}}>
                          <Button
                            onClick={() => handleClickOpenAnswerDialog(index, false, -1)}
                          >
                            Add Answer
                          </Button>
                        </Grid>
                      </Grid>

                    </CardContent>
                  </Card>
                </Box>
              );
            })}
            </Grid>

            <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth InputLabelProps={{ shrink: true }} variant="outlined"
                  id="title" label="Title" value={title}  onChange={onTitleChange} 
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth InputLabelProps={{ shrink: true }}
                  id="description" label="Description" value={description}  onChange={onDescriptionChange} 
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth InputLabelProps={{ shrink: true }} variant="outlined"
                  id="content" label="Content" value={content}  onChange={onContentChange} 
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField fullWidth InputLabelProps={{ shrink: true }} variant="outlined"
                 type="datetime-local" id="date_start" label="Date Start"   value={dateStart}  onChange={onDateStartChange} 
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth InputLabelProps={{ shrink: true }}
                  type="datetime-local" id="date_end" value={dateEnd} label="Date End" onChange={onDateEndChange} variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" justifyContent="end" margin={"10px"}>
                <Button variant="contained" onClick={handleClickOpen}>Add Question</Button>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" justifyContent="end" margin={"10px"}>
                <Button variant="contained" style={{ marginRight: "10px" }} onClick={onBackClick}>Back</Button>
                <Button variant="contained" onClick={onUpdateFeedbackClick}>Update</Button>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <AddNewFeedbackQuestion
          onAddFeedbackQuestionClick={onCreateNewFeedbackQuestionClick}
          handleClose={handleClose}
          addQuestion={addQuestion}
        />
      </Dialog>
      <Dialog
        onClose={handleUpdateDialogClose}
        aria-labelledby="customized-dialog-title"
        open={openUpdateDialog}
      >
        <UpdateFeedbackQuestion
          onUpdateFeedbackQuestionClick={onUpdateFeedbackQuestionClick}
          handleClose={handleUpdateDialogClose}
          saveQuestion={updateQuestion}
          question={question}
        />
      </Dialog>
      <Dialog
        onClose={handleCloseAnswerDialog}
        aria-labelledby="customized-dialog-title"
        open={openAnswerDialog}
      >
        <AddNewAnswer
          handleClose={handleCloseAnswerDialog}
          addAnswer={addAnswer}
          updateAnswer={updateAnswer}
          onAddFeedbackAnswerClick={onAddFeedbackAnswerClick}
          onUpdateFeedbackAnswerClick={onUpdateFeedbackAnswerClick}
          answerIndex={indexAnswer}
          isUpdate={isUpdate}
          questions={questions}
          indexQuestion={indexQuestion}
        />
      </Dialog>
    </>
  );
};
