import * as react from 'react';
import { FC, Context, ReactNode } from 'react';

declare const ContextWrapper: FC<{
    ContextArray: Array<{
        props: Record<string, any>;
        Context: Context<any>;
    }>;
    children: ReactNode;
}>;

declare const useRerender: () => () => void;
declare const useRenderedRef: <T>() => react.RefObject<T>;
declare const useLiveRef: <T>(state: T) => react.MutableRefObject<T>;
declare const useStateRef: <T>(val: T) => readonly [react.MutableRefObject<T>, (newVal: T) => void, T];
declare const txNodeSignal: (env: 'main' | 'worker', targetNodeId: string, action: string, payload?: any) => void;
declare const useRxNodeSignal: <T>(env: 'main' | 'worker', nodeId: string, action: string, callback: (payload: T) => void) => void;

export { ContextWrapper, txNodeSignal, useLiveRef, useRenderedRef, useRerender, useRxNodeSignal, useStateRef };