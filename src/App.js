import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActivatedNavItemContext from "./contexts/ActivatedNavItemContext";
import Empty from "./components/Empty";

import Sidebar from "./components/Sidebar";
import HomePage from "./routes/homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FresherReport from "./routes/fresherReport";
import FeedbackPage from "./routes/feedback";
import Reminder from "./routes/reminder";

import ClassFresher from "./pages/ClassFresher";
import ImportClassFresher from "./pages/ClassFresher/ImportClassFresherPage";
import CreateClassFresher from "./pages/ClassFresher/CreateClassFresherPage";
import DetailClassFresher from "./pages/ClassFresher/DetailClassFresher";
import EditClassFresher from "./pages/ClassFresher/EditClassFresher";
import { AddNewFeedback } from "./components/feedback/addNewFeedback";
import { FeedbackDetails } from "./components/feedback/feedbackDetail";
import { UpdateFeedback } from "./components/feedback/updateFeedback";
import Login from "./routes/login";

import Score from "./components/Scores/Score";
import ScoreDetail from "./components/Scores/ScoreDetail";

import Constants from "./Constants";

import { configEnv } from "./configs/config";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLoginRoute from "./components/ProtectedLoginRoute";

import ClassAttendance from "./routes/attendance/ClassAttendance";
import DetailAttendance from "./routes/attendance/DetailAttendance";
import AttendanceOverview from "./routes/attendance/AttendanceOverview";
import RequestAttendance from "./routes/attendance/RequestAttendance";
import ApproveAttendance from "./routes/attendance/ApproveAttendance";

import ListClass from "./components/PlanAudit/ListClass";
import ViewPlanAudit from './components/PlanAudit/ViewPlanAudit'
import ViewPlanAuditDetail from './components/PlanAudit/ViewPlanAuditDetail';
import ViewAuditor from './components/PlanAudit/ViewAuditor';
import UpdateDetailAudit from './components/PlanAudit/UpdateDetailAudit';

class App extends React.Component {
  state = {
    // the first item in nav bar should be default activated item
    activatedItem: 0,
    setActivatedItem: (item) => {
      this.setState({
        activatedItem: item,
        headerText: Constants.Routes[item].shortText,
      });
    },
  };

  render() {
    if (localStorage.getItem(configEnv.TOKEN_KEY) === null) {
      const link = document.createElement("a");
      link.setAttribute("data-widget", "pushmenu");
      document.body.appendChild(link);
      link.click();
    }

    return (
      <ActivatedNavItemContext.Provider value={this.state}>
        <Router>
          {localStorage.getItem(configEnv.TOKEN_KEY) !== null ? (
            <Header />
          ) : null}
          {localStorage.getItem(configEnv.TOKEN_KEY) !== null ? (
            <Sidebar activatedItem={this.state.activatedItem} />
          ) : null}
          <div
            className={
              localStorage.getItem(configEnv.TOKEN_KEY) !== null
                ? "content-wrapper"
                : ""
            }
          >
            <div className="content">
              <div className="container-fuild">
                <Switch>
                  <ProtectedLoginRoute path="/login" component={Login} />
                  <ProtectedRoute path="/" exact component={HomePage} />
                  <ProtectedRoute path="/attendances" component={ClassAttendance} />
                  <ProtectedRoute path="/scores" component={Empty} />
                  <ProtectedRoute path="/classes" exact component={ClassFresher} />
                  <Route path="/scores/:id/:module?" component={ScoreDetail} />
                  <Route path="/scores" component={Score} />
                  <ProtectedRoute
                    path="/classes"
                    exact
                    component={ClassFresher}
                  />

                  <ProtectedRoute
                    path="/classes/detail/:id"
                    component={DetailClassFresher}
                  />
                  <ProtectedRoute
                    path="/classes/edit/:id"
                    component={EditClassFresher}
                  />
                  <ProtectedRoute
                    path="/classes/import"
                    component={ImportClassFresher}
                  />
                  <ProtectedRoute
                    path="/classes/create"
                    component={CreateClassFresher}
                  />
                  {/* <Route path="/freshers" component={Empty} /> */}
                  {/* <Route path="/audit" component={Empty} /> */}
                  {/* <Route path="/plan" component={PlanData} /> */}
                  <ProtectedRoute path="/fresher-report" component={FresherReport} />

                  <ProtectedRoute path="/feedback/create" component={AddNewFeedback} />
                  <ProtectedRoute path="/feedback/update/:id/" component={UpdateFeedback} />
                  <ProtectedRoute path="/feedback/:id/" component={FeedbackDetails} />
                  <ProtectedRoute path="/feedbacks" component={FeedbackPage} />
                  
                  <ProtectedRoute path="/reminders" component={Reminder} />
                  {/* <Route component={NotFound} /> */}
                  <ProtectedRoute path="/detail-attendance" component={DetailAttendance} />
                  <ProtectedRoute path="/request-attendance" component={RequestAttendance} />
                  <ProtectedRoute path="/overview-attendance" component={AttendanceOverview} />
                  <ProtectedRoute path="/approve-attendance" component={ApproveAttendance} />

                  <Route path='/audit' component={ListClass} />
                  <Route path='/viewPlanAudit' component={ViewPlanAudit} />
                  <Route path='/viewPlanAuditDetail' component={ViewPlanAuditDetail} />
                  <Route path='/viewAuditor' component={ViewAuditor} />
                  <Route path='/updateDetailAudit' component={UpdateDetailAudit} />   
                </Switch>
              </div>
            </div>
          </div>
        </Router>
        {localStorage.getItem(configEnv.TOKEN_KEY) !== null ? <Footer /> : null}
      </ActivatedNavItemContext.Provider>
    );
  }
}

export default App;
