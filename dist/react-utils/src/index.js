"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNodeSignal = exports.sendNodeSignal = exports.useLiveRef = exports.useRerender = void 0;
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const txRx_1 = require("../../shared/txRx");
const useRerender = () => {
    const [, update] = (0, react_1.useReducer)(
    // This implementation works by incrementing a hidden counter value that is
    // never consumed. Simply incrementing the counter changes the component's
    // state and, thus, trigger a re-render.
    (x) => x + 1, 0);
    return update;
};
exports.useRerender = useRerender;
const useLiveRef = (state) => {
    const ref = (0, react_1.useRef)(state);
    ref.current = state;
    return ref;
};
exports.useLiveRef = useLiveRef;
const sendNodeSignal = (env, targetNodeId, action, payload) => {
    (env === "main" ? window : self).dispatchEvent(new CustomEvent(`${targetNodeId}:${action}`, {
        detail: payload,
    }));
};
exports.sendNodeSignal = sendNodeSignal;
const useNodeSignal = (env, nodeId, action, callback) => {
    (0, react_1.useEffect)(() => {
        const subscription = (0, rxjs_1.fromEvent)((env === "main" ? window : self), `${nodeId}:${(0, txRx_1.rxToTx)(action)}`)
            .subscribe((messageEvent) => {
            callback(messageEvent.detail);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
};
exports.useNodeSignal = useNodeSignal;
