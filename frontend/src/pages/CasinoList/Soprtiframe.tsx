import React from "react";
import { useParams } from "react-router-dom";

const SportIframeTV = () => {
  const { type } = useParams();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={`https://stream-s-43.uhdmovies.online/sports-stream?btid=${type}`}
        title="Casino Stream"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default SportIframeTV;