import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return <p>Welcome {session.user?.name}, you are logged in!</p>;
}
