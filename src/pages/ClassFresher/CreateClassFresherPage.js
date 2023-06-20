import React, { useState } from "react";

export default function CreateClassFresherPage() {
  const [confirmClass, setClassFresher] = useState({
    id: 0,
    nameAdmin1: "",
    nameAdmin2: "",
    nameAdmin3: "",
    nameTrainer1: "",
    nameTrainer2: "",
    nameTrainer3: "",
    emailAdmin1: "",
    emailadmin2: "",
    emailAdmin3: "",
    emailTrainer1: "",
    emailTrainer2: "",
    emailTrainer3: "",
    className: "",
    classCode: "",
    rrCode: "",
    location: "",
    planId: 1244,
    startDate: "",
    endDate: "",
    isDone: false,
    budget: 10000,
    freshers: [],
  });
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
            Create  
          </li>
        </ol>
      </nav>
      <div className="detail-import-class">
        <div className="info-detail-import-class">
          <span>
            Skill
            <select
              id="standard-select"
              onChange={(e) =>
                setClassFresher((pre) => ({
                  ...pre,
                  classCode: e.target.value,
                }))
              }
            >
              <option value={134234}>Java</option>
              <option value={134232}>C#</option>
              <option value={134231}>.Net</option>
              <option value={134230}>PHP</option>
              <option value={134235}>Angular</option>
              <option value={134236}>Auto Test</option>
              <option value={134237}>Python</option>
            </select>
          </span>
          <span>
            Location
            <select
              id="standard-select"
              onChange={(e) =>
                setClassFresher((pre) => ({
                  ...pre,
                  location: e.target.value,
                }))
              }
            >
              <option value={134234}>Hồ Chí Minh</option>
              <option value={1212}>Đà Nẵng</option>
              <option value={34234}>Hà Nội</option>
              <option value={3423423}>Cần Thơ</option>
            </select>
          </span>
          <span>
            RR Code
            <input type="text" />
          </span>
        </div>
        <div className="container-input">
          <div className="info-detail-import-class">
            <span>
              Start Date
              <input
                type="date"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    startDate: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              End Date
              <input
                type="date"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    endDate: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Plan
              <select
                id="standard-select"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    planId: e.target.value,
                  }))
                }
              >
                <option value={134234}>Huy Diet</option>
                <option value={1212}>Tieu Diet Fresher</option>
                <option value={34234}>Clear Fresher</option>
                <option value={3423423}>Fire Fresher</option>
              </select>
            </span>
          </div>
          <div className="info-detail-import-class">
            <span>
              Admin 1
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameAdmin1: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Admin 2
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameAdmin2: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Admin 3
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameAdmin3: e.target.value,
                  }))
                }
              />
            </span>
          </div>
          <div className="info-detail-import-class">
            <span>
              Email Admin 1
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailAdmin1: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Email Admin 2
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailAdmin2: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Email Admin 3
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailAdmin3: e.target.value,
                  }))
                }
              />
            </span>
          </div>
          <div className="info-detail-import-class">
            <span>
              Trainer 1
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameTrainer1: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Trainer 2
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameTrainer2: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Trainer 3
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    nameTrainer3: e.target.value,
                  }))
                }
              />
            </span>
          </div>
          <div className="info-detail-import-class">
            <span>
              Email Trainer 1
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailTrainer1: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Email Trainer 2
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailTrainer2: e.target.value,
                  }))
                }
              />
            </span>
            <span>
              Email Trainer 3
              <input
                type="text"
                onChange={(e) =>
                  setClassFresher((pre) => ({
                    ...pre,
                    emailTrainer3: e.target.value,
                  }))
                }
              />
            </span>
          </div>
        </div>
      </div>
      <div>
        <button className="btn-show">Get List Fresher</button>
      </div>
    </div>
  );
}
