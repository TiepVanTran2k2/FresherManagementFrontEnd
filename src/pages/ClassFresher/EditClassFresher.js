import React, { useState, useEffect } from "react";
import { httpGet, httpPut } from "../../helpers/fetchHelper";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { configEnv } from "../../configs/config";
import DataTableClassFresher from "../../components/ClassFresher/DataTableDetailClass";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

export default function EditClassFresher() {
  let { id } = useParams();
  const [classFresher, setClassFresher] = useState();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();

  const GotoDetail = () => {
    history.push(`/classes/detail/${id}`);
  };

  const [classInfo, setClassInfo] = useState();
  const [fresherStatusList, setFresherStatusList] = useState();

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
    await httpGet(`ClassFresher/GetClassWithFresherByClassId/${id}`)
      .then((data) => {
        setClassFresher(data.data);
        setClassInfo({
          ...classInfo,
          id: data.data.id,
          planId: data.data.planId,
          nameAdmin1: data.data.nameAdmin1,
          nameAdmin2: data.data.nameAdmin2,
          nameAdmin3: data.data.nameAdmin3,
          emailAdmin1: data.data.emailAdmin1,
          emailAdmin2: data.data.emailAdmin2,
          emailAdmin3: data.data.emailAdmin3,
          nameTrainer1: data.data.nameTrainer1,
          nameTrainer2: data.data.nameTrainer2,
          nameTrainer3: data.data.nameTrainer3,
          emailTrainer1: data.data.emailTrainer1,
          emailTrainer2: data.data.emailTrainer2,
          emailTrainer3: data.data.emailTrainer3,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const SaveInfo = async () => {
    putData();
  };

  async function putData() {
    await httpPut(`ClassFresher/UpdateClassFresher`, classInfo).then((res) => {
      if (res.success === true) {
        setMessage(res.data);
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
          GotoDetail();
        }, 1500);
      }
    });
  }

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
            style={{ backgroundColor: "green" }}
          >
            <div class="toast-body" style={{ fontSize: "20px" }}>
              {message}
            </div>
          </div>
        </div>
      ) : null}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/classes">Class</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit
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
                          <EventNoteIcon fontSize="large" />
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
                        <form class="outer-repeater">
                          <div class="mb-3">
                            <label htmlFor="formname" class="form-label">
                              Name :
                            </label>
                            <input
                              defaultValue={classFresher.nameAdmin1}
                              id="formname"
                              placeholder="Enter your Name..."
                              type="text"
                              class="form-control form-control"
                              onChange={(e) =>
                                setClassInfo({
                                  ...classInfo,
                                  nameAdmin1: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div class="mb-3">
                            <label htmlFor="formemail" class="form-label">
                              Email :
                            </label>
                            <input
                              onChange={(e) =>
                                setClassInfo({
                                  ...classInfo,
                                  emailAdmin1: e.target.value,
                                })
                              }
                              defaultValue={classFresher.emailAdmin1}
                              id="formemail"
                              placeholder="Enter your Email..."
                              type="email"
                              class="form-control form-control"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-4">
                  <div class="card">
                    <div class="card-body" style={{ padding: "10px 20px" }}>
                      <form class="outer-repeater">
                        <div class="mb-3">
                          <label htmlFor="formname" class="form-label">
                            Name :
                          </label>
                          <input
                            onChange={(e) =>
                              setClassInfo({
                                ...classInfo,
                                nameAdmin2: e.target.value,
                              })
                            }
                            defaultValue={classFresher.nameAdmin2}
                            id="formname"
                            placeholder="Enter your Name..."
                            type="text"
                            class="form-control form-control"
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="formemail" class="form-label">
                            Email :
                          </label>
                          <input
                            onChange={(e) =>
                              setClassInfo({
                                ...classInfo,
                                emailAdmin2: e.target.value,
                              })
                            }
                            defaultValue={classFresher.emailAdmin2}
                            id="formemail"
                            placeholder="Enter your Email..."
                            type="email"
                            class="form-control form-control"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-4">
                  <div class="card">
                    <div class="card-body" style={{ padding: "10px 20px" }}>
                      <form class="outer-repeater">
                        <div class="mb-3">
                          <label htmlFor="formname" class="form-label">
                            Name :
                          </label>
                          <input
                            onChange={(e) =>
                              setClassInfo({
                                ...classInfo,
                                nameAdmin3: e.target.value,
                              })
                            }
                            defaultValue={classFresher.nameAdmin3}
                            id="formname"
                            placeholder="Enter your Name..."
                            type="text"
                            class="form-control form-control"
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="formemail" class="form-label">
                            Email :
                          </label>
                          <input
                            onChange={(e) =>
                              setClassInfo({
                                ...classInfo,
                                emailAdmin3: e.target.value,
                              })
                            }
                            defaultValue={classFresher.emailAdmin3}
                            id="formemail"
                            placeholder="Enter your Email..."
                            type="email"
                            class="form-control form-control"
                          />
                        </div>
                      </form>
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
                    <form class="outer-repeater">
                      <div class="mb-3">
                        <label htmlFor="formname" class="form-label">
                          Name :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              nameTrainer1: e.target.value,
                            })
                          }
                          defaultValue={classFresher.nameTrainer1}
                          id="formname"
                          placeholder="Enter your Name..."
                          type="text"
                          class="form-control form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label htmlFor="formemail" class="form-label">
                          Email :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              emailTrainer1: e.target.value,
                            })
                          }
                          defaultValue={classFresher.emailTrainer1}
                          id="formemail"
                          placeholder="Enter your Email..."
                          type="email"
                          class="form-control form-control"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-4">
                <div class="card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <form class="outer-repeater">
                      <div class="mb-3">
                        <label htmlFor="formname" class="form-label">
                          Name :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              nameTrainer2: e.target.value,
                            })
                          }
                          defaultValue={classFresher.nameTrainer2}
                          id="formname"
                          placeholder="Enter your Name..."
                          type="text"
                          class="form-control form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label htmlFor="formemail" class="form-label">
                          Email :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              emailTrainer2: e.target.value,
                            })
                          }
                          defaultValue={classFresher.emailTrainer2}
                          id="formemail"
                          placeholder="Enter your Email..."
                          type="email"
                          class="form-control form-control"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-4">
                <div class="card">
                  <div class="card-body" style={{ padding: "10px 20px" }}>
                    <form class="outer-repeater">
                      <div class="mb-3">
                        <label htmlFor="formname" class="form-label">
                          Name :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              nameTrainer3: e.target.value,
                            })
                          }
                          defaultValue={classFresher.nameTrainer3}
                          id="formname"
                          placeholder="Enter your Name..."
                          type="text"
                          class="form-control form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label htmlFor="formemail" class="form-label">
                          Email :
                        </label>
                        <input
                          onChange={(e) =>
                            setClassInfo({
                              ...classInfo,
                              emailTrainer3: e.target.value,
                            })
                          }
                          defaultValue={classFresher.emailTrainer3}
                          id="formemail"
                          placeholder="Enter your Email..."
                          type="email"
                          class="form-control form-control"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              type="button"
              class="btn btn-danger"
              style={{ marginRight: "12px" }}
              onClick={() => GotoDetail()}
            >
              <CancelIcon /> &nbsp; Cancel
            </button>
            <button
              onClick={SaveInfo}
              type="button"
              style={{ marginRight: "12px" }}
              class="btn btn-success"
            >
              <SaveIcon /> &nbsp; Save
            </button>
          </div>
          <h4>List freshers</h4>
          <DataTableClassFresher
            freshers={classFresher.freshers}
            isEdit={true}
          ></DataTableClassFresher>
        </div>
      ) : (
        <div>Something was wrong</div>
      )}
    </div>
  );
}
