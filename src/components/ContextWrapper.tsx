import { FC, ReactNode } from "react"

export const ContextWrapper: FC<{
    ContextArray: Array<FC<{children: ReactNode}>>
    children: ReactNode
}> = ({
    ContextArray,
    children,
}) => {
    return <>
        {ContextArray.reduce((acc, ProviderComponent) => {
            return <ProviderComponent>{acc}</ProviderComponent>

        }, <>{children}</>)}
    </>
}