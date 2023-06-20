import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { httpGet } from "../../helpers/fetchHelper";

import Message from "../../components/Message/Message";
const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "classCode",
    headerName: "Class Code",
    width: 200,
  },
  {
    field: "className",
    headerName: "Class Name",
    width: 200,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
    renderCell: (params) => (
      <div>{new Date(params.value).toLocaleDateString("en-GB")}</div>
    ),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 200,
    renderCell: (params) => (
      <div>{new Date(params.value).toLocaleDateString("en-GB")}</div>
    ),
  },

  {
    field: "xem",
    headerName: "",
    width: 280,
    renderCell: (params) => (
      <Link
        to={{
          pathname: "/overview-attendance",
          state: { id: params.row.id, classCode: params.row.classCode },
        }}
        style={{ textDecoration: "none" }}
      >
        <Button variant="outlined" color="success">
          List Attendance
        </Button>
      </Link>
    ),
  },
];

export default function ClassAttendance() {
  const [listClass, setListClass] = useState([]);
  const [date, setDate] = useState(new Date());
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const url = `ClassFresher/GetAllClassFresherPagingsion`;

  useEffect(() => {
    httpGet(
      url,
      {
        pageSize: pageSize,
        pageIndex: pageIndex
      }
    )
      .then((response) => {
        console.log(response)
        setListClass(response.data.items);
      });
  }, [pageSize, pageIndex]);

  return (
    <div style={{ marginLeft: "3%", padding: "10px" }}>
      <h2>Attendance</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/attendances"
            >
              Class
            </a>
          </li>
          <li className="breadcrumb-item active">
            List Attendance
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Detail
          </li>
        </ol>
      </nav>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          page={pageIndex}
          onPageChange={(newPage) => setPageIndex(newPage)}
          rows={listClass}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          components={{
            NoRowsOverlay: () => (
              <Stack spacing={1} height="100%" direction="column" alignItems="center" justifyContent="center">
                <CircularProgress />
                <p>Getting class...</p>
              </Stack>
            ),
          }}
        />
      </div>
      <Message notify={notify} setNotify={setNotify} />
    </div>
  );
}
