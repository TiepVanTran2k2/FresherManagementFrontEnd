import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Grid,TextField,Button } from "@mui/material";
import { useState } from "react";
import { FeedbackQuestionType } from "../../common/Constant";

export const AddNewFeedbackQuestion = (props) => {
  const { handleClose, addQuestion, onAddFeedbackQuestionClick } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [questionTypes, setQuestionType] = useState(FeedbackQuestionType.All);
  const [content, setContent] = useState("");

  const onTitleChange = (e) => { setTitle(e.target.value) };
  const onDescriptionChange = (e) => { setDescription(e.target.value) };
  const onContentChange = (e) => { setContent(e.target.value) };

  const onAddClick = async () => {
    let question = { title, description, content, feedbackAnswers: [], questionType: selectedQuestion };
    handleClose();
    if(onAddFeedbackQuestionClick){
      onAddFeedbackQuestionClick(question);
      return;
    }
    addQuestion(question);
  };

  const onQuestionSelectionChange = (e) => { setSelectedQuestion(e.target.value) };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader title="Create new Question" />
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
                <Select labelId="demo-simple-select-label" id="demo-simple-select" fullWidth  label="Question Type" variant="outlined"
                  value={selectedQuestion} onChange={onQuestionSelectionChange}>
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
              <TextField fullWidth id="content" label="Content" variant="outlined" defaultValue={content}
                onChange={onContentChange}
              />
            </Grid>
            <Grid container spacing={2} marginTop="10px" marginRight="10px" display="flex" justifyContent="end">
              <Grid item xs={12} sm={10} display="flex" justifyContent="end">
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
              <Grid item xs={12} sm={2} display="flex" justifyContent="end">
                <Button variant="contained" onClick={onAddClick}>Add</Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
