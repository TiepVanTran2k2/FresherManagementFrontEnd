import React, { useState } from "react";
import { configEnv } from "../../configs/config";
import DataTableImportClass from "../../components/ClassFresher/DataTableImportClass";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { httpPost } from "../../helpers/fetchHelper";

export default function ImportClassFresherPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [classFresher, setClassFresher] = useState();
  const [hasFile, setHasFile] = useState(false);
  const [isExistedClass, setIsExistedClass] = useState("modal fade");
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmission = () => {
    setIsLoading(true);
    if (hasFile) {
      const formData = new FormData();
      formData.append("fileExcel", selectedFile);
      ImportFile(formData);
    } else {
      setIsOpen(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };
  const ImportFile = async (formData) => {
    console.log(typeof formData);
    await httpPost(
      "ClassFresher/CreateClassFresherFromImportedFile",
      formData,
      {
        isSendFile: true,
      }
    )
      .then((res) => { 
        setClassFresher(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data.statusCode === 500) {
          setMessage(err.response.data.message);
          setIsExistedClass("modal fade show");
          setIsLoading(false);
        }
      });
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setHasFile(true);
  };
  const CloseModal = () => {
    setIsExistedClass("modal fade");
  };

  return (
    <div className="class-fresher">
      {isOpen ? (
        <div
          class="position-fixed top-0 end-0 p-3"
          style={{ zIndex: "99999", top: "0", right: "0", color: "white" }}
        >
          <div
            class="toast fade show"
            role="alert"
            style={{ backgroundColor: "red" }}
          >
            <div class="toast-body" style={{ fontSize: "20px" }}>
              Please chosse file or drag file
            </div>
          </div>
        </div>
      ) : null}
      <div
        class={isExistedClass}
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={
          isExistedClass === "modal fade show"
            ? { display: "block", backgroundColor: "rgb(0,0,0,0.5)" }
            : { display: "none" }
        }
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Some class is already existed
              </h5>
              <button
                onClick={CloseModal}
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{message}</div>
            <div class="modal-footer">
              <button
                onClick={CloseModal}
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Close
              </button>
              <a type="button" class="btn btn-danger" href="/classes">
                Go to list class
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade show"
        id="exampleModal1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={
          isLoading
            ? { display: "block", backgroundColor: "rgb(0,0,0,0.5)" }
            : { display: "none" }
        }
      >
        <div class="modal-dialog" role="document" style={{ top: "50%" }}>
          <div
            class="modal-content"
            style={{
              background: "transparent",
              boxShadow: "none",
              border: "none",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div class="modal-body">
              <div class="spinner-border text-primary m-1" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/classes">Class</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Import
          </li>
        </ol>
      </nav>
      <div>
        <div className="card">
          <div className="card-body">
            <label
              for="file-upload"
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                border: "1px dotted black",
              }}
            >
              <h3
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "80px",
                }}
              >
                {selectedFile !== undefined
                  ? selectedFile.name
                  : "Drag file to import"}
              </h3>
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              onChange={changeHandler}
              style={{ display: "none" }}
            />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <button className="btn-classfresher" onClick={handleSubmission}>
                <CloudUploadIcon /> &nbsp; Import Class
              </button>
            </div>
          </div>
        </div>
        {classFresher !== undefined ? (
          <div>
            <div className="container-import-class">
              {classFresher.map((fresher) => {
                return (
                  <DataTableImportClass
                    key={fresher.rrCode}
                    classFresher={fresher}
                  ></DataTableImportClass>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
