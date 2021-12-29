import {useParams} from "react-router-dom";

export default () => {
    const {videoId} = useParams();

    return (
        <div>Update video: {videoId}</div>
    )
}