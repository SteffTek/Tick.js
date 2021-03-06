export = TickSystem;
/**
 *
 * Tick System for executing Tasks at a specific tick rate.
 *
 * @author SteffTek
 * @class
 * @public
 *
 */
declare class TickSystem {
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
    constructor(tickRate?: number);
    callbacks: any[];
    tickRate: number;
    currentTick: number;
    tickLatency: number;
    tickDelta: number;
    lastTick: number;
    tickTime: number;
    interval: number;
    performanceMonitor: PerformanceMonitor;
    /**
     *
     * Register a function to be executed on tick.
     *
     * @param {function} callback register function to tick system
     *
     */
    onTick(callback: Function): void;
    /**
     *
     * Unregister a function that is beeing executed.
     *
     * @param {function} callback unregister function to tick system
     *
     */
    offTick(callback: Function): void;
    /**
     *
     * Executes callback after x seconds
     * @since 1.1.0
     *
     * @param {number} seconds amount of seconds to wait
     * @param {function} callback callback to execute
     *
     */
    executeAfterSeconds(seconds: number, callback: Function): void;
    /**
     *
     * Executes callback after x ticks
     * @since 1.1.0
     *
     * @param {number} ticks amount of ticks to wait
     * @param {function} callback callback to execute
     *
     */
    executeAfter(ticks: number, callback: Function): void;
    /**
     *
     * Executes a tick.
     *
     */
    tick(): void;
    /**
     *
     * Stop tick execution
     *
     */
    start(): void;
    /**
     *
     * Stop tick execution
     *
     */
    stop(): void;
    /**
     *
     * Monitors the performance
     *
     * @param {boolean} doMonitor monitor the performance per tick
     *
     */
    monitor(doMonitor?: boolean): void;
}
/**
 *
 * Performance Monitor for Tick System
 * @class PerformanceMonitor
 *
 */
declare class PerformanceMonitor {
    /**
     *
     * Creates a new performance monitor
     * @since 1.0.0
     *
     * @param {TickSystem} tickSystem monitored object
     *
     */
    constructor(tickSystem: TickSystem);
    tickStore: any[];
    tickSystem: TickSystem;
    /**
     *
     * Monitors the Performance
     *
     */
    capture(): void;
    /**
     *
     * Monitors the Performance
     *
     * @return {object} performance report of last Tick, past second and past 5 seconds in percent
     *
     */
    report(): object;
    /**
     *
     * Monitors the Performance
     *
     * @param {number} length amount of ticks to analyze
     *
     * @return {number} performance of last x frames in percent
     *
     */
    singleReport(length: number): number;
}
