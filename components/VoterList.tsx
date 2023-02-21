import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat/app';
import { db } from '../firebase/clientApp';
import { collection, getDocs } from "firebase/firestore"; 


interface Props {
  // id is the id of the vote document
  // (which is also the uid of the user, and the name of the user doucment for that user)
  uid: string;
  vote: string;
}

export default async function VoterList(): Promise<ReactElement> {
    const querySnapshot = await getDocs(collection(db, "votes"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* <img
        style={{
          borderRadius: "50%",
          maxHeight: "48px",
          marginTop: "8px",
          marginRight: "8px",
        }}
        // src={querySnapshot.data().photoURL}
      /> */}
      <div>
        {/* <h4 style={{ marginBottom: 0 }}>{value.data().displayName}</h4> */}
        {/* <h4 style={{ marginTop: 0 }}>
          Voted: {vote === "yes" ? "✔️🍍" : "❌🍍"}
        </h4> */}
      </div>
    </div>
  );
}