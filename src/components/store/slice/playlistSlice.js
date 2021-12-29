import {createSlice} from "@reduxjs/toolkit";
import {addLocalStorage, getLocalStorage} from "../../storage/localStorage";

const playlistSlice = createSlice({
    name:'playlist',
    initialState: [],
    reducers: {
        addToPlaylist(state, action){
            const video = action.payload;
            const existingVideo = state.find(p => p.id === video.id);
            if (!existingVideo){
                state.push(video);
            }
        },
        removeFromPlaylist (state, {payload: id}){
            return state.filter(v => v.id !== id);
        }
    }
});
let prevPlaylist = [];
const subscribeToStore = (store) => {
    store.subscribe(() => {
        const playlist = store.getState().playlist;
        if (prevPlaylist !== playlist) {
            addLocalStorage('playlist', playlist);
            prevPlaylist = playlist;
        }
    })
}

const loadPlaylistFromLocalStorage = () => getLocalStorage('playlist') || [];

export default playlistSlice.reducer;
export const {addToPlaylist, removeFromPlaylist} = playlistSlice.actions;
export {subscribeToStore, loadPlaylistFromLocalStorage};