/// <reference types="react" />
export declare const useRerender: () => () => void;
export declare const useLiveRef: <T>(state: T) => import("react").MutableRefObject<T>;
export declare const useSequenceRef: <T>(val: T) => readonly [import("react").MutableRefObject<T>, (newVal: T) => void, T];
export declare const txNodeSignal: (env: 'main' | 'worker', targetNodeId: string, action: string, payload?: any) => void;
export declare const useRxNodeSignal: <T>(env: 'main' | 'worker', nodeId: string, action: string, callback: (payload: T) => void) => void;
