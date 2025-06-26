import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/auth/components/Register";
import Login from "../components/auth/components/Login";
import Dashboard from "../components/dashboard/components/Dashboard";
import SubmitFeedback from "../components/feedback/components/SubmitFeedback";
import ReviewFeedback from "../components/feedback/components/ReviewFeedback";
import FeedbackOptions from "../components/feedback/components/FeedbackOptions";
import GiveFeedbackOptions from "../components/feedback/components/GiveFeedbackOptions";
import Team from "../components/team/components/Team";
import Profile from "../components/profile/components/Profile";
import AddMembers from "../components/team/components/AddMembers";
import CreateTeam from "../components/team/components/CreateTeam";
import FeedbackHistory from "../components/feedback/components/FeedbackHistory";
import ReviewedFeedbacks from "../components/feedback/components/ReviewedFeedbacks";
import Root from "../components/root/Root";


function Routing() {

    return (
        < Router >
            < Routes >
                <Route path="/" element={<Root />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/write-feedback" element={<SubmitFeedback />}/>
                <Route path="/feedback-history" element={<FeedbackHistory />}/>
                <Route path="/feedback" element={<FeedbackOptions />} />
                <Route path="/give-feedback" element={<GiveFeedbackOptions />} />
                <Route path="/team" element={<Team />} />
                <Route path="/profile/:email" element={<Profile />} />
                <Route path="/team/add-members" element={<AddMembers />} />
                <Route path="/createteam" element={<CreateTeam />} />
                <Route path="/reviewfeedback" element={<ReviewFeedback />} />
                <Route path="/reviews" element={<ReviewedFeedbacks />} />
            </Routes>
        </Router>
    )
}

export default Routing