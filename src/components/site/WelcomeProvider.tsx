import React, { createContext, useContext, useState, useEffect } from "react";

const WelcomeContext = createContext<{
  welcomeDone: boolean;
  setWelcomeDone: (done: boolean) => void;
}>({
  welcomeDone: false,
  setWelcomeDone: () => {},
});

export const WelcomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [welcomeDone, setWelcomeDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("welcome-done") === "true") {
        setWelcomeDone(true);
      }
    } catch {
      // sessionStorage unavailable — proceed with intro shown normally
    }
  }, []);

  const handleSetWelcomeDone = (done: boolean) => {
    setWelcomeDone(done);
    if (done && typeof window !== "undefined") {
      try {
        sessionStorage.setItem("welcome-done", "true");
      } catch {
        // ignore — not critical if this fails
      }
    }
  };

  return (
    <WelcomeContext.Provider value={{ welcomeDone, setWelcomeDone: handleSetWelcomeDone }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export const useWelcome = () => useContext(WelcomeContext);
