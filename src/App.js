import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import NotFound from "./components/NotFound";
import SignIn from "./components/authorization/SignIn";
import Default from "./components/Default";
import Admin from "./components/Admin";
import SignUp from "./components/authorization/SignUp";
import ForgotPassword from "./components/authorization/ForgotPassword";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Messages from "./components/adminPanel/Messages";
import Gallery from "./components/adminPanel/Gallery";
import Staff from "./components/adminPanel/Staff";
import Reviews from "./components/adminPanel/Reviews";
import AddInGallery from "./components/adminPanel/AddInGallery";
import AddStaff from "./components/adminPanel/AddStaff";
import PriceList from "./components/adminPanel/PriceList";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default/>}>

                </Route>
                <Route path="admin" element={<Admin/>}>
                    <Route path="signIn" element={<SignIn/>}/>
                    <Route path="signUp" element={<SignUp/>}/>
                    <Route path="forgotPassword" element={<ForgotPassword/>}/>
                    <Route path="adminPanel" element={<AdminPanel/>}>
                        <Route path="messages" element={<Messages/>}/>
                        <Route path="gallery" element={<Gallery/>}/>
                        <Route path="staff" element={<Staff/>}/>
                        <Route path="reviews" element={<Reviews/>}/>
                        <Route path="addInGallery" element={<AddInGallery/>}/>
                        <Route path="addStaff" element={<AddStaff/>}/>
                        <Route path="priceList" element={<PriceList/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}