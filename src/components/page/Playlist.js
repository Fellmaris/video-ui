import Container from "@mui/material/Container";
import {Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {removeFromPlaylist} from "../store/slice/playlistSlice";

export default () =>{
    const videos = useSelector(state => state.playlist);
    const dispatcher = useDispatch();
    const onRemoveVideo = (id) => dispatcher(removeFromPlaylist(id));

    return (
        <Container maxWidth="md" sx={{my:2}}>
            {
                videos.length === 0 ?   <Alert severity="info">Playlist is empty</Alert>
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 100}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {videos.map((video) => (
                                    <TableRow
                                        key={video.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">
                                            {video.name}
                                        </TableCell>
                                        <TableCell align="right">{video.category}</TableCell>
                                        <TableCell align="center">{video.description}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined"
                                                    color="error"
                                                    onClick={() => onRemoveVideo(video.id)}
                                            >
                                                <DeleteIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Container>
    )
}