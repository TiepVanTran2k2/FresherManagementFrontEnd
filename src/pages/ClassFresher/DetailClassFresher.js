import React, { useState, useEffect } from "react";
import { httpGet } from "../../helpers/fetchHelper";
import { useParams, useHistory } from "react-router-dom";
import { configEnv } from "../../configs/config";
import DataTableClassFresher from "../../components/ClassFresher/DataTableDetailClass";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function DetailClassFresher() {
  let { id } = useParams();
  const [classFresher, setClassFresher] = useState();
  const history = useHistory();

  const GotoEdit = (id) => {
    history.push(`/classes/edit/${id}`);
  };

  useEffect(() => {
    let isActive = false;
    if (!isActive) {
      fetchData();
    }
    return () => {
      isActive = true;
    };
  }, [id]);

  async function fetchData() {
    await httpGet(`ClassFresher/GetClassWithFresherByClassId/${id}`).then(
      (data) => {
        setClassFresher(data.data);      
      }
    );
  }
  return (
    <div className="class-fresher">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/classes">Class</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Detail
          </li>
        </ol>
      </nav>
      {classFresher !== undefined ? (
        <div>
          <div class="alert alert-success" role="alert">
            {classFresher.classCode}
          </div>
          <div class="container" style={{ display: "contents" }}>
            <div class="row">
              <div class="col-md-3">
                <div class="mini-stats-wid card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <p class="text-muted fw-medium mb-2">Total Fresher</p>
                        <h4 class="mb-0">{classFresher.freshers.length}</h4>
                      </div>
                      <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                        <span class="avatar-title">
                          <AccountCircleIcon fontSize="large" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mini-stats-wid card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <p class="text-muted fw-medium mb-2">Start Date</p>
                        <h4 class="mb-0">
                          {classFresher.startDate.slice(0, 10)}
                        </h4>
                      </div>
                      <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                        <span class="avatar-title">
                          <CalendarMonthIcon fontSize="large" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mini-stats-wid card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <p class="text-muted fw-medium mb-2">End Date</p>
                        <h4 class="mb-0">
                          {classFresher.endDate.slice(0, 10)}
                        </h4>
                      </div>
                      <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                        <span class="avatar-title">
                          <CalendarMonthIcon fontSize="large" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mini-stats-wid card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <p class="text-muted fw-medium mb-2">Plan</p>
                        <h4 class="mb-0">Module C#</h4>
                      </div>
                      <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                        <span class="avatar-title">
                          <EventNoteIcon fontSize="large" color="red" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4>Admin</h4>
            <div style={{ display: "flex" }}>
              <div class="row" style={{ width: "100%" }}>
                <div class="col-sm-6 col-xl-4">
                  <div class="card">
                    <div class="card-body" style={{ padding: "10px 20px" }}>
                      <div>
                        <span
                          class="d-block text-primary text-decoration-underline mb-2"
                          href="/invoices-detail/1"
                        >
                          {classFresher.emailAdmin1 === null
                            ? "No admin"
                            : classFresher.emailAdmin1}
                        </span>
                        <h5>{classFresher.nameAdmin1}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-4">
                  <div class="card">
                    <div class="card-body" style={{ padding: "10px 20px" }}>
                      <div>
                        <a
                          class="d-block text-primary text-decoration-underline mb-2"
                          href="/invoices-detail/1"
                        >
                          {classFresher.emailAdmin2 === null
                            ? "No admin"
                            : classFresher.emailAdmin2}
                        </a>
                        <h5>{classFresher.nameAdmin2}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-4">
                  <div class="card">
                    <div class="card-body" style={{ padding: "10px 20px" }}>
                      <div>
                        <a
                          class="d-block text-primary text-decoration-underline mb-2"
                          href="/invoices-detail/1"
                        >
                          {classFresher.emailAdmin3 === null
                            ? "No admin"
                            : classFresher.emailAdmin3}
                        </a>
                        <h5>{classFresher.nameAdmin3}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4>Trainer</h4>
            <div class="row" style={{ width: "100%" }}>
              <div class="col-sm-6 col-xl-4">
                <div class="card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div>
                      <span
                        class="d-block text-primary text-decoration-underline mb-2"
                        href="/invoices-detail/1"
                      >
                        {classFresher.emailTrainer1 === null
                          ? "No trainer"
                          : classFresher.emailTrainer1}
                      </span>
                      <h5>{classFresher.nameTrainer1}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-4">
                <div class="card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div>
                      <a
                        class="d-block text-primary text-decoration-underline mb-2"
                        href="/invoices-detail/1"
                      >
                        {classFresher.emailTrainer2 === null
                          ? "No trainer"
                          : classFresher.emailTrainer2}
                      </a>
                      <h5>{classFresher.nameTrainer2}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-4">
                <div class="card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <div>
                      <a
                        class="d-block text-primary text-decoration-underline mb-2"
                        href="/invoices-detail/1"
                      >
                        {classFresher.emailTrainer3 === null
                          ? "No trainer"
                          : classFresher.emailTrainer3}
                      </a>
                      <h5>{classFresher.nameTrainer3}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => GotoEdit(classFresher.id)}
              type="button"
              class="btn btn-success"
            >
              Edit Class
            </button>
          </div>
          <h4>List freshers</h4>
          <DataTableClassFresher
            freshers={classFresher.freshers}
            isEdit={false}
          ></DataTableClassFresher>
        </div>
      ) : (
        <div>Something was wrong</div>
      )}
    </div>
  );
}
