import React, { useState, useEffect } from "react";
import { MainView } from "./pages/MainView";
import { SignInPage } from "./components/SignInPage";
import { handleAuthStateChange } from "./utils/authRequests";
import { SignOut } from "./components/SignOut";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(function handleAuthStateChangeOnMount() {
    const unsubscribe = handleAuthStateChange((userDetails) => {
      console.log('-> got a user: ',userDetails)
      if (!userDetails && user) {
        setUser(null);
        return
      };

      if (userDetails && !user) {
        setUser(userDetails);
        return
      }

      if (userDetails && user) {
        if (userDetails.uid !== user.uid)
          setUser(userDetails);
      }
    });

    return () => { unsubscribe() };
  }, [user])

  if (user) {
    return (
      <>
        <SignOut />
        <MainView name={user.displayName} />
      </>
    )
  }

  return (
    <SignInPage />
  );
}

export { App };
