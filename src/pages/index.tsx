import { Inter } from "@next/font/google";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";
import { db, firebaseApp } from "../../firebase/clientApp";
import Login from "./login";


type VoteDocument = {
  vote: string;
};

const auth = getAuth(firebaseApp);

export default function Home() {
  // User Authentication
  const [user, loading, error] = useAuthState(auth);
  console.log("Loading...", loading, "user", user?.email);

  // Votes Collection
  const [votes, votesLoading, votesError] = useCollection(
    collection(getFirestore(firebaseApp), "votes"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  // Create document function
  const addVoteDocument = async (vote: string, uid: string) => {
    await db.collection("votes").doc(uid).set({
      vote,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      {loading && <h4>Loading...</h4>}
      {user == null && <Login />}
      {user && (
        <>
          <h1>What would you vote for?</h1>

          <div style={{ flexDirection: "row", display: "flex", padding:'20px' }}>
            <button
              style={{
                fontSize: 32,
                marginRight: 8,
                backgroundColor: "#7960DF",
              }}
              onClick={() => addVoteDocument("Work from Home", user.uid)}
            >
              Work from Home 🏠
            </button>

            <h3 style={{color: 'black', paddingTop: '10px'}}>
              People Love working from Home:{" "}
              {
                votes?.docs?.filter(
                  (doc) => (doc.data() as VoteDocument).vote === "Work from Home"
                ).length
              }
            </h3>

          </div>

          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              style={{
                fontSize: 32,
                marginRight: 8,
                backgroundColor: "#7960DF",
              }}
              onClick={() => addVoteDocument("Work from Office", user.uid)}
            >
              Work from Office 🏢
            </button>

            <h3 style={{color: 'black', paddingTop: '10px'}}>
              People Love working from Office:{" "}
              {
                votes?.docs?.filter(
                  (doc) => (doc.data() as VoteDocument).vote === "Work from Office"
                ).length
              }
            </h3>

          </div>

          <div style={{ marginTop: "64px" }}>
            <h3 style={{color: 'black'}}>Voters:</h3>
            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                width: "240px",
              }}
            >
              {/* {votes?.docs?.map((doc) => (
                  <VoterList />
                
              ))} */}
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
