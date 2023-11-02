import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import {
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
  MdCancel,
} from "react-icons/md";
import { BiDotsHorizontalRounded, BiCircle } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { PiCircleHalfFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";

const getPriorityIcon = (priority) => {
  const iconProps = { color: "#374151", size: "1rem" };
  switch (priority) {
    case 4:
      return <BsExclamationSquareFill color='red' size={"1rem"} />;
    case 3:
      return <MdOutlineSignalCellularAlt {...iconProps} />;
    case 2:
      return <MdOutlineSignalCellularAlt2Bar {...iconProps} />;
    case 1:
      return <MdOutlineSignalCellularAlt1Bar {...iconProps} />;
    case 0:
    default:
      return <BiDotsHorizontalRounded {...iconProps} />;
  }
};

const getStatusIcon = (status) => {
  const iconProps = { size: "1rem" };
  switch (status) {
    case "Todo":
      return <BiCircle color='grey' {...iconProps} />;
    case "Done":
      return <AiFillCheckCircle color='#7b68ee' {...iconProps} />;
    case "In progress":
      return <PiCircleHalfFill color='#ffd700' {...iconProps} />;
    case "Backlog":
      return <MdCancel color='grey' {...iconProps} />;
    default:
      return <IoPersonSharp color='#7b68ee' {...iconProps} />;
  }
};

export { getPriorityIcon, getStatusIcon };
