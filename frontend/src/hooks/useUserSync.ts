import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

//The best way to implement this is by using webhooks

const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.fullName || user.firstName;

      if (!email || !name) {
        console.warn("User sync skipped: missing email or name");
        return;
      }
      syncUserMutation({
        email,
        name,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, isPending, isSuccess, syncUserMutation]);

  return { isSynced: isSuccess };
};

export default useUserSync;
