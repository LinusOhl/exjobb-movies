import { useEffect, useState } from "react";
import useAuth from "../hooks/other/useAuth";
import { db, usersCol } from "../services/firebase";
import { Review } from "../types/Review.types";
import { User } from "../types/User.types";
import { checkForNewBadge } from "../utils/functions";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { Box, Button, Flex, Heading, Text, Textarea } from "@chakra-ui/react";

const MediaReviews = ({ mediaId }: { mediaId: number }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("movieId", "==", mediaId),
        orderBy("timestamp", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map((doc) => doc.data() as Review);
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [mediaId]);

  const handleReviewSubmit = async () => {
    if (currentUser && currentUser.email && newReview.trim()) {
      const userRef = doc(usersCol, currentUser.uid);

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User document does not exist.");
        }

        const userData = userDoc.data() as User;

        let newExp = (userData.exp || 0) + 20;
        let newLevel = userData.level || 1;
        const newReviewCount = (userData.reviews || 0) + 1;

        if (newExp >= 50) {
          newExp = 0;
          newLevel += 1;
        }

        transaction.update(userRef, {
          exp: newExp,
          level: newLevel,
          reviews: newReviewCount,
        });
      });

      const reviewData: Review = {
        movieId: mediaId,
        user: currentUser.email,
        reviewText: newReview,
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, "reviews"), reviewData);
      setReviews([...reviews, reviewData]);
      setNewReview("");

      checkForNewBadge(currentUser.uid);
    }
  };

  return (
    <Box>
      <Heading fontWeight={""}>Write a review</Heading>

      <Box mb={4}>
        <Textarea
          placeholder="Write a review!"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          mb={2}
        />
        <Button onClick={handleReviewSubmit}>Submit review</Button>
      </Box>

      {reviews && (
        <Box>
          {reviews.map((review, index) => (
            <Flex
              flexDirection={"column"}
              backgroundColor={"brand.dark-gray"}
              borderRadius={"lg"}
              borderWidth={"1px"}
              borderColor={"brand.gray"}
              p={4}
              mb={4}
              key={index}
            >
              <Heading fontWeight={""} fontSize={"large"} mb={2}>
                {review.user}
              </Heading>
              <Text mb={2}>{review.reviewText}</Text>
              <Text fontSize={"small"}>
                {review.timestamp.toDate().toISOString()}
              </Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MediaReviews;
