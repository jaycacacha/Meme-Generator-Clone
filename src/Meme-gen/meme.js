import React, { useEffect, useState, setCaptions } from "react";
import "./meme.css";
import { useHistory } from "react-router-dom";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState([0]);
  const [captions, setCaptions] = useState([]);
  const history = useHistory();

  //Shuffle meme img id from api
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  //update caption
  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  //Fetch images from imgflip api
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  //make account for imgflip.com
  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append("username", "bishapo");
    formData.append("password", "helloworld123");
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    //Fetch image with caption
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        res.success === true ? (
          history.push(`/generated?url=${res.data.url}`)
        ) : (
          //clicked generate button but empty caption
          //do nothing
          <></>
        );
      });
    });
  };

  //Set caption
  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div className="memeContainer">
      <button className="generateBtn" onClick={generateMeme}>
        Generate
      </button>
      <button className="skipBtn" onClick={() => window.location.reload(false)}>
        Skip
      </button>
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaption(e, index)} key={index} />
      ))}

      <img alt="meme" src={memes[memeIndex].url} />
    </div>
  ) : (
    <></>
  );
};
