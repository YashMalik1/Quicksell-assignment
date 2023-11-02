import React, { useState, useRef, useEffect } from "react";
import styles from "../Style/Navbar.module.css";
import { IoMdOptions } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = ({ grpFunc, ordFunc, grouping, ordering }) => {
  const [isHidden, setHidden] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.Navbar}>
      <button
        id='display-button'
        className={styles.displayButton}
        ref={dropdownRef}
      >
        <div
          className={styles.dropdown}
          onClick={(e) => {
            setHidden(!isHidden);
          }}
        >
          <IoMdOptions color='#374151' size={"1rem"} />
          <p className={styles.dropdownText}>Display</p>
          <RiArrowDropDownLine color='grey' size={"1.8rem"} />
        </div>
        {isHidden ? (
          <></>
        ) : (
          <div className={styles.hiddenBox}>
            <div className={styles.group}>
              <div className={styles.grouping}>Grouping</div>
              <select
                className={styles.selectGrp}
                name='grouping'
                id='grouping'
                defaultValue={(grouping === "userId" && "user") || grouping}
                onChange={(e) => {
                  if (e.target.value === "user") grpFunc("userId");
                  else grpFunc(e.target.value);
                }}
              >
                <option value='status'>Status</option>
                <option value='user'>User</option>
                <option value='priority'>Priority</option>
              </select>
            </div>
            <div className={styles.group}>
              <div className={styles.ordering}>Ordering</div>
              <select
                className={styles.selectGrp}
                name='ordering'
                id='ordering'
                defaultValue={ordering}
                onChange={(e) => {
                  ordFunc(e.target.value);
                }}
              >
                <option value='priority'>Priotity</option>
                <option value='title'>Title</option>
              </select>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Navbar;
