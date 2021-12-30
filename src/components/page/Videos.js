import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Button, CardActionArea, CircularProgress} from '@mui/material';
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {getVideos} from "../api/videoApi";
import Grid from "@mui/material/Grid";
import {NavLink, useNavigate} from "react-router-dom";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {useDispatch, useSelector} from "react-redux";
import {addToPlaylist} from "../store/slice/playlistSlice";
import DeleteIcon from '@mui/icons-material/Delete';

export default () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const onAddVideo = (video) => dispatcher(addToPlaylist(video));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        getVideos()
            .then(({data}) => setVideos(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    function onRemoveVideo(id) {
        setVideos(videos.filter(v => v.id !== id));
    }

    return (
        <Container maxWidth="md" sx={{my: 2}}>
            {
                loading ? <Box sx={{display: 'flex', justifyContent: "center"}}>
                        <CircularProgress/>
                    </Box>
                    :
                    <Container maxWidth="md" sx={{my: 2}}>
                        <Grid container spacing={2}>
                            {videos.map((video) => (
                                <Grid item xs={3} key={video.id}>
                                    <Card sx={{
                                        maxWidth: 300,
                                        maxHeight: 250,
                                        minHeight: 250
                                    }}>
                                        <CardActionArea
                                            to={'/video/viewVideo/' + video.id}
                                            component={NavLink}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={"/api/files/" + video.fullimagefilename}
                                                alt={video.location}
                                            />
                                            <CardContent>
                                                <Button

                                                    style={{
                                                        marginLeft: '5px',
                                                        marginRight: '5px,',
                                                        float: 'right',
                                                        maxWidth: '20px',
                                                        maxHeight: '20px',
                                                        minWidth: '20px',
                                                        minHeight: '20px'
                                                    }}
                                                    variant="contained"
                                                    color="primary"
                                                    onMouseDown={event => event.stopPropagation()}
                                                    onClick={event => {
                                                        event.stopPropagation();
                                                        event.preventDefault();
                                                        onAddVideo(video);
                                                    }}
                                                >
                                                    <PlaylistAddIcon/>
                                                </Button>
                                                {user &&
                                                <>
                                                    {
                                                        user.roles.includes('ADMIN') &&
                                                        <Button
                                                            style={{
                                                                marginLeft: '5px',
                                                                marginRight: '5px,',
                                                                float: 'right',
                                                                maxWidth: '20px',
                                                                maxHeight: '20px',
                                                                minWidth: '20px',
                                                                minHeight: '20px'
                                                            }}
                                                            variant="contained"
                                                            color="error"
                                                            onMouseDown={event => event.stopPropagation()}
                                                            onClick={event => {
                                                                event.stopPropagation();
                                                                event.preventDefault();
                                                                onRemoveVideo(video.id);
                                                            }}
                                                        >
                                                            <DeleteIcon/>
                                                        </Button>
                                                    }
                                                </>
                                                }
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {video.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Container>
            }
        </Container>
    )
}
