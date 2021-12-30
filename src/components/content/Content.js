import {Route, Routes} from "react-router-dom";
import {CssBaseline, GlobalStyles} from "@mui/material";
import Videos from "../page/Videos";
import CreateNewVideo from "../page/CreateNewVideo";
import UserRegistration from "../page/UserRegistration";
import LogIn from "../logIn/LogIn";
import UpdateVideo from "../page/UpdateVideo";
import ViewVideo from "../page/ViewVideo";
import Playlist from "../page/Playlist";
import SecuredRoute from "../security/SecuredRoute";


export default () => {
    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Videos/>}/>

                <Route path="/video/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/video/create" element={<CreateNewVideo/>}/>
                </Route>

                <Route path="/video/viewVideo/:videoId" element={<ViewVideo/>}/>

                <Route path="/users/registration" element={<SecuredRoute/>}>
                    <Route path="/users/registration" element={<UserRegistration/>}/>
                </Route>

                <Route path="/login" element={<LogIn/>}/>

                <Route path="/video/update/:videoId" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/video/update/:videoId" element={<UpdateVideo/>}/>
                </Route>

                <Route path="/playlist" element={<Playlist/>}/>
            </Routes>
        </>
    )
}