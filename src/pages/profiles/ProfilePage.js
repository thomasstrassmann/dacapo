import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Alert, Container } from "react-bootstrap";

import Asset from "../../components/Asset";
import Instrument from "../instruments/Instrument";

import search_null from "../../assets/icons/search_null.svg";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import instrumentStyles from "../../styles/Instrument.module.css";
import btnStyles from "../../styles/Button.module.css";

import { ProfileEditDropdown } from "../../components/EditDropdown";

import { useUser } from "../../contexts/UserContext";
import { useProfile, useSetProfile } from "../../contexts/ProfileContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import { Button, Image } from "react-bootstrap";
import { fetchMore } from "../../utils/utils";

import BackButton from "../../components/BackButton";
import InfiniteScroll from "react-infinite-scroll-component";
import Star from "../../components/Star";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileInstruments, setProfileInstruments] = useState({ results: [] });
  const [errors, setErrors] = useState({});
  const [ratingData, setRatingData] = useState({ rating: "" });
  const [numOfRatings, setNumOfRatings] = useState({ count: 0 });
  const { rating } = ratingData;

  const [ratedUsers, setRatedUsers] = useState({ results: [] });

  const user = useUser();
  const { id } = useParams();

  const { pageProfile } = useProfile();
  const { handleFollow, handleUnfollow, setProfile } = useSetProfile();
  const [profile] = pageProfile.results;
  const is_owner = user?.username === profile?.owner;

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [
            { data: pageProfile },
            { data: profileInstruments },
            { data: ratedUsers },
            { data: numOfRatings },
          ] = await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/instruments/?owner__profile=${id}`),
            axiosReq.get(`/rating/?owner__id=${user.pk}`),
            axiosReq.get(`/rating/?profile_id=${id}`),
          ]);
          setProfile((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }));
          setProfileInstruments(profileInstruments);
          setRatedUsers(ratedUsers);
          setNumOfRatings(numOfRatings);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };

      setHasLoaded(false);
      const timeout = setTimeout(() => {
        fetchData();
      }, 800);

      return () => {
        clearTimeout(timeout);
      };
    }
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
      {ratedUsers.results.some((item) => item.profile_id === parseInt(id)) ? (
        <p className="text-center">You already rated this profile!</p>
      ) : (
        <Form onSubmit={handleSubmit} className={styles.RatingContainer}>
          <Form.Group>
            <Form.Label className={styles.RatingLabel}>Rating</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              value={rating}
              onChange={handleChange}
              className={styles.RatingInput}
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
          <Button className={btnStyles.DefaultButton} type="submit">
            rate
          </Button>
        </Form>
      )}
    </>
  );

  const ratingDisplay = (
    <div className={styles.RatingInfo}>
    {profile?.average_rating.toFixed(1)}
    <Star/>
    <span className={styles.NumberOfRatings}>({numOfRatings.count})</span>
    </div>
  )

  const mainProfile = (
    <>
      <Row className={styles.TopMargin}>
        <Col className="d-flex justify-content-center">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.avatar}
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <h3>{profile?.owner}</h3>
          {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {user &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={btnStyles.DefaultButton}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={btnStyles.DefaultButton}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
      <Container className={styles.ProfileDetailsContainer}>
      <Row>
        <Col
          className={`d-flex justify-content-center ${styles.ProfileDetails} ${styles.ProfileSpacing}`}
        >
          <span>Followers: {profile?.followers_count}</span>
          <span>Following: {profile?.following_count}</span>
        </Col>
      </Row>
      <Row>
        <Col
          className={`d-flex justify-content-center ${styles.ProfileDetails}`}
        >
          <span>Instruments: {profile?.instruments_count}</span>
        </Col>
      </Row>
      <Row>
        <Col
          className={`d-flex justify-content-center ${styles.ProfileDetails}`}
        >
          {profile?.phone && <span>Phone: {profile?.phone}</span>}
        </Col>
      </Row>
      </Container>

      <Row>
        <Col
          className={`${styles.ProfileRating} ${styles.ProfileDetails}`}
        >
          Rating: 
          {profile?.average_rating === 0
            ? " No ratings yet!"
            : <div>{ratingDisplay}</div>}
        </Col>
      </Row>
      <Row className={styles.ProfileInstrumentsMargin}>
        <Col className="d-flex justify-content-center">
          {!is_owner && ratingField}
        </Col>
      </Row>
    </>
  );

  const mainProfileInstruments = (
    <>
      <hr className={instrumentStyles.Line} />
      <p className={`text-center ${styles.ProfileDetails}`}>
        Instruments of {profile?.owner}
      </p>
      <hr className={instrumentStyles.Line} />

      <Container className={appStyles.ScrollContainer}>
        {profileInstruments.results.length ? (
          <InfiniteScroll
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "80px",
              width: "100%",
              justifyContent: "center",
            }}
            children={profileInstruments.results.map((instrument) => (
              <Instrument
                key={instrument.id}
                {...instrument}
                setInstruments={setProfileInstruments}
                style={{ width: "300px" }}
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
      </Container>
    </>
  );

  return (
    <>
      <Row>
        <Col>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileInstruments}
            </>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
}

export default ProfilePage;
