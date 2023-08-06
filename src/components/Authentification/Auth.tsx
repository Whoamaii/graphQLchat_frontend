import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      //createusername
    } catch (error) {
      console.log("submit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack alignItems="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text>MessengerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/img/googlelogo.png" />}
            >
              Sign In
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
