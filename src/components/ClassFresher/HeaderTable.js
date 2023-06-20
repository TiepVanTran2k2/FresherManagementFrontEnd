import PropTypes from "prop-types";
// material
import {
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function UserListHead({
  headLabel,
}) {

  return (
    <TableHead style={{ backgroundColor: "#4e73df", color : "red" }}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
