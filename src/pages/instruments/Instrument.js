import React from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";


const Instrument = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_avatar,
    bookmarks_count,
    bookmark_id,
    title,
    description,
    image,
    price,
    category,
    created,
    updated,
    instrumentPage,
  } = props;

  const user = useUser();
  const is_owner = user?.username === owner;

  return (
    <Card>
    <Card.Body>
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_avatar} height={55} />
          {owner}
        </Link>
        <div>
         <span>Created:{created}</span>
          <span>Updated:{updated}</span>
          {is_owner && instrumentPage && "..."}
        </div>
      </Media>
    </Card.Body>

    <Link to={`/instruments/${id}`}>
      <Card.Img src={image} alt={title} />
    </Link>

    <Card.Body>
      {title && <Card.Title>{title}</Card.Title>}
      {category && <Card.Text>{category}</Card.Text>}

      {description && <Card.Text>{description}</Card.Text>}
      {brand && <Card.Text>{brand}</Card.Text>}

      {price && <Card.Text>{price}</Card.Text>}

      {description && <Card.Text>{description}</Card.Text>}

      <div>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can not bookmark your own instrument!</Tooltip>}>
          </OverlayTrigger>
        ) : bookmark_id ? (
          <span onClick={() => {}}>
            Bookmark
          </span>
        ) : user ? (
          <span onClick={() => {}}>
            Bookmark
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to bookmark an instrument!</Tooltip>}>
          </OverlayTrigger>
        )}
        {bookmarks_count}
      </div>
    </Card.Body>
  </Card>
);
};


export default Instrument;