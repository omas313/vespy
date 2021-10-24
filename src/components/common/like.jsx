import React from "react";

const Like = ({ isLiked, onToggle }) => {
  let classes = "fa fa-heart";
  if (!isLiked) classes += "-o";

  return (
    <i style={{ cursor: "pointer" }} className={classes} onClick={onToggle}></i>
  );
};

export default Like;
