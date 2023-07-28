import { useReducer, useRef } from "react";

export const useRerender = (): () => void => {
    const [, update] = useReducer(
        // This implementation works by incrementing a hidden counter value that is
        // never consumed. Simply incrementing the counter changes the component's
        // state and, thus, trigger a re-render.
        (x: number): number => x + 1,
        0
    );
    return update;
}


export const useLiveRef = <T>(state: T) => {
    const ref = useRef(state);
    ref.current = state;
    return ref;
}