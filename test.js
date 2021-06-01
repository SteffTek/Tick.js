const TickSystem = require("./TickSystem.js");
const tickSystem = new TickSystem(64);

// ENABLE MONITORING
tickSystem.monitor(true);

tickSystem.onTick(() => {

});

let test = setInterval(() => {
    console.log(tickSystem.performanceMonitor.report());
}, 1000);

setTimeout(() => {
    clearInterval(test);
    tickSystem.stop();
}, 10 * 1000);

