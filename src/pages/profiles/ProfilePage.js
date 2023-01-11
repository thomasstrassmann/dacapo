import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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
  const user = useUser();
  const { id } = useParams();

  const { pageProfile } = useProfile();
  const { handleFollow, handleUnfollow, setProfile } = useSetProfile();
  const [profile] = pageProfile.results;
  const is_owner = user?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileInstruments }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/instruments/?owner__profile=${id}`),
          ]);
        setProfile((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileInstruments(profileInstruments);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfile]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.avatar}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.instruments_count}</div>
              <div>instruments</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
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
      <Col className="py-2 p-0 p-lg-2" lg={8}>
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
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <ProfilesOverview />
      </Col>
    </Row>
  );
}

export default ProfilePage;
