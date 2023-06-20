import {  Box,  Card,  CardContent,  CardHeader,  FormControl,  InputLabel,  Select,  MenuItem,  Typography,  Divider} from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { FeedbackQuestionType } from "../../common/Constant";

export const UpdateFeedbackQuestion = (props) => {
  const { handleClose, saveQuestion, question, onUpdateFeedbackQuestionClick } = props;
  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description);
  const [selectedQuestion, setSelectedQuestion] = useState(question.questionType);
  const [content, setContent] = useState(question.content);
  const questionTypes= FeedbackQuestionType.All;

  const onTitleChange = (e) => { setTitle(e.target.value) };
  const onDescriptionChange = (e) => { setDescription(e.target.value) };
  const onContentChange = (e) => { setContent(e.target.value) };
  const onUpdateClick = () => {
    let question = {
      ...props.question,
      title,
      description,
      content,
      questionType: selectedQuestion,
    };
    if (onUpdateFeedbackQuestionClick) {
      onUpdateFeedbackQuestionClick(question)
    }
    saveQuestion(question);
    handleClose();
  };

  const onQuestionSelectionChange = (e) => { setSelectedQuestion(e.target.value) };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader title="Update Question" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth id="title" label="Title" variant="outlined" defaultValue={title}
                onChange={onTitleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={selectedQuestion}
                  label="Question Type"
                  variant="outlined"
                  onChange={onQuestionSelectionChange}>
                  {
                    questionTypes?.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth id="description" label="Description" variant="outlined" defaultValue={description}
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="content"
                label="Content"
                variant="outlined"
                defaultValue={content}
                onChange={onContentChange}
              />
            </Grid>
            <Grid item sm={12} margin={"10px"}>
              <Divider variant="middle" />
            </Grid>
            <Grid
              container
              spacing={2}
              marginTop="10px"
              marginRight="10px"
              display="flex"
              justifyContent="end"
            >
              <Grid item xs={12} sm={10} display="flex" justifyContent="end">
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
              <Grid item xs={12} sm={2} display="flex" justifyContent="end">
                <Button variant="contained" onClick={onUpdateClick}>Update</Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
