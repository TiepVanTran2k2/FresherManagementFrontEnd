import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
const axios = require('axios').default;

const columns = [
  { field: '_Id', headerName: '_Id', hide: true },
  { field: 'chemicalType', headerName: 'chemical Type', width: 200 },
  { field: 'preHarvestIntervalInDays', headerName: 'preHarvest Interval InDays', type: 'number', width: 200 },
  {
    field: 'activeIngredient',
    headerName: 'active Ingredient',
    width: 200,
  },
  {
    field: 'name',
    headerName: 'name header',
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    width: 200,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'creationDate',
    headerName: 'creation Date',
    width: 300,
  }
];

export default function DataTable() {
  const [chemicals, setChemicals] = React.useState([]);
  
  React.useEffect(() => {
    axios.get('https://localhost:5001/api/Chemical/GetChemicalPagingsion?pageIndex=0&pageSize=10').then((response) => {
      setChemicals(response.data.items);
    });
  }, []);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._Id}
        rows={chemicals}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
      />
    </div>
  );
}
