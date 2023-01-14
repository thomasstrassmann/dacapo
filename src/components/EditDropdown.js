import React from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import settings from "../assets/icons/settings.svg";
import edit from "../assets/icons/edit.svg";
import delete_forever from "../assets/icons/delete_forever.svg";
import settings_account from "../assets/icons/settings_account.svg";
import badge from "../assets/icons/badge.svg";
import lock from "../assets/icons/lock.svg";

import styles from "../styles/EditDropdown.module.css";

const Settings = React.forwardRef(({ onClick }, ref) => (
  <>
  <img
    src={settings}
    ref={ref}
    alt="Settings"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
  </>
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

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={Settings} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="change profile"
        >
          <img src={settings_account} alt="Edit" /> Edit profile
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="change username"
        >
          <img src={badge} alt="Change username" />
          Change username
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="change password"
        >
          <img src={lock} alt="Change password" />
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
