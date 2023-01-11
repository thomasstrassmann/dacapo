import React from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { axiosRes } from "../../api/axiosDefaults";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { EditDropdown } from "../../components/EditDropdown";
import { capitalize } from "../../utils/utils";

const Wanted = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_avatar,
    title,
    category,
    updated,
  } = props;

  const user = useUser();
  const history = useHistory();
  const is_owner = user?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/wanted/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/wanted/${id}/edit`);
  };

  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_avatar} height={55} />
            {owner}
          </Link>
          <div>
            <span>Updated:{updated}</span>
            {is_owner && (
              <EditDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/wanted/${id}`}>
        <Card.Body>
          {title && <Card.Title>{title}</Card.Title>}
          {category && <Card.Text>Category: {capitalize(category)}</Card.Text>}
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Wanted;
