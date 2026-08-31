import { twMerge } from "tailwind-merge"
import { SpinnersBlockWave } from "@/components/Svg/Spinner"

import Hide from "@/components/hide"

type LoadingIndicatorProps = {
    loading: boolean
    isEmpty?: boolean
    className?: string
}

const LoadingIndicator = ({ loading, className }: LoadingIndicatorProps) => {
    return (
        <Hide condition={!loading}>
            <div
                className={twMerge(
                    "flex justify-center items-center h-80",
                    className
                )}
            >
                <SpinnersBlockWave className="w-16 h-16 text-primary" />
            </div>
        </Hide>
    )
}

export default LoadingIndicator
