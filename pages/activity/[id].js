import { useRouter } from "next/router";
import ActivityDetails from "@/components/layout/ActivityDetails";
import Button from "@/components/ui/Button";
import { useState } from "react";
import ActivityForm from "@/components/layout/ActivityForm";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import Head from "next/head";

export default function ActivityPage({
  activities,
  handleEditActivity,
  handleDeleteActivity,
  toggleBookmark,
  bookmarks,
  showHeart = true,
}) {
  const router = useRouter();
  const { id } = router.query;
  const activity = activities.find((activity) => activity.id === id);
  const [showForm, setShowForm] = useState(false);

  function deleteActivity(id) {
    handleDeleteActivity(id);
  }

  if (!activity) return <p>Loading...</p>;
  function handleToggleEdit() {
    setShowForm(!showForm);
  }
  const isBookmarked = bookmarks?.includes(id) || false;

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Details</Header>
      {!showForm ? (
        <StyledSection>
          <Button onClick={() => setShowForm(true)} isPrimary>
            Edit activity
          </Button>
        </StyledSection>
      ) : (
        <ActivityForm
          handleToggleEdit={handleToggleEdit}
          handleEditActivity={handleEditActivity}
          activity={activity}
        />
      )}
      <ActivityDetails
        {...activity}
        deleteActivity={deleteActivity}
        toggleBookmark={() => toggleBookmark(id)}
        isBookmarked={isBookmarked}
        showHeart={showHeart}
      />
    </>
  );
}
const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
