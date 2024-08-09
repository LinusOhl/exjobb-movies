import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import useAuth from "../hooks/other/useAuth";
import { db, usersCol } from "../services/firebase";
import { User } from "../types/User.types";
import { doc, runTransaction } from "firebase/firestore";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

type Media = {
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
};

type MovieRating = {
  movieId: number;
  rating: number;
  movieTitle: string;
  moviePoster: string;
};

const RateButton = ({ mediaId, mediaTitle, mediaPoster }: Media) => {
  const { currentUser, userProfile } = useAuth();
  const [rating, setRating] = useState(1);
  const [hasRated, setHasRated] = useState(false);
  const [ratedMovie, setRatedMovie] = useState<MovieRating | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (userProfile && userProfile.ratings) {
      const existingRating = userProfile.ratings.find(
        (r) => r.movieId === mediaId,
      );
      if (existingRating) {
        setHasRated(true);
        setRatedMovie(existingRating);
      }
    }
  }, [mediaId, userProfile]);

  const submitRating = async () => {
    if (currentUser) {
      const userRef = doc(usersCol, currentUser.uid);

      const movieTitle = mediaTitle;
      const moviePoster = mediaPoster;
      const movieId = mediaId;

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("Document does not exist.");
        }

        const userData = userDoc.data() as User;
        const newRatings = userData.ratings ? [...userData.ratings] : [];

        const existingRatingIndex = newRatings.findIndex(
          (r) => r.movieId === movieId,
        );
        if (existingRatingIndex !== -1) {
          newRatings[existingRatingIndex] = {
            movieId,
            rating,
            movieTitle,
            moviePoster,
          };
        } else {
          newRatings.push({ movieId, rating, movieTitle, moviePoster });
        }

        let newExp = (userData.exp || 0) + 5;
        let newLevel = userData.level || 0;

        if (newExp >= 50) {
          newExp = 0;
          newLevel += 1;
        }

        transaction.update(userRef, {
          ratings: newRatings,
          exp: newExp,
          level: newLevel,
        });
      });

      setHasRated(true);
      setRatedMovie({ movieId, rating, movieTitle, moviePoster });

      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Add Rating">
        <IconButton
          onClick={onOpen}
          aria-label="Add Rating"
          icon={<MdOutlineStar />}
          fontSize={"x-large"}
          backgroundColor={hasRated ? "brand.yellow" : "brand.gray"}
          color={"brand.black"}
          _hover={{
            backgroundColor: "brand.white",
          }}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"brand.dark-gray"}>
          <ModalHeader>Rate movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {hasRated && ratedMovie && (
              <Text>Current rating: {ratedMovie.rating}</Text>
            )}
            <Text>Rate the movie from 1-5</Text>
            <Slider
              defaultValue={1}
              min={1}
              max={5}
              step={1}
              onChangeEnd={(value) => setRating(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <Button onClick={submitRating}>Submit rating</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RateButton;
