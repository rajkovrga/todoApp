import Auth from "pages/auth/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home";
import Jobs from "../pages/jobs/Jobs";
import Nav from "./Nav";

function AppRouter() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Auth/>} />
                <Route path="/:date([\d]{1,2}[-][\d]{1,2}[-][\d]{4})" element={<Jobs/>}/>
                <Route path="*" to="/404" element={<PageNotFound/>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;