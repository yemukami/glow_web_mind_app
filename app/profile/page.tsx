import { getUserProfile } from "../../lib/data/api";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  const profile = await getUserProfile();
  return <ProfileForm initialProfile={profile} />;
}
