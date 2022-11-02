import DateProvider from "../context/DateProvider";
import Auth from "../pages/auth/Auth";
import Jobs from "../pages/jobs/Jobs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "./Nav";
import ResendVerification from "../pages/auth/components/ResendVerification";
import Verificated from "../pages/auth/components/Verificated";
import PageResult from "../components/PageResult";

function AppRouter() {
    return (
        <>
            <Router>
                <Nav />
                <div className="container-fluid">
                    <Routes>
                        <Route path=''  element={<Home/>} />
                        <Route path='login' element={<Auth/>} />
                        <Route path=':date' element={<DateProvider><Jobs/></DateProvider>}/>
                        <Route path="*" to='/404' element={<PageResult />} />
                        <Route path='/404' element={<PageResult/>} />
                        <Route path='verification/resend' element={<ResendVerification />} />
                        <Route path='user/verify/:token' element={<Verificated />} />
                    </Routes> 
                </div>
            </Router>
        </>
    );
}

export default AppRouter;