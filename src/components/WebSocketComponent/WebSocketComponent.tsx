import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(`ws://localhost:8080?lang=${language}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onmessage = (event) => {
      // Convertir el mensaje a string si es un Blob
      if (typeof event.data === "object") {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            reader.result as string,
          ]);
        };
        reader.readAsText(event.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [language]);

  const sendMessage = () => {
    if (ws.current && input) {
      ws.current.send(input);
      setInput("");
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <h1>WebSocket Chat ({language === "es" ? "Español" : "English"})</h1>
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </FormControl>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === "es" ? "Escribe un mensaje..." : "Type a message..."
          }
        />
        <button onClick={sendMessage}>
          {language === "es" ? "Enviar" : "Send"}
        </button>
      </div>
      <div>
        <h2>{language === "es" ? "Mensajes:" : "Messages:"}</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
