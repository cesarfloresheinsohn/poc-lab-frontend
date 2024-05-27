import React from "react";
import ChunkedFileUpload from "./components/SecondPoc/ChunkedFileUpload";
import ChunkedFileUploadBack from "./components/SecondPoc/ChunkedFileUploadBack";
import CourseManagement from "./components/CourseManagement/CourseManagement ";
import WebSocketComponent from "./components/WebSocketComponent/WebSocketComponent";

const App: React.FC = () => {
  return (
    <div>
      <WebSocketComponent />
    </div>
  );
};

export default App;
