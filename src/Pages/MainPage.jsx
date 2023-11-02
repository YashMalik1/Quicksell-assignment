import React from "react";
import Navbar from "../Components/Navbar";
import Column from "../Components/Column";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { getPriorityIcon, getStatusIcon } from "../utils/getIcons";
import { UserIcon } from "../Components/UserProfile";
import { getPriorityName } from "../utils/mapping";
import { storeData, fetchData } from "../utils/localStorage";
import styles from "../Style/MainPage.module.css";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

function MainPage() {
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("title");

  useEffect(() => {
    if (fetchData("grouping") !== null) {
      setGrouping(fetchData("grouping"));
    }
    if (fetchData("ordering") !== null) {
      setOrdering(fetchData("ordering"));
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const setGroupingFunc = (val) => {
    setGrouping(val);
    storeData("grouping", val);
  };

  const setOrderingFunc = (val) => {
    setOrdering(val);
    storeData("ordering", val);
  };

  const sortTickets = (tickets, ordering) => {
    return tickets.sort((a, b) => {
      if (a[ordering] > b[ordering]) return 1;
      if (a[ordering] < b[ordering]) return -1;
      return 0;
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

   const columnDatas = useMemo(() => {
      const groupByUserId = (data, ordering) => {
        return data.users.map((user) => ({
          name: user.name,
          id: user.id,
          symbol: UserIcon(user),
          tickets: sortTickets(
            data.tickets.filter((ticket) => ticket.userId === user.id),
            ordering
          ),
        }));
      };

      const groupByStatus = (data, ordering) => {
        const allStatus = data.tickets.map((ticket) => ({
          name: capitalizeFirstLetter(ticket.status.toString()),
          id: ticket.status,
          symbol: getStatusIcon(ticket.status),
        }));

        const uniqueStatus = allStatus.filter(
          (status, index, self) =>
            index === self.findIndex((s) => s.id === status.id)
        );

        return uniqueStatus.map((status) => ({
          ...status,
          tickets: sortTickets(
            data.tickets.filter((ticket) => ticket.status === status.id),
            ordering
          ),
        }));
      };

      const groupByPriority = (data, ordering) => {
        return [0, 4, 3, 2, 1].map((priority) => ({
          name: getPriorityName(priority),
          id: priority,
          symbol: getPriorityIcon(priority),
          tickets: sortTickets(
            data.tickets.filter((ticket) => ticket.priority === priority),
            ordering
          ),
        }));
      };


     if (grouping === "userId") {
       return groupByUserId(data, ordering);
     } else if (grouping === "status") {
       return groupByStatus(data, ordering);
     } else if (grouping === "priority") {
       return groupByPriority(data, ordering);
     }
     return [];
   }, [data, grouping, ordering]);


  return (
    <div className={styles.mainContainer}>
      <Navbar
        grpFunc={setGroupingFunc}
        ordFunc={setOrderingFunc}
        grouping={grouping}
        ordering={ordering}
      />
      <div className={styles.columnsContainer}>
        {columnDatas.map((coldata) => (
          <Column
            key={coldata.id}
            grouping={grouping}
            ordering={ordering}
            columnData={coldata}
            users={data.users}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
