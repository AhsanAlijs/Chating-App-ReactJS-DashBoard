import React from "react";
import BG_Image from "../../assets/notfound.jpg"

const NotAuthorized = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BG_Image})`, // Use template literal to insert the imported image
        // backgroundSize: "cover",
        backgroundPosition:'center',
        backgroundRepeat: "no-repeat",
        height:'100vh'
      }}
    ></div>
  );
};

export default NotAuthorized;
