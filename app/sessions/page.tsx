import { getSessions } from "../../lib/data/api";
import SessionList from "./session-list";

export default async function SessionsPage() {
  const sessions = await getSessions();
  return <SessionList initialSessions={sessions} />;
}
