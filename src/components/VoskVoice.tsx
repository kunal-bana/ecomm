import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";

interface Props {
  onText: (text: string) => void;
  onListeningChange: (status: "idle" | "speak" | "process") => void;
}

export default function VoskVoice({ onText, onListeningChange }: Props) {

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    onListeningChange("speak");
    recognition.start();

    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;

      onListeningChange("process");

      setTimeout(() => {
        onText(text);
        onListeningChange("idle");
      }, 600);
    };

    recognition.onerror = () => onListeningChange("idle");
    recognition.onend = () => {
      onListeningChange("process");
      setTimeout(() => onListeningChange("idle"), 800);
    };
  };

  return (
    <IconButton
      onClick={startListening}
      sx={{
        p: 0,
        ml: 1,
        color: "grey",
        transition: "0.25s ease",
        "&:hover": { color: "#000" }
      }}>
      <MicIcon sx={{ fontSize: 22 }} />
    </IconButton>
  );
}
