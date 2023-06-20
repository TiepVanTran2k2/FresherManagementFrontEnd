// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import { DataGrid } from '@mui/x-data-grid';
// import TablePagination from '@mui/material/TablePagination';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];

//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];

// export default function PlanData() {

    //call api GetAllPlan
  // React.useEffect(() => {
  //   axios.get("https://localhost:44301/api/plan/getallplan?pageIndex="+
  //                                    pageIndex+"&pageSize="+rowsPerPage)
  //        .then((response) =>{
  //           setPlan(response.data.items);
  //           setTotalRecord(response.data.totalItemsCount)
  //   });
  // },[pageIndex,rowsPerPage,reloadplanPage]);
  
  //   const [plans, setPlan] = React.useState([]);
  //   const [page, setPage] = React.useState(0);

  //   const paginationHandleChange = (params) => {
  //       console.log(params);
  //       setPage(params.page);
  //   }

  //   const handleChangeRowsPerPage = (event) => {
  //       setRowsPerPage(parseInt(event.target.value, 10));
  //       setPage(0);
  //     };

  //   return (
  //       <>
  //           <Typography gutterBottom variant="h4" component="div"
  //               sx={{width: '50%', margin:'10px 15px', color:'rgb(33, 43, 54);'}}
  //           >   
  //               Plan List
  //           </Typography>
  //           <div style={{ height: 400, width: '100%' }}>
  //           <DataGrid
  //               rows={rows}
  //               columns={columns}
  //               page={page}
  //               disableSelectionOnClick={true}
  //               onPageChange={paginationHandleChange}
  //               onRowsPerPageChange={handleChangeRowsPerPage}
  //               pageSize={10}
  //               rowCount={100}
  //               rowsPerPageOptions={[5]}
  //               // checkboxSelection
  //           />
  //           </div>
            
  //       </>

  //   )
// }
