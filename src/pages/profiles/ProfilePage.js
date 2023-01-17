import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";

import Asset from "../../components/Asset";
import Instrument from "../instruments/Instrument";

import search_null from "../../assets/icons/search_null.svg";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import ProfilesOverview from "./ProfilesOverview";
import { ProfileEditDropdown } from "../../components/EditDropdown";

import { useUser } from "../../contexts/UserContext";
import { useProfile, useSetProfile } from "../../contexts/ProfileContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import { Button, Image } from "react-bootstrap";
import { fetchMore } from "../../utils/utils";

import InfiniteScroll from "react-infinite-scroll-component";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileInstruments, setProfileInstruments] = useState({ results: [] });
  const [errors, setErrors] = useState({});
  const [ratingData, setRatingData] = useState({ rating: "" });
  const [ratedUsers, setRatedUsers] = useState({ results: [] });
  const { rating } = ratingData;

  const user = useUser();
  const { id } = useParams();

  const { pageProfile } = useProfile();
  const { handleFollow, handleUnfollow, setProfile } = useSetProfile();
  const [profile] = pageProfile.results;
  const is_owner = user?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profileInstruments },
          { data: ratedUsers },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/instruments/?owner__profile=${id}`),
          axiosReq.get(`/rating/?owner__id=${user.pk}`),
        ]);
        setProfile((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileInstruments(profileInstruments);
        setRatedUsers(ratedUsers);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfile, user]);

  const handleChange = (event) => {
    setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("profile_id", id);
    formData.append("rating", ratingData.rating);

    try {
      await axiosReq.post("/rating/", formData);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const ratingField = (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            name="rating"
            value={rating}
            onChange={handleChange}
            placeholder="Rate the seller"
            aria-label="Rate the seller"
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </Form.Control>
        </Form.Group>
        {errors?.rating?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Button className={btnStyles.CreateFormButton} type="submit">
          rate
        </Button>
      </Form>
    </>
  );

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.avatar}
          />
        </Col>
        <Col>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
              <div>{profile?.followers_count} followers</div>
            </Col>
            <Col className="my-2">
              <div>{profile?.following_count} following</div>
            </Col>
          </Row>
          <Row>
            <Col className="my-2">
              <div>{profile?.instruments_count} instruments</div>
            </Col>
            <Col className="my-2">
              <div>
                Rating:
                {profile?.average_rating === 0
                  ? "No ratings yet!"
                  : profile?.average_rating}
              </div>
            </Col>
          </Row>
        </Col>
        <Row>
          <Col>
            {user &&
              !is_owner &&
              (profile?.following_id ? (
                <Button
                  className={btnStyles.Button}
                  onClick={() => handleUnfollow(profile)}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  className={btnStyles.Button}
                  onClick={() => handleFollow(profile)}
                >
                  follow
                </Button>
              ))}
          </Col>
        </Row>
        <Row>
          <Col>
            {user?.username === profile?.owner
              ? "You can not rate your own account!"
              : ratingField}
            {ratedUsers.results.map((ratedProfile) =>
              ratedProfile.profile_id === id
                ? "You already rated this profile!"
                : ratingField
            )}
          </Col>
        </Row>
      </Row>
    </>
  );

  const mainProfileInstruments = (
    <>
      <hr />
      <p className="text-center">Instruments of {profile?.owner}</p>
      <hr />
      {profileInstruments.results.length ? (
        <InfiniteScroll
          children={profileInstruments.results.map((instrument) => (
            <Instrument
              key={instrument.id}
              {...instrument}
              setInstruments={setProfileInstruments}
            />
          ))}
          dataLength={profileInstruments.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileInstruments.next}
          next={() => fetchMore(profileInstruments, setProfileInstruments)}
        />
      ) : (
        <Asset
          src={search_null}
          feedback={`${profile?.owner} has no instruments to sell at this point.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2">
        <ProfilesOverview mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileInstruments}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
