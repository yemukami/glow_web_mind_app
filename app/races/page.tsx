import { getRaces } from "../../lib/data/api";
import RaceList from "./race-list";

export default async function RacesPage() {
  const races = await getRaces();
  return <RaceList initialRaces={races} />;
}
