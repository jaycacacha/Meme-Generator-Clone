import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import "./meme-generated.css";

export const MemeGenerated = () => {
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <div className="generatedContainer">
      <button className="homeBtn" onClick={() => history.push("/")}>
        Make More Memes
      </button>
      <button className="copyBtn" onClick={copyLink}>
        {copied ? "Link copied!" : "Copy link"}
      </button>
      {url && <img id="img-generated" alt="meme" src={url} />}
    </div>
  );
};
