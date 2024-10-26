import React from 'react'
import "../../css/blogcarousel.css";

export default function Blogcarousel() {
  const fishImageList = [
    "/images/homepage1.png",
    "/images/homepage1.png",
    "/images/homepage1.png",
    "/images/homepage1.png",
    "/images/homepage1.png",
    "/images/homepage1.png",
  ];

  return (
    <div className="wrapper">
      <div className="item item1"><img src={fishImageList[0]}></img></div>
      <div className="item item2"><img src={fishImageList[1]}></img></div>
      <div className="item item3"><img src={fishImageList[2]}></img></div>
      <div className="item item4"><img src={fishImageList[3]}></img></div>
      <div className="item item5"><img src={fishImageList[4]}></img></div>
      <div className="item item6"><img src={fishImageList[5]}></img></div>
      <div className="item item7"><img src={fishImageList[0]}></img></div>
      <div className="item item8"><img src={fishImageList[1]}></img></div>
    </div>
  )
}


