import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export default function ActivityPage({
  activities,
  toggleBookmark,
  bookmarks,
  showInstallPrompt,
  install,
}) {
  const [randomActivities, setRandomActivities] = useState([]);
  const NUM_OF_RANDOM_ACTIVITIES = 6;

  function getRandomActivities() {
    if (NUM_OF_RANDOM_ACTIVITIES >= activities.length) {
      return [...activities];
    }

    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, NUM_OF_RANDOM_ACTIVITIES);
  }

  useEffect(() => {
    setRandomActivities(getRandomActivities());
  }, [activities]);

  return (
    <>
      <Header>Activity Planner</Header>

      <Container>
        {showInstallPrompt && (
          <InstallPrompt>
            <p>Install Super Activities for a better experience!</p>
            <Button onClick={install} isPrimary>
              Add to Home Screen
            </Button>
          </InstallPrompt>
        )}

        {showInstallPromt && (
          <InstallButton onClick={install}>Install App</InstallButton>
        )}
        <SloganContainer>Your new adventure starts here ...</SloganContainer>
        <SearchBarContainer>
          <SearchIconContainer>
            <FaSearch size={20} />
          </SearchIconContainer>
          <SearchInput placeholder="Search activities..." />
          <SearchButtonContainer>
            <Button isPrimary>Search</Button>
          </SearchButtonContainer>
        </SearchBarContainer>

        <ActivitiesTitle>Activities</ActivitiesTitle>

        <RandomActivitiesContainer>
          {randomActivities.map((activity) => {
            const isBookmarked = bookmarks?.includes(activity.id) || false;
            return (
              <ActivityCard
                key={activity.id}
                {...activity}
                toggleBookmark={() => toggleBookmark(activity.id)}
                showHeart={true}
                isBookmarked={isBookmarked}
              />
            );
          })}
        </RandomActivitiesContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 32px;
`;

const SloganContainer = styled.section`
  font-size: 1.5rem;
  text-align: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  width: 90%;
  max-width: 600px;
`;

const SearchIconContainer = styled.div`
  margin-right: 0.5rem;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;
const ActivitiesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 16px;
  color: #333;
  text-align: left;
  padding-left: 16px;
  display: inline;
  align-self: flex-start;
`;

const SearchInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 0.5rem;
  width: 100%;
`;

const RandomActivitiesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* Default to 1 column on small screens */
  width: 100%;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr; /* 2 columns for medium screens */
  }

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns for larger screens */
  }
`;
const InstallButton = styled.button`
  position: fixed;
  top: 80px;
  right: 0px;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: linear-gradient(to right, #4776e6, #8e54e9);
`;
const InstallPrompt = styled.div`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
  max-width: 90%;
  text-align: center;
`;
