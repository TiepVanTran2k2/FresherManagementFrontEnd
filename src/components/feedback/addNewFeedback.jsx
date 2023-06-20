import { Box, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { AddNewFeedbackQuestion } from "../../components/feedback/createQuestionDialog";
import { AddNewAnswer } from "../../components/feedback/createAnswerDialog";
import { FeedbackQuestionType } from "../../common/Constant";
import axios from "axios";

export const AddNewFeedback = () => {
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [indexQuestion, setQuestionIndex] = useState(0);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [alert, setAlert] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleClickOpenQuestionDialog = () => { setOpenQuestionDialog(true) };

  const handleAlertClose = () => { setAlert('') };

  const onTitleChange = (e) => { setTitle(e.target.value) };

  const onDescriptionChange = (e) => { setDescription(e.target.value) };

  const onContentChange = (e) => { setContent(e.target.value) };

  const onDateStartChange = (e) => { setDateStart(e.target.value) };

  const onDateEndChange = (e) => { setDateEnd(e.target.value) };

  const handleCloseQuestionDialog = () => { setOpenQuestionDialog(false) };

  const handleClickOpenAnswerDialog = (index) => {
    setOpenAnswerDialog(true);
    setQuestionIndex(index);
  };

  const handleCloseAnswerDialog = () => { setOpenAnswerDialog(false) };

  const addQuestion = (param) => {
    let newQuestions = questions;
    newQuestions.push(param);
    setQuestions(newQuestions);
  };

  const removeQuestion = (param) => {
    setQuestions([
      ...questions.slice(0, param),
      ...questions.slice(param + 1, questions.length),
    ]);
  };

  const addAnswer = (question, answer, index) => {
    let answers = [...question.feedbackAnswers];
    answers.push(answer);
    question.feedbackAnswers = [...answers];
    let questionArray = [];
    questionArray.push(question);
    setQuestions([
      ...questions.slice(0, index),
      ...questionArray,
      ...questions.slice(index + 1, questions.length),
    ]);
  };

  const removeAnswer = (question, answerIndex, index) => {
    let { feedbackAnswers } = question;
    feedbackAnswers = [
      ...feedbackAnswers.slice(0, answerIndex),
      ...feedbackAnswers.slice(answerIndex + 1, feedbackAnswers.length),
    ];

    question.feedbackAnswers = [...feedbackAnswers]
    let questionArray = [];
    questionArray.push(question);
    setQuestions([
      ...questions.slice(0, index),
      ...questionArray,
      ...questions.slice(index + 1, questions.length),
    ]);
  };
  const alertContent = (message) => {
    return <>
      <Dialog open={true} onClose={handleAlertClose} aria-labelledby="alert-dialog-title">
        <DialogTitle ia="alert-dialog-title">
          Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  }
  const onCreateNewFeedbackClick = () => {
    const data = {
      title,
      description,
      content,
      startDate: dateStart,
      endDate: dateEnd,
      feedBackQuestions: questions
    }
    console.log(data);
    axios.post(`https://localhost:5001/api/Feedback/CreateFeedback`, data)
      .then((response) => {
        setAlert('Added feddback successfully !');
      }).catch((error) => {
        setAlert('Add feddback failed !');
      });
  }

  return (
    <>
      <div>{alert && alertContent(alert)}</div>
      <Box sx={{ p: 3 }}>
        <Card>
          <CardHeader title="Create New Feedback" />
          <CardContent>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={12}>
                <TextField fullWidth id="title" label="Title" defaultValue={title} variant="outlined"
                  onChange={onTitleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <TextField fullWidth id="description" label="Description" defaultValue={description} variant="outlined"
                  onChange={onDescriptionChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField fullWidth id="Content" label="content" defaultValue={content} variant="outlined"
                  onChange={onContentChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  id="date_start"
                  label="Date Start"
                  variant="outlined"
                  defaultValue={dateStart}
                  onChange={onDateStartChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  id="date_end"
                  label="Date End"
                  variant="outlined"
                  defaultValue={dateEnd}
                  onChange={onDateEndChange}
                />
              </Grid>
              
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" justifyContent="end" margin={"10px"}>
                <Button variant="contained" onClick={handleClickOpenQuestionDialog}>Add Question</Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} display="flex" justifyContent="end" margin={"10px"}>
                <Button variant="contained" onClick={onCreateNewFeedbackClick}>Create New Feedback</Button>
              </Grid>
            </Grid>
            {
              questions?.map((question, index) => {
                return (
                  <Box key={index} margin="5px" padding="5px" sx={{ p: 3 }}>
                    <Card>
                      <CardHeader title={`Question ${index + 1}`} />
                      <CardContent>
                        <Grid container columns={12} spacing={2}>
                          <Grid item md={5} display="flex" margin={"10px"}>
                            <Typography fontWeight={600} marginRight={"10px"}>Title:</Typography>
                            <Typography>{question.title}</Typography>
                          </Grid>
                          <Grid item md={5} display="flex" margin={"10px"}>
                            <Typography fontWeight={600} marginRight={"10px"}>Description:</Typography>
                            <Typography>{question.description}</Typography>
                          </Grid>
                          <Grid item md={5} display="flex" margin={"10px"}>
                            <Typography fontWeight={600} marginRight={"10px"}>Question Type:</Typography>
                            <Typography>
                              {
                                FeedbackQuestionType.getFeedbackQuestionType(question.questionType)
                              }
                            </Typography>
                          </Grid>
                          <Grid item md={5} display="flex" margin={"10px"}>
                            <Typography fontWeight={600} marginRight={"10px"}>Content:</Typography>
                            <Typography>{question.content}</Typography>
                          </Grid>
                          <Grid item md={12}>
                            <Divider variant="middle" />
                          </Grid>
                          {question.feedbackAnswers?.map((answer, answerIndex) => {
                            return (
                              <Grid item md={5} key={answerIndex} display="flex" justifyContent="space_between" alignItems="center" margin={"10px"}>
                                <div style={{ display: "flex" }}>
                                  <Typography fontWeight={600} marginRight={"10px"}>
                                    Answer {answerIndex + 1}:
                                  </Typography>
                                  <Typography>{answer.content}</Typography>
                                </div>
                                <Button onClick={() => removeAnswer(question, answerIndex, index)}><DeleteIcon /></Button>
                              </Grid>
                            );
                          })}
                        </Grid>
                        {
                          question.questionType < 4 && (
                            <Button style={{ float: "right", paading: "15px", margin: "5px" }}
                              onClick={() => handleClickOpenAnswerDialog(index)}>
                              Add Answer
                            </Button>)
                        }
                        <Button style={{ float: "right", paading: "15px", margin: "5px" }}
                          onClick={() => removeQuestion(index)}>
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })
            }
          </CardContent>
        </Card>
      </Box>

      <Dialog onClose={handleCloseQuestionDialog}
              aria-labelledby="customized-dialog-title"
              open={openQuestionDialog}>
          <AddNewFeedbackQuestion
            handleClose={handleCloseQuestionDialog}
            addQuestion={addQuestion}
          />
      </Dialog>

      <Dialog
        onClose={handleCloseAnswerDialog}
        aria-labelledby="customized-dialog-title"
        open={openAnswerDialog}>
        <AddNewAnswer
          handleClose={handleCloseAnswerDialog}
          addAnswer={addAnswer}
          questions={questions}
          isUpdate={false}
          indexQuestion={indexQuestion}
        />
      </Dialog>
    </>
  );
};
