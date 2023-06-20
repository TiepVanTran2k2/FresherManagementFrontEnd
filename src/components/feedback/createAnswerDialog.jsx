import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FeedbackQuestionType } from "../../common/Constant";

export const AddNewAnswer = (props) => {
  const {
    handleClose,
    addAnswer,
    updateAnswer,
    questions,
    indexQuestion,
    answerIndex,
    isUpdate,
    onAddFeedbackAnswerClick,
    onUpdateFeedbackAnswerClick,
  } = props;
  const [content, setContent] = useState("");

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (answerIndex >= 0) {
      const answer = questions[indexQuestion].feedbackAnswers[answerIndex];
      setContent(answer.content);
    }
  }, []);

  const onAddClick = () => {
    let answer = {
      content,
    };
    handleClose();
    if(onAddFeedbackAnswerClick && !isUpdate){
      onAddFeedbackAnswerClick(questions[indexQuestion], content, indexQuestion);
      return;
    }
    addAnswer(questions[indexQuestion], answer, indexQuestion);
  };

  const onUpdateClick = () => {
    handleClose();
    if(onUpdateFeedbackAnswerClick && isUpdate){
      onUpdateFeedbackAnswerClick(questions[indexQuestion], answerIndex, indexQuestion, content);
      return;
    }
    updateAnswer(questions[indexQuestion], answerIndex, indexQuestion, content);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader title={`${isUpdate? 'Update': 'Create new'} Answer`} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="content"
                label="Content"
                variant="outlined"
                value={content}
                onChange={onContentChange}
              />
            </Grid>
            <Grid
              container
              spacing={2}
              marginTop="10px"
              marginRight="10px"
              display="flex"
              justifyContent="end"
            >
              <Grid item xs={12} sm={9} display="flex" justifyContent="end">
                <Button variant="contained" size="small" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
              {isUpdate ? (
                <Grid item xs={12} sm={3} display="flex" justifyContent="end">
                  <Button variant="contained" onClick={onUpdateClick}>
                    Update
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12} sm={3} display="flex" justifyContent="end">
                  <Button variant="contained" size="small" onClick={onAddClick}>
                    Add
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
