import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { userAvailabilityColor } from "../utils/mapping";
import stylesUserImage from "../Style/UserImage.module.css";
import image from "../Assets/profilePhoto.jpeg"

const UserImage = ({ imageUrl, userName }) => (
  <img src={imageUrl ?? image} alt={userName} className={stylesUserImage.userImage} />
);

const AvailabilityIndicator = ({ isAvailable }) => (
  <BsFillCircleFill
    color={userAvailabilityColor(isAvailable)}
    className={stylesUserImage.availabilityIndicator}
  />
);

const UserIcon = (user) => (
  <div style={{ position: "relative", width: "min-content" }}>
    <UserImage imageUrl={user.imageUrl} userName={user.name} />
    <AvailabilityIndicator isAvailable={user.available} />
  </div>
);

export { UserIcon };
