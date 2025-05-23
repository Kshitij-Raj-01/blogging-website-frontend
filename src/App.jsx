import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import MannageBlogs from "./pages/manage-blogs.page";
import usePageTracking from "./usePageTracking";

export const UserContext = createContext({});

const App = () => {
    usePageTracking();
    const [userAuth, setUserAuth] = useState({ access_token: null }); // Set default state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        let userInSession = lookInSession("user");

        if (userInSession) {
            setUserAuth(JSON.parse(userInSession));
        } else {
            setUserAuth({ access_token: null });
        }
        setLoading(false); // Set loading to false after session check is done
    }, []);

    // Show a loading indicator while session data is being retrieved
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a more complex spinner or loader
    }

    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
            <Routes>
                {/* Ensure Navbar is shown on the root path */}
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage/>} />
                    <Route path="dashboard" element={<SideNav/>}>
                        <Route path="blogs" element={<MannageBlogs/>}/>
                        <Route path="notifications" element={<Notifications/>}/>
                    </Route>
                    <Route path="settings" element={<SideNav/>}>
                        <Route path="edit-profile" element={<EditProfile/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                    </Route>
                    <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                    <Route path="search/:query" element={<SearchPage/>} />
                    <Route path="user/:id" element={<ProfilePage/>} />
                    <Route path="blogs/:blog_id" element={<BlogPage/>} />
                    <Route path="*" element={<PageNotFound/>} />
                </Route>

                {/* Protected route */}
                <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
            </Routes>
        </UserContext.Provider>
    );
};

export default App;
