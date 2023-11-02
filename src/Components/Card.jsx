import React from "react";
import styles from "../Style/Card.module.css";
import { BsFillCircleFill } from "react-icons/bs";
import { getPriorityIcon, getStatusIcon } from "../utils/getIcons";
import { UserIcon } from "./UserProfile";

const Card = ({ ticket, grouping, user }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconContainer}>
        <div
          className={grouping === "userId" ? styles.hidden : styles.userIcon}
        >
          {UserIcon(user)}
        </div>
      </div>
      <div className={styles.ticketId}>{ticket.id}</div>
      <div
        className={styles.ticketTitle}
        style={{ marginRight: grouping === "userId" ? "1rem" : "3rem" }}
      >
        {grouping !== "status" ? getStatusIcon(ticket.status) : <></>}
        {ticket.title.substring(0, 60) +
          (ticket.title.length > 60 ? "..." : "")}
      </div>
      <div className={styles.priorityTags}>
        {grouping !== "priority" ? (
          <div className={styles.priorityIcon}>{getPriorityIcon(ticket.priority)}</div>
        ) : (
          <></>
        )}
        <div className={`${styles.tagContainer} scrollbar`}>
          {ticket.tag.map((tag, index) => (
            <div className={styles.tag} key={index}>
              <BsFillCircleFill color='grey' size='0.7rem' />
              <div className={styles.tagText}>{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
