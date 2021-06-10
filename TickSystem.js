"use strict";
/**
 *
 * Tick System for executing Tasks at a specific tick rate.
 *
 * @author SteffTek
 * @class
 * @public
 *
 */
class TickSystem {
    /**
     *
     * Creates a new Tick System.
     * @since 1.0.0
     * @constructor
     *
     * @param {number} tickRate how many times per second a tick is executed
     * @var {array}  callbacks all functions that should be executed on tick
     * @var {number} tickRate how many ticks in a second
     * @var {number} currentTick current tick of the second
     * @var {number} tickLatency time in ms since last tick
     * @var {number} tickDelta time in seconds since last tick
     * @var {number} lastTick time stamp of last tick
     * @var {number} tickTime length of tick in ms
     * @var {PerformanceMonitor} performanceMonitor monitors performance of ticks
     *
     */
    constructor(tickRate = 64){
        // STORE THE FUNCTIONS TO EXECUTE
        this.callbacks = [];

        // STORE TICK VARS
        this.tickRate = tickRate;
        this.currentTick = 0;
        this.tickLatency = 0;
        this.tickDelta = 0;

        this.lastTick = Date.now();
        this.tickTime = 1000 / this.tickRate;

        // OTHERS
        this.interval = null;
        this.performanceMonitor = null;

        // EXECUTE TICK FOR x TIMES A SECOND
        this.start();
    }

    /**
     *
     * Register a function to be executed on tick.
     *
     * @param {function} callback register function to tick system
     *
     */
    onTick(callback){
        // ADD CALLBACK FROM TICK
        this.callbacks.push(callback);
    }

    /**
     *
     * Unregister a function that is beeing executed.
     *
     * @param {function} callback unregister function to tick system
     *
     */
    offTick(callback){
        // REMOVE CALLBACK FROM TICK
        const index = this.callbacks.indexOf(callback);
        if (index > -1){
            this.callbacks.splice(index, 1);
        }
    }

    /**
     *
     * Executes callback after x seconds
     * @since 1.1.0
     *
     * @param {number} seconds amount of seconds to wait
     * @param {function} callback callback to execute
     *
     */
    executeAfterSeconds(seconds, callback){
        // CALCULATE TICKS
        const ticks = seconds * this.tickRate;

        // SEND TO EXECUTION
        this.executeAfter(ticks, callback);
    }

    /**
     *
     * Executes callback after x ticks
     * @since 1.1.0
     *
     * @param {number} ticks amount of ticks to wait
     * @param {function} callback callback to execute
     *
     */
    executeAfter(ticks, callback){
        // SAVE CLASS
        const tickSystem = this;

        // WAIT FUNCTION
        let count = 0;
        const wait = function(){
            // EXECUTE CALLBACK
            if(count >= ticks){
                // REMOVE TICK
                tickSystem.offTick(wait);

                // EXECUTE CALLBACK
                callback();

                return;
            }

            // INCREASE COUNT
            count++;
        };

        // START TICKING
        this.onTick(wait);
    }

    /**
     *
     * Executes a tick.
     *
     */
    tick(){
        // EXECUTE ALL CALLBACKS
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback();
        });

        // SET CURRENT TICK
        this.currentTick++;
        if (this.currentTick + 1 > this.tickRate){
            this.currentTick = 0;
        }

        // CALC TICK LATENCY
        let timeStamp = Date.now();
        this.tickLatency = timeStamp - this.lastTick; // TICK LATENCY IN MS
        this.tickDelta = this.tickLatency / 1000; // TICK LATENCY IN SECONDS
        this.lastTick = timeStamp; // SET THIS TICKS TIMESTAMP

        // SEND TO MONITOR
        if (this.performanceMonitor) this.performanceMonitor.capture();
    }

    /**
     *
     * Stop tick execution
     *
     */
    start(){
        // CHECK FOR NON INTERVAL
        if (this.interval){
            return;
        }

        // START TICK
        this.interval = setInterval(() => {
            // EXECUTE TICK
            this.tick();
        }, this.tickTime);
    }

    /**
     *
     * Stop tick execution
     *
     */
    stop(){
        // CHECK IF INTERVAL EXISTS
        if (!this.interval){
            return;
        }

        // REMOVE TICK COUNTER
        clearInterval(this.interval);

        // RESET INTERVAL
        this.interval = null;
    }

    /**
     *
     * Monitors the performance
     *
     * @param {boolean} doMonitor monitor the performance per tick
     *
     */
    monitor(doMonitor = false){
        // DISABLE MONITORING
        if (!doMonitor){
            this.performanceMonitor = null;
            return;
        }

        // ENABLE MONITORING
        // eslint-disable-next-line no-use-before-define
        this.performanceMonitor = new PerformanceMonitor(this);
    }
}

/**
 *
 * Performance Monitor for Tick System
 * @class PerformanceMonitor
 *
 */
class PerformanceMonitor {
    /**
     *
     * Creates a new performance monitor
     * @since 1.0.0
     *
     * @param {TickSystem} tickSystem monitored object
     *
     */
    constructor(tickSystem){
        this.tickStore = [];
        this.tickSystem = tickSystem;
    }
    /**
     *
     * Monitors the Performance
     *
     */
    capture(){
        // ADD TIMESTAMP OF LAST TICK TO STORE STORE
        this.tickStore.unshift(this.tickSystem.lastTick);

        // REMOVE TOO OLD TICKS
        if (this.tickStore.length > this.tickSystem.tickRate * 5){
            this.tickStore.pop();
        }
    }

    /**
     *
     * Monitors the Performance
     *
     * @return {object} performance report of last Tick, past second and past 5 seconds in percent
     *
     */
    report(){
        // CREATE OBJECT
        let report = {
            tick: this.singleReport(2),
            second: this.singleReport(this.tickSystem.tickRate),
            interval: this.singleReport(this.tickSystem.tickRate * 5)
        };

        // RETURN REPORT
        return report;
    }

    /**
     *
     * Monitors the Performance
     *
     * @param {number} length amount of ticks to analyze
     *
     * @return {number} performance of last x frames in percent
     *
     */
    singleReport(length){
        // FALLBACK SIZE
        let size = length;
        if (size > this.tickStore.length){
            size = this.tickStore.length;
        }

        // FALLBACK MIN SIZE
        if (this.tickStore.length <= 2){
            return null;
        }

        let percentages = [];

        // CYCLE
        for (let i = 0; i < size - 1; i++){
            // GET TIMINGS
            let tStart = this.tickStore[i];
            let tEnd = this.tickStore[i + 1];

            // CALCULATE PERCENT TO LAST TICK
            let time = tStart - tEnd;
            let percent = time / this.tickSystem.tickTime;

            // PUSH PERCENT
            percentages.push(percent);
        }

        let total = 0;
        // GET AVERAGE
        for (let i = 0; i < percentages.length; i++){
            total += percentages[i];
        }
        let avg = total / percentages.length;

        // CONVERT TO READABLE PERCENT
        avg *= 100;
        avg = Math.floor(100 - (avg - 100));

        return avg;
    }
}

/**
 *
 * Export to NodeJS if inside of NodeJS
 *
 */
if (typeof module !== "undefined" && module.exports){
    module.exports = TickSystem;
}
