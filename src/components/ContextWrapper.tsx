import { FC, ReactNode } from "react"

export const ContextWrapper: FC<{
    ContextArray: Array<FC<{children: ReactNode}>>
    children: ReactNode
}> = ({
    ContextArray,
    children,
}) => {
    return <>
        {ContextArray.reduceRight((acc, ProviderComponent) => {
            return <ProviderComponent>{acc}</ProviderComponent>
        }, <>{children}</>)}
    </>
}