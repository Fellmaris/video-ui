import HTTP from "./index";

const getVideos = () => HTTP.get('/videos');
const getVideo = (videoId) => HTTP.get('/videos/' + videoId.videoId);
const createVideo = (data) => HTTP.post('/videos', data);
const uploadVideo = (data) => HTTP.post("/files", data, {
    headers: {'contentType': "multipart/form-data"}
});


export {getVideos, createVideo, getVideo, uploadVideo}