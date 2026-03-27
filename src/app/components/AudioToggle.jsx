"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AudioToggle() {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Create an audio element if it doesn't exist
        if (!audioRef.current) {
            audioRef.current = new Audio("/audio/ambient.mp3");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Promise handling for browser autoplay policies
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log("Audio playback failed: ", error);
                    setIsPlaying(false);
                });
            }
        }
    };

    return (
        <button 
            className="audio-btn" 
            onClick={toggleAudio}
            aria-label={isPlaying ? t("audio.pause") : t("audio.play")}
            title={isPlaying ? t("audio.pause") : t("audio.play")}
            style={{
                background: "transparent",
                border: "1px solid var(--celestial-gold)",
                color: "var(--celestial-gold)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginRight: "15px",
                transition: "all 0.3s"
            }}
        >
            {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
        </button>
    );
}
