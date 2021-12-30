import {configureStore} from "@reduxjs/toolkit";
import playlist, {loadPlaylistFromLocalStorage, subscribeToStore} from "./slice/playlistSlice";
import user from "./slice/userSlice";

const buildStore = () => {
    const store = configureStore({
        reducer: {
            playlist, user
        },
        preloadedState: {
            playlist: loadPlaylistFromLocalStorage()
        }
    });

    subscribeToStore(store);

    return store;
}

const store = buildStore();

export default store;