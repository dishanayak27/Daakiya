import type * as Party from "partykit/server";

// ── DAAKIYA PARTYKIT SERVER ────────────────────────────────
// Real-time multiplayer for the Daakiya browser game.
// Deploy with: npx partykit deploy
// ──────────────────────────────────────────────────────────

interface PlayerState {
  id: string;
  name: string;
  pos: { x: number; y: number; z: number };
  rot: { y: number };
  kurta: string;
  pant: string;
  skin: string;
  lastSeen: number;
}

export default class DaakiyaServer implements Party.Server {
  readonly room: Party.Room;
  private players: Map<string, PlayerState> = new Map();

  constructor(room: Party.Room) {
    this.room = room;
  }

  onConnect(conn: Party.Connection) {
    // Send existing players to the new connection
    const existing = Array.from(this.players.values()).map(p => ({
      type: "update",
      ...p,
    }));
    if (existing.length > 0) {
      conn.send(JSON.stringify({ type: "batch", players: existing }));
    }
    console.log(`[Daakiya] Player connected: ${conn.id}`);
  }

  onMessage(message: string, sender: Party.Connection) {
    let msg: any;
    try {
      msg = JSON.parse(message);
    } catch {
      return;
    }

    if (msg.type === "update") {
      // Validate & store player state
      const player: PlayerState = {
        id: sender.id,
        name: (msg.name || "Daakiya").substring(0, 20),
        pos: {
          x: Number(msg.pos?.x) || 0,
          y: Number(msg.pos?.y) || 30,
          z: Number(msg.pos?.z) || 0,
        },
        rot: { y: Number(msg.rot?.y) || 0 },
        kurta: msg.kurta || "#FF6B2B",
        pant: msg.pant || "#FFFFFF",
        skin: msg.skin || "#C68642",
        lastSeen: Date.now(),
      };
      this.players.set(sender.id, player);

      // Broadcast to all other players
      this.room.broadcast(
        JSON.stringify({ type: "update", ...player }),
        [sender.id]
      );
    }

    if (msg.type === "emote") {
      // Broadcast emote to everyone else
      this.room.broadcast(
        JSON.stringify({
          type: "emote",
          id: sender.id,
          emote: (msg.emote || "🙏").substring(0, 4),
        }),
        [sender.id]
      );
    }
  }

  onClose(conn: Party.Connection) {
    this.players.delete(conn.id);
    // Notify others
    this.room.broadcast(
      JSON.stringify({ type: "leave", id: conn.id }),
      [conn.id]
    );
    console.log(`[Daakiya] Player left: ${conn.id}`);
  }

  onError(conn: Party.Connection, error: Error) {
    console.error(`[Daakiya] Error for ${conn.id}:`, error);
    this.players.delete(conn.id);
  }
}
