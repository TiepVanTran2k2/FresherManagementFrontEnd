import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeedbackQuestionType } from "../../common/Constant";
import axios from "axios";

export const AddNewFeedbackResult = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);

  const handleChange = (e, index) => {
    const resultClone = {...result[index]};
    const {answers} = resultClone;
    const id = e.target.id;
    const value = e.target.checked;
    const answerIndex = answers.findIndex(x=>x.id === id);
    const answerArray = [];
    answerArray.push({id, content: value})
    resultClone.answers = [
      ...answers.slice(0, answerIndex),
      ...answerArray,
      ...answers.slice(answerIndex + 1, questions.length),
    ];
    const resultArray = [];
    resultArray.push(resultClone);
    setResult([
      ...result.slice(0, index),
      ...resultArray,
      ...result.slice(index + 1, questions.length),
    ])

  };

  useEffect(() => {
    axios
      .get(`https://localhost:5001/api/Feedback/GetFeedbackById?id=${id}`)
      .then((response) => {
        setFeedback(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://localhost:5001/api/Feedback/SearchFeedbackQuestion?FeedBackId=${id}&PageSize=100`
      )
      .then((response) => {
        setQuestions(response.data.items);
        initialResult(response.data.items)
      });
  }, []);

  const initialResult = (questions) => {
    const newResult = [];
    questions?.map((question) => {
      const answers = question?.feedbackAnswers.map((x)=> {return {id: x.id, content: false}})
      newResult.push({ questionId: question.id, answers: answers });
    });
    setResult(newResult);
  };

  const onSubmitClick = () => {
    console.log(result);
  };

  const feedbackInformation = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item sm={12} display='flex'>
            <Typography fontWeight={600}>Title: </Typography>
            <Typography>{feedback.title}</Typography>
          </Grid>
          <Grid item sm={12} display='flex'>
            <Typography fontWeight={600}>Content: </Typography>
            <Typography>{feedback.content}</Typography>
          </Grid>
          <Grid item sm={12} display='flex'>
            <Typography fontWeight={600}>Discription: </Typography>
            <Typography>{feedback.description}</Typography>
          </Grid>
        </Grid>
      </>
    );
  };

  const generateAnswer = (question, index) => {
    const { feedbackAnswers, questionType } = question;
    switch (questionType) {
      case FeedbackQuestionType.MultipleChoices:
        return (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              {feedbackAnswers?.map((answer) => {
                return (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox onChange={(e) => handleChange(e, index)} id={answer.id} />
                    }
                    label={answer.content}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        );

      case FeedbackQuestionType.SingleChoice:
        return (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              {feedbackAnswers?.map((answer) => {
                return (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox onChange={(e) => handleChange(e, index)} id={answer.id} />
                    }
                    label={answer.content}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        );

      case FeedbackQuestionType.RatingScale:
        return (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              {feedbackAnswers?.map((answer) => {
                return (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox onChange={(e) => handleChange(e, index)} id={answer.id} />
                    }
                    label={answer.content}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        );

      case FeedbackQuestionType.OpenEnded:
        return (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              {feedbackAnswers?.map((answer) => {
                return (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox onChange={(e) => handleChange(e, index)} id={answer.id} />
                    }
                    label={answer.content}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        );

      default:
        return (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              {feedbackAnswers?.map((answer) => {
                return (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox onChange={(e) => handleChange(e, index)} id={answer.id} />
                    }
                    label={answer.content}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        );
    }
  };

  const generateQuestion = (question, index) => {
    return (
      <Grid item xs={12} sm={12} key={index}>
        <Typography>
          Question {index}: {question.content}
        </Typography>
        <Grid container item spacing={2}>
          {generateAnswer(question, index)}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader title="Feedback Result" />
        <CardContent>
          {feedbackInformation()}
          {questions?.map((question, index) => generateQuestion(question, index))}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} display="flex" justifyContent="end">
              <Button variant="contained" size="small" onClick={onSubmitClick}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
