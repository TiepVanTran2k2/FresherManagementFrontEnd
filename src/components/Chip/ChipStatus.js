import React from "react";
import { Box,Chip } from "@mui/material";
function ChipStatus({ label, labelChip, color }) {
  return (
    <Box style={{display:"flex", alignItems:"center", margin:"10px"}}>
      <Chip label={labelChip} color={color}  padding="10" />
      <p style={{marginLeft:"10px"}}>{label}</p>
    </Box>
  );
}

export default ChipStatus;
