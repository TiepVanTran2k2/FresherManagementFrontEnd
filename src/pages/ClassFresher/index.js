import React, { useState, useEffect } from "react";
import { httpGet } from "../../helpers/fetchHelper";
import DataTableClassFresher from "../../components/ClassFresher/DataTableClassFresher";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ClassFresherPage() {
  const [listClass, setListClass] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    let isActive = false;
    if (!isActive) {
      fetchData();
    }
    return () => {
      isActive = true;
    };
  }, [pageIndex, pageSize]);

  async function fetchData() {
    await
    httpGet(
      `ClassFresher/GetAllClassFresherPagingsion`, 
      {
        pageIndex : pageIndex,
        pageSize : pageSize
      },

    )
    .then((res) => {
      setListClass(res.data.items);
    });
  }

  const history = useHistory();
  const GotoImport = (e) => {
    history.push(`classes/import`);
  };

  return (
    <div className="class-fresher">      
      <div className="group-btn-classfresher">
        <button onClick={GotoImport} type="button" class="btn btn-primary w-sm">
          <CloudUploadIcon></CloudUploadIcon>&nbsp; Import Class
        </button>
        &nbsp;&nbsp;&nbsp;
        {/* <button onClick={GotoCreate} type="button" class="btn btn-success w-sm">
          <ControlPointIcon></ControlPointIcon>&nbsp; Create Class
        </button> */}
      </div>
      {listClass !== undefined ? (
        <DataTableClassFresher classFresher={listClass}></DataTableClassFresher>
      ) : (
        <div>No class</div>
      )}
    </div>
  );
}
