import React, { useRef } from 'react'
import video from "../assets/media/videos/positionsizing.mp4";


export default function TutorialVideo({ visible, setVisible }) {
    const videoRef = useRef()
    function closePlayer() {
        videoRef.current.pause()
        setVisible(!visible)
    }
    return (
        <div id="video-container-full" hidden={!visible}>
            <div id="closeVideo"><a className="close" onClick={closePlayer}></a></div>
            <video id="tutorial-video" controls ref={videoRef}>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    )
}
