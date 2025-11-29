/**
 * Stub of the BLE command protocol.
 * Adapt this file using glow_web_app/ble_protocol.js as the source of truth.
 */

export type RunnerColor = "red" | "blue" | "green" | "yellow";

export interface CommandPayload {
  type: "setColor" | "setPace" | "start" | "stop" | "reset" | "addDevice" | "blink";
  bytes: Uint8Array;
}

export function buildSetColor(_color: RunnerColor): CommandPayload {
  // TODO: port actual byte layout from glow_web_app/ble_protocol.js
  return { type: "setColor", bytes: new Uint8Array([0x00]) };
}

export function buildSetPace(_paceMs: number): CommandPayload {
  // TODO: convert target pace to device-specific byte sequence.
  return { type: "setPace", bytes: new Uint8Array([0x00]) };
}

export function buildStart(): CommandPayload {
  return { type: "start", bytes: new Uint8Array([0x00]) };
}

export function buildStop(): CommandPayload {
  return { type: "stop", bytes: new Uint8Array([0x00]) };
}

export function buildReset(): CommandPayload {
  return { type: "reset", bytes: new Uint8Array([0x00]) };
}

export function buildAddDevice(_mac: string): CommandPayload {
  // TODO: encode MAC address into the expected payload.
  return { type: "addDevice", bytes: new Uint8Array([0x00]) };
}

export function buildBlink(_mac: string): CommandPayload {
  // TODO: replace with real blink command bytes.
  return { type: "blink", bytes: new Uint8Array([0x00]) };
}
