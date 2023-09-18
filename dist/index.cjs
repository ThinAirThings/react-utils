"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ContextWrapper: () => ContextWrapper,
  txNodeSignal: () => txNodeSignal,
  useLiveRef: () => useLiveRef,
  useRenderedRef: () => useRenderedRef,
  useRerender: () => useRerender,
  useRxNodeSignal: () => useRxNodeSignal,
  useStateRef: () => useStateRef
});
module.exports = __toCommonJS(src_exports);
var import_txrx = require("@thinairthings/txrx");
var import_react = require("react");
var import_rxjs = require("rxjs");

// src/components/ContextWrapper.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ContextWrapper = ({
  ContextArray,
  children
}) => {
  const ContextComposition = ({ children: children2 }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: ContextArray.reduce((acc, { props, Context }, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, { value: props, children: index === 0 ? children2 : acc });
    }, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {})) });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextComposition, { children }) });
};

// src/index.ts
var useRerender = () => {
  const [, update] = (0, import_react.useReducer)(
    // This implementation works by incrementing a hidden counter value that is
    // never consumed. Simply incrementing the counter changes the component's
    // state and, thus, trigger a re-render.
    (x) => x + 1,
    0
  );
  return update;
};
var useRenderedRef = () => {
  const rerender = useRerender();
  const elementRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => rerender(), []);
  return elementRef;
};
var useLiveRef = (state) => {
  const ref = (0, import_react.useRef)(state);
  ref.current = state;
  return ref;
};
var useStateRef = (val) => {
  const [refState, setRefState] = (0, import_react.useState)(val);
  const ref = (0, import_react.useRef)(val);
  ref.current = refState;
  const setRef = (newVal) => {
    setRefState(newVal);
    ref.current = newVal;
  };
  return [ref, setRef, refState];
};
var txNodeSignal = (env, targetNodeId, action, payload) => {
  (env === "main" ? window : self).dispatchEvent(new CustomEvent(`${targetNodeId}:${action}`, {
    detail: payload
  }));
};
var useRxNodeSignal = (env, nodeId, action, callback) => {
  (0, import_react.useEffect)(() => {
    const subscription = (0, import_rxjs.fromEvent)(env === "main" ? window : self, `${nodeId}:${(0, import_txrx.rxToTx)(action)}`).subscribe((messageEvent) => {
      callback(messageEvent.detail);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContextWrapper,
  txNodeSignal,
  useLiveRef,
  useRenderedRef,
  useRerender,
  useRxNodeSignal,
  useStateRef
});
