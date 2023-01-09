import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import settings from "../assets/icons/settings.svg";
import edit from "../assets/icons/edit.svg";
import delete_forever from "../assets/icons/delete_forever.svg";
import styles from "../styles/EditDropdown.module.css";


const Settings = React.forwardRef(({ onClick }, ref) => (
  <img
    src={settings}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const EditDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={Settings} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <img src={edit} alt="Edit your item"></img>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <img src={delete_forever} alt="Delete your item" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};