import { useRouter, useSegments } from "expo-router";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebaseConfig";

const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    // router.replace("/home");
    if (!user && !inAuthGroup) {
      router.replace("/start");
    } else if (user && inAuthGroup) {
      router.replace("/home/shopLists");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      setAuth(authenticatedUser);
    });

    return () => unsubscribe();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (authenticatedUser) => setAuth(authenticatedUser),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
