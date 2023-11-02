import React from "react";
import Card from "./Card";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import styles from "../Style/Column.module.css";

function Column({ grouping, ordering, columnData, users }) {
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  console.log(columnData.tickets);

  const getUserForTicket = (ticket) => {
    return userMap[ticket.userId];
  };

  return (
    <div className={styles.columnContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          {columnData.symbol}
          <span className={styles.columnName}>{columnData.name}</span>
          <span className={styles.ticketCount}>
            {columnData.tickets.length}
          </span>
        </div>
        <div className={styles.actions}>
          <AiOutlinePlus className={styles.icon} />
          <BsThreeDots className={styles.icon} />
        </div>
      </div>
      <div className={styles.ticketsContainer}>
        {columnData.tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            ordering={ordering}
            grouping={grouping}
            user={getUserForTicket(ticket)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
