import { useEffect, useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import useAuth from "../hooks/other/useAuth";
import { db, usersCol } from "../services/firebase";
import { User } from "../types/User.types";
import { doc, runTransaction } from "firebase/firestore";
import { IconButton, Tooltip } from "@chakra-ui/react";

type Media = {
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
};

const AddToPlanToWatchButton = ({
  mediaId,
  mediaTitle,
  mediaPoster,
}: Media) => {
  const { currentUser, userProfile } = useAuth();
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setIsInList(
        !!userProfile.watchlists.to_watch.find((m) => m.movieId === mediaId),
      );
    }
  }, [mediaId, userProfile]);

  const toggleList = async () => {
    if (currentUser) {
      const userRef = doc(usersCol, currentUser.uid);

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("Document does not exist.");
        }

        const userData = userDoc.data() as User;
        const movieId = mediaId;
        const movieTitle = mediaTitle;
        const moviePoster = mediaPoster;
        let updatedList;

        if (userData.watchlists.to_watch.find((r) => r.movieId === mediaId)) {
          updatedList = userData.watchlists.to_watch.filter(
            (m) => m.movieId !== mediaId,
          );
          setIsInList(false);
        } else {
          updatedList = [
            ...userData.watchlists.to_watch,
            { movieId, movieTitle, moviePoster },
          ];
          setIsInList(true);
        }

        transaction.update(userRef, {
          "watchlists.to_watch": updatedList,
        });
      });
    }
  };

  return (
    <Tooltip label="Plan to Watch">
      <IconButton
        onClick={toggleList}
        aria-label="Add movie to plan to watch"
        icon={<MdAssignmentAdd />}
        fontSize={"x-large"}
        backgroundColor={isInList ? "brand.yellow" : "brand.gray"}
        color={"brand.black"}
        _hover={{
          backgroundColor: "brand.white",
        }}
      />
    </Tooltip>
  );
};

export default AddToPlanToWatchButton;
