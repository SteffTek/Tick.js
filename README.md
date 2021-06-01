# Tick.js
**Execute tasks multiple times a second based on a tick count.**

# About
**Tick.js** was created during a webex call in which we learned to use git __like I didn't already knew__, so because I got bored and I needed a tick based system for one of my projects, Tick.js was born.

# Installation
NodeJS Installation
```
npm i W.I.P
```
- or -
As script for the browser
```html
<script src="https://unpkg.com/browse/PACKAGE@latest/Tick.js" type="text/javascript"></script>
```

# Usage
```js
/* Import Tick.js */
const TickSystem = require("Tick.js");

/* Create New Tick System */
/* Starts Tick System aswell */
/* Default Tickrate: 64 */
const tickSystem = new TickSystem();

/* To use other Tickrate */
const tickSystem = new TickSystem(32);

/* Add new Callback */
tickSystem.onTick(debug);

/* Remove Callback */
tickSystem.offTick(debug);

/* Debug Function */
function debug() {
  console.log(tickSystem.currentTick);
}

/* Stop Ticking */
tickSystem.stop();

/* Start Ticking */
/* Only needed if stopped */
tickSystem.start();
```

# What is a tick rate?
**Tick Rate** defines how many times a second, the onTick function will execute. A much more simple explaination: Tick Rate is __kinda__ like FPS in Games. More FPS means smoother animations or physics interpolation, but the cost is a higher usage of system resources.


# Variables
```js
tickSystem.callbacks : Array  // All Callbacks that are registered

tickSystem.tickRate : Number    // Tick rate specified on creation
tickSystem.currentTick : Number // The current tick from 0 to (tickRate - 1)
tickSystem.tickLatency : Number // Latency between the ticks in ms
tickSystem.tickDelta : Number   // Latency between the ticks in seconds

tickSystem.lastTick : Number  // Timestamp in ms of the last executed tick
tickSystem.tickTime : Number  // Time in ms per tick
```

### Initial Testing seemed stable and performant! ❤
