/// <reference types="react" />
export declare const useRerender: () => () => void;
export declare const useLiveRef: <T>(state: T) => import("react").MutableRefObject<T>;
export declare const sendNodeSignal: (env: 'main' | 'worker', targetNodeId: string, action: string, payload?: any) => void;
export declare const useNodeSignal: <T>(env: 'main' | 'worker', nodeId: string, action: string, callback: (payload: T) => void) => void;
