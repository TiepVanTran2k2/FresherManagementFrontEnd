import React from "react";
import Chip from "@mui/material/Chip";

function ChipAttendance({ status }) {
  return <>
  {status === 0 && <Chip label="P" color="success" padding="10"  />}
  {status === 1 && <Chip label="A" color="error" padding="10"   />}
  {status === 2 && <Chip label="L" color="warning" padding="10"   />}
  {status === 3 && <Chip label="E" color="warning" padding="10"  />}
  {status === 4 && <Chip label="An" color="error" padding="10"  />}
  {status === 5 && <Chip label="Ln" color="error" padding="10"  />}
  {status === 6 && <Chip label="En" color="error" padding="10"  />}
  </>;
}

export default ChipAttendance;
