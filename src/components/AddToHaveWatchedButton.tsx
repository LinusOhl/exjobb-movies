import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
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

const AddToHaveWatchedButton = ({
  mediaId,
  mediaTitle,
  mediaPoster,
}: Media) => {
  const { currentUser, userProfile } = useAuth();
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setIsInList(
        !!userProfile.watchlists.have_watched.find(
          (m) => m.movieId === mediaId,
        ),
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

        if (
          userData.watchlists.have_watched.find((r) => r.movieId === mediaId)
        ) {
          updatedList = userData.watchlists.have_watched.filter(
            (m) => m.movieId !== mediaId,
          );
          setIsInList(false);
        } else {
          updatedList = [
            ...userData.watchlists.have_watched,
            { movieId, movieTitle, moviePoster },
          ];
          setIsInList(true);
        }

        transaction.update(userRef, {
          "watchlists.have_watched": updatedList,
        });
      });
    }
  };

  return (
    <Tooltip label="Add to Watched">
      <IconButton
        onClick={toggleList}
        aria-label="Add movie to have watched"
        icon={<MdAdd />}
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

export default AddToHaveWatchedButton;
