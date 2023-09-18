// src/index.ts
import { rxToTx } from "@thinairthings/txrx";
import { useEffect, useReducer, useRef, useState } from "react";
import { fromEvent } from "rxjs";

// src/components/ContextWrapper.tsx
import { Fragment, jsx } from "react/jsx-runtime";
var ContextWrapper = ({
  ContextArray,
  children
}) => {
  const ContextComposition = ({ children: children2 }) => {
    return /* @__PURE__ */ jsx(Fragment, { children: ContextArray.reduce((acc, { props, Context }, index) => {
      return /* @__PURE__ */ jsx(Context.Provider, { value: props, children: index === 0 ? children2 : acc });
    }, /* @__PURE__ */ jsx(Fragment, {})) });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ContextComposition, { children }) });
};

// src/index.ts
var useRerender = () => {
  const [, update] = useReducer(
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
  const elementRef = useRef(null);
  useEffect(() => rerender(), []);
  return elementRef;
};
var useLiveRef = (state) => {
  const ref = useRef(state);
  ref.current = state;
  return ref;
};
var useStateRef = (val) => {
  const [refState, setRefState] = useState(val);
  const ref = useRef(val);
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
  useEffect(() => {
    const subscription = fromEvent(env === "main" ? window : self, `${nodeId}:${rxToTx(action)}`).subscribe((messageEvent) => {
      callback(messageEvent.detail);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
export {
  ContextWrapper,
  txNodeSignal,
  useLiveRef,
  useRenderedRef,
  useRerender,
  useRxNodeSignal,
  useStateRef
};
