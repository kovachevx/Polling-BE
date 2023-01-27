import classes from "./App.module.css";
import CreatePoll from "./components/CreatePoll";
import HomePage from "./components/HomePage";
import SubmittedForm from "./components/SubmittedForm";
import PollsPage from "./components/PollsPage";
import VoteModal from "./components/VoteModal";
import ResultsModal from "./components/ResultsModal";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ResetPasswordPage from "./components/ResetPassword";
import SaveNewPasswordPage from './components/SaveNewPasswordPage'
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useStore from "./store/pollCreationStore";

function App() {
  const { getPolls } = useStore();

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className={classes.appContainer}>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/submitted" element={<SubmittedForm />} />
        <Route path="/polls" element={<PollsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset/:tokenId" element={<SaveNewPasswordPage />} />
        <Route path="/password-reset" element={<ResetPasswordPage />} />
      </Routes>
      <VoteModal />
      <ResultsModal />
    </div>
  );
}

export default App;
