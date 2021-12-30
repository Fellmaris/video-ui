import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import * as React from "react";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import {getVideo} from "../api/videoApi";

export default () => {
    const {videoId} = useParams();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVideo({videoId})
            .then(({data}) => setVideo(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));

    }, []);

    const customUrl = "/api/files/" + video.fullvideofilename;

    return (
        <Container maxWidth="md" sx={{my: 2}}
        >
            {
                loading ? <Box sx={{display: 'flex', justifyContent: "center"}}>
                        <CircularProgress/>
                    </Box>
                    :
                    <Container maxWidth="md" sx={{my: 2}}>
                        <ReactPlayer
                            playing={true}
                            className="video"
                            url={customUrl}
                            controls={true}
                            alt=""/>
                        <div>View video: {videoId}</div>
                        <div>Video name: {video.name}</div>
                        <div>{customUrl}</div>
                    </Container>
            }
        </Container>
    )
}