"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLiveRef = exports.useRerender = void 0;
const react_1 = require("react");
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
