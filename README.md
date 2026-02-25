# 📮 DAAKIYA — एक छोटी दुनिया के बड़े किस्से

> *A tiny Indian planet. A young postman. Five letters that change everything.*

A production-ready browser game inspired by [Messenger (abeto.co)](https://messenger.abeto.co/), reimagined as a pan-India gully/bazaar world. Built with **Three.js**, **Cannon.js**, and **PartyKit** for real-time multiplayer.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **3D Spherical Planet** | Fully procedural Indian bazaar world — mandir, chai stall, khet, Dak Ghar, buildings, lamp posts, water tank |
| 👦 **Daakiya Character** | Custom postman with khaki+red-band cap, mail bag, full walk/run animations |
| 👕 **Character Customizer** | Kurta color, pant color, and 6 skin tones |
| 📮 **5 Delivery Quests** | Rich dialogue-driven delivery stories with Indian characters |
| 💬 **Typewriter Dialogue** | Multi-line NPC conversations with Hindi subtitles |
| 🎭 **Choice System** | Report card quest with player choice affecting outcome |
| 😄 **10 Indian Emotes** | 🙏 Namaste, 🤌 Kya Baat!, 💃 Nachna, ☕ Chai? and more |
| 👥 **Real-time Multiplayer** | PartyKit WebSocket multiplayer — see other daakiyas on the planet |
| 🗺️ **Minimap** | Live minimap showing player position, NPCs, and remote players |
| 📱 **Mobile Support** | Virtual joystick + action buttons for touch devices |
| 🎨 **Production UI** | Warm Indian palette, Baloo 2 / Tiro Devanagari fonts, smooth animations |
| 🌟 **Ambient Particles** | Floating firefly particles around the planet |
| 🏁 **Completion Screen** | End screen with delivery count, time, and emote stats |

---

## 🚀 Quick Start

### Play Locally (No Server Needed)

Just open `index.html` in any modern browser. The game works fully offline in single-player mode. Multiplayer gracefully falls back to solo if the server isn't connected.

```bash
# Option 1: Direct
open index.html

# Option 2: Local server (recommended for some browsers)
npx serve .
# or
python3 -m http.server 8080
```

---

## 🌐 Deploy the Full Game (with Multiplayer)

### Step 1: Set up PartyKit

```bash
# Install PartyKit CLI
npm install -g partykit

# Login
npx partykit login

# Deploy your server
npx partykit deploy
```

After deploying, PartyKit gives you a URL like:
```
https://daakiya.YOUR-PARTYKIT-USERNAME.partykit.dev
```

### Step 2: Update the game host

In `index.html`, find this line near the top:

```js
const PARTYKIT_HOST = 'daakiya.your-name.partykit.dev'; // replace with your PartyKit host
```

Replace with your actual URL:
```js
const PARTYKIT_HOST = 'daakiya.YOUR-PARTYKIT-USERNAME.partykit.dev';
```

### Step 3: Deploy the frontend

You can host `index.html` anywhere static:

| Platform | Command |
|---|---|
| **Vercel** | `npx vercel .` |
| **Netlify** | Drag-drop `index.html` to app.netlify.com |
| **GitHub Pages** | Push to `gh-pages` branch |
| **Cloudflare Pages** | Connect GitHub repo in dashboard |
| **itch.io** | Upload as HTML5 game zip |

---

## 📁 File Structure

```
daakiya/
├── index.html              ← Entire game (self-contained)
├── partykit.json           ← PartyKit configuration
├── party/
│   └── daakiya-world.ts    ← PartyKit multiplayer server
└── README.md               ← This file
```

---

## 🎮 Controls

| Action | Keyboard | Mobile |
|---|---|---|
| Move | WASD / Arrow Keys | Left Joystick |
| Jump | Space | ⬆️ Button |
| Interact / Advance dialogue | E | 📮 Button |
| Look around | Left Click + Drag | Right-side Swipe |
| Zoom | Scroll Wheel | — |
| Run | Hold Shift + Move | — |

---

## 📦 The 5 Deliveries

1. **🌾 Shambhu Kisan** — A farmer's angry letter to the Sarpanch about water shortage. The Sarpanch finds it amusing... and actually fixes things.

2. **💌 Pappu Sharma** — A rishta letter from his ammi. He panics, denies everything, then quietly asks for her name.

3. **👵 Saroj Dadi** — Her NRI grandson Arjun is finally coming home for Diwali after a year away.

4. **📝 Gudiya's Report Card** — *Player Choice:* Do you give it to Gudiya (the student) or her Ammi? The student gets 94%, so... surprise either way.

5. **📦 Ramesh's Mystery Parcel** — A suspicious package full of counterfeit goods. Ramesh refuses it on principle.

---

## 🎨 Customization Guide

### Adding new delivery quests

Add to the `DELIVERIES` array in `index.html`:

```js
{
  id: 'myquest',
  name: 'Character Name',
  icon: '🎁',
  desc: 'Location description',
  item: 'What you are delivering',
  color: 0xFF6B2B,
  receiver: { name: 'NPC Name', avatar: '👤' },
  dialogs: [
    // [0] = pickup dialog (not used directly)
    [],
    // [1] = delivery dialog shown to player
    [
      { speaker: 'NPC Name', avatar: '👤', text: 'What they say', hindi: 'Hindi subtitle (optional)' },
    ]
  ],
  complete: 'Toast message shown on completion'
}
```

Then add an NPC position to `NPC_POSITIONS`:
```js
{ id: 'myquest', lat: 20, lon: 150 }
```

### Adding new emotes

Add to the `EMOTES` array:
```js
{ icon: '🥁', label: 'Dhol' }
```

### Changing planet buildings

All buildings are in `buildBuildings()`. Add entries to the `buildings` array:
```js
// [lat, lon, width, height, depth, wallColor, roofColor]
[30, 200, 5, 4, 4, 0xFFCDD2, 0xE53935],
```

---

## 🎵 Adding Real Audio (Optional)

The game is currently silent. To add audio, place `.mp3`/`.ogg` files in your project and add to `initGame()`:

```js
// Ambient background music
const bgMusic = new Audio('audio/sitar-lofi.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.35;
bgMusic.play().catch(() => {}); // autoplay policy

// Sound effects
const deliverySound = new Audio('audio/delivery.mp3');
// Call deliverySound.play() in completeDelivery()
```

Recommended free audio sources:
- [Freesound.org](https://freesound.org/) — search "tabla", "sitar", "temple bell"
- [pixabay.com/music](https://pixabay.com/music/) — search "indian lofi"

---

## 🌐 Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 15+ | ✅ Full support |
| Mobile Chrome/Safari | ✅ Full support |
| Edge 90+ | ✅ Full support |

Requires WebGL 1.0+ (virtually all modern devices).

---

## 🔧 Tech Stack

- **Three.js r128** — 3D rendering (WebGL)
- **Cannon.js 0.6.2** — Physics engine
- **PartyKit** — Real-time WebSocket multiplayer
- **Baloo 2** — Display font (Google Fonts)
- **Tiro Devanagari Hindi** — Hindi subtitle font (Google Fonts)
- **Space Mono** — UI monospace font (Google Fonts)
- Zero dependencies beyond CDN links — no bundler needed

---

## 📝 License

MIT — do whatever you want with it. Jai Hind! 🇮🇳

---

*Built with ❤️ and chai ☕*
