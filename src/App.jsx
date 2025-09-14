import { useEffect, useState } from "react";
import SignInButton from "./components/SignInButton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import MainScreen from "./components/MainScreen";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const [user, setUser] = useState("loading");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u === null) {
        setUser(undefined);
        return;
      }

      setUser(u);
    });
  }, []);

  return (
    <main className="w-full h-dvh bg-zinc-900 text-zinc-100 flex items-center justify-center">
      {user === "loading" ? (
        <Icon icon="svg-spinners:180-ring" className="text-zinc-500 size-8" />
      ) : user === undefined ? (
        <SignInButton />
      ) : (
        <MainScreen user={user} />
      )}
    </main>
  );
}

export default App;
