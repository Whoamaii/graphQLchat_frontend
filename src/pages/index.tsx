import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import Chat from "../components/Chat/Chat";
import Auth from "../components/Authentification/Auth";
import { Session } from "next-auth";

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log("Here is DATA", session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
