"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";


interface VideoPlayerProps {
    courseId: string;
    title: string;
    playbackId: string;
}

const VideoPlayer = ({
    courseId,
    title,
    playbackId
    
}: VideoPlayerProps) => {

   
    

    return (
        <div className="border rounded-lg p-3">
            <h2 className="text-gray-400 mb-3">Course Preview</h2>
                    <MuxPlayer
                    title={title}
                    autoPlay
                    playbackId={playbackId}
                />
           
        </div>
    );
};

export default VideoPlayer;
