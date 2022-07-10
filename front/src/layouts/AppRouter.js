import Auth from "pages/auth/Auth";
import Jobs from "pages/jobs/Jobs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home";
import Nav from "./Nav";

function AppRouter() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path=""  element={<Home/>} />
                <Route path="login" element={<Auth/>} />
                <Route path=":date" element={<Jobs/>}/>
                <Route path="*" to="/404" element={<PageNotFound/>} />
                <Route path="/404" element={<PageNotFound/>} />

            </Routes>
        </Router>
    );
}

export default AppRouter;