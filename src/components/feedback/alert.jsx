import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
export default function Alert(props) {
  return <>
    <Dialog
      aria-describedby="alert-dialog-description"
      open={props.Show}
    >
      <DialogContent sx={{ minWidth: 300 }}>
        <DialogContentText id="alert-dialog-description">
          {props.Content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCloseAlert}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}