import { useEffect, useState } from "react";

export default function useGetUser() {
  const [userAtStorage, setUserAtStorage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));

    if (!userData) {
      return;
    }

    setUserAtStorage(userData);
  }, []);

  return userAtStorage;
}
