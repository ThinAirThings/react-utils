import { useEffect, useReducer, useRef } from "react";
import { fromEvent } from "rxjs";
import { rxToTx } from "../../shared/txRx"
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

export const txNodeSignal = (
    env: 'main' | 'worker',
    targetNodeId: string,
    action: string,
    payload?: any,
) => {

    (env === "main"?window:self).dispatchEvent(new CustomEvent(`${targetNodeId}:${action}`, {
        detail: payload,
    }))
}
export const useRxNodeSignal = <T,>(
    env: 'main' | 'worker',
    nodeId: string, 
    action: string, 
    callback: (payload: T) => void,
) => {
    useEffect(() => {
        const subscription = fromEvent<CustomEvent>((env === "main"?window:self), `${nodeId}:${rxToTx(action)}`)
        .subscribe((messageEvent) => {
            callback(messageEvent.detail)
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
}