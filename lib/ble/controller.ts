/**
 * BLE controller stub with command queue semantics.
 * Use glow_web_app/app.js queue implementation as the behavioral reference.
 */

import {
  buildAddDevice,
  buildBlink,
  buildReset,
  buildSetColor,
  buildSetPace,
  buildStart,
  buildStop,
  type CommandPayload,
  type RunnerColor
} from "./protocol";

export interface GlowDevice {
  mac: string;
  name?: string;
}

type QueueItem = { payload: CommandPayload; highPriority?: boolean };

export class BleController {
  // TODO: inject Web Bluetooth characteristics once wired. Currently stubbed.
  private queue: QueueItem[] = [];
  private isBusy = false;

  /**
   * Stub: replace with Web Bluetooth connect logic.
   * Device discovery/selection must be triggered by a user gesture.
   */
  async connect(): Promise<void> {
    // no-op stub
  }

  async disconnect(): Promise<void> {
    // no-op stub
  }

  enqueue(payload: CommandPayload, highPriority = false) {
    if (highPriority) {
      this.queue = [payload].map((p) => ({ payload: p, highPriority: true }));
    } else {
      this.queue.push({ payload, highPriority });
    }
    void this.flush();
  }

  private async flush() {
    if (this.isBusy) return;
    const next = this.queue.shift();
    if (!next) return;
    this.isBusy = true;
    try {
      await this.write(next.payload);
    } finally {
      this.isBusy = false;
      if (this.queue.length > 0) {
        void this.flush();
      }
    }
  }

  private async write(_payload: CommandPayload) {
    // TODO: port write-without-response flow with timeout from glow_web_app/app.js
    // to handle GATT busy errors safely.
  }
}

/**
 * Stub: in this app we will fetch glow-r list from DB/API instead of
 * discovering via BLE here. Leave this as a placeholder to be replaced.
 */
export async function fetchGlowRDevicesFromDb(): Promise<GlowDevice[]> {
  return [
    { mac: "00:11:22:33:44:55", name: "demo-rabbit-1" },
    { mac: "AA:BB:CC:DD:EE:FF", name: "demo-rabbit-2" }
  ];
}

// Convenience wrappers (will map to UI actions)
export function createSetColorCommand(color: RunnerColor) {
  return buildSetColor(color);
}

export function createSetPaceCommand(paceMs: number) {
  return buildSetPace(paceMs);
}

export function createStartCommand() {
  return buildStart();
}

export function createStopCommand() {
  return buildStop();
}

export function createResetCommand() {
  return buildReset();
}

export function createAddDeviceCommand(mac: string) {
  return buildAddDevice(mac);
}

export function createBlinkCommand(mac: string) {
  return buildBlink(mac);
}
