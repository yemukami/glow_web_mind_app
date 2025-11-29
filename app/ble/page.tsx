import { fetchGlowRDevicesFromDb } from "../../lib/ble/controller";
import BleSimulator from "./simulator";

export default async function BlePage() {
  const mockDevices = await fetchGlowRDevicesFromDb();
  
  return <BleSimulator mockDevices={mockDevices} />;
}
