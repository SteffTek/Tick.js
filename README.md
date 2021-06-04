[![Discord](https://img.shields.io/discord/803319138260090910?color=%237289DA&label=Discord)](https://discord.gg/Qgv8DSMYM3) ![License](https://img.shields.io/github/license/SteffTek/Tick.js) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/stefftek/tick.js)](https://github.com/SteffTek/tick.js) [![GitHub issues](https://img.shields.io/github/issues/stefftek/tick.js)](https://github.com/SteffTek/tick.js/issues) ![Build](https://img.shields.io/github/workflow/status/SteffTek/Tick.js/Node.js%20Package)

# Tick.js
**Execute tasks multiple times a second based on a tick count. Tick.js helps to maintain a clean code without the need of thousands of setIntervals and it's easy to use!**

# About
**Tick.js** was created during a webex call in which we learned to use git __like I didn't already knew__, so because I got bored and I needed a tick based system for one of my projects, Tick.js was born.

## New in 1.1.0
You can now execute functions after x amount of ticks.

# Installation
NodeJS Installation
```
npm i @stefftek/tick.js
```
***or*** - script tag for the browser
```html
<script src="https://unpkg.com/@stefftek/tick.js@latest/TickSystem.js" type="text/javascript"></script>
```

# Usage
### Import
with Common JS
```js
/* Import Tick.js */
const TickSystem = require("@stefftek/tick.js");
```
**or** - TypeScript Import
```js
/* Import Tick.js */
import TickSystem from "@stefftek/tick.js";
```
### Using the Class
```js
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

### Executing functions after x amount of ticks (added in 1.1.0):
```js
/* Wait 100 ticks till execution */
tickSystem.executeAfter(100, () => {
  console.log("I ran after 100 ticks!");
});

/* Wait 3 seconds till execution */
tickSystem.executeAfterSeconds(3, () => {
  console.log("I ran after 3 seconds!");
});
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

tickSystem.performanceMonitor : PerformanceMonitor // Performance Monitor if enabled
```

### Initial Testing seemed stable and perform well! ❤
<br>

# Performance Monitoring
### ⚠️Warning: May impact performance⚠️ Yes... Seriously

To measure the performance of the tick system, you can enable performance monitoring.
```js
tickSystem.monitor(true);
```
To Disable, use `.monitor(false);`

Performance Reports can be collected either manual or for
- the last frame
- the last second
- and for the last 5 seconds

combined.

To collect performance reports, either use
```js
tickSystem.performanceMonitor.report()
```
for a group report, or
```js
tickSystem.performanceMonitor.singleReport(10) // Tick count
```
for a report of the size you prefer.

### Please note: you can only collect `Tick Rate * 5` on a single report.
