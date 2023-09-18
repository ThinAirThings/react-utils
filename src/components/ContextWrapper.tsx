import { Context, FC, ReactNode } from "react"


export const ContextWrapper: FC<{
    ContextArray: Array<{
        props: Record<string, any>,
        Context: Context<any>,
    }>
    children: ReactNode
}> = ({
    ContextArray,
    children,
}) => {
    const ContextComposition = ({children}: {children: ReactNode}) => {
        return <>
            {ContextArray.reduce((acc, { props, Context }, index) => {
                return <Context.Provider value={props}>
                    {index === 0 ? children : acc}
                </Context.Provider>
            }, <></>)}
        </>
    } 
    return <>
        <ContextComposition>
            {children}
        </ContextComposition>
    </>
}