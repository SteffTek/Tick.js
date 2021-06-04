const TickSystem = require("./TickSystem.js");
const tickSystem = new TickSystem(64);

// ENABLE MONITORING
tickSystem.monitor(true);

tickSystem.onTick(() => {

});

let test = setInterval(() => {
    console.log(tickSystem.performanceMonitor.report());
}, 1000);

tickSystem.executeAfter(100, () => {
    console.log("I ran after 100 ticks!");
});

tickSystem.executeAfterSeconds(3, () => {
    console.log("I ran after 3 seconds!");
});

tickSystem.executeAfter(10 * tickSystem.tickRate, () => {
    clearInterval(test);
    tickSystem.stop();
});

