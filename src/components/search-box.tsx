import { useSearchParams } from "react-router-dom"
import { FilterEnum } from "@/types"
import { twMerge } from "tailwind-merge"

type SearchboxProps = {
    placeholder?: string
    className?: string
}

function Searchbox({ placeholder, className }: SearchboxProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const onChange = (data: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(FilterEnum.SEARCH, data)
        setSearchParams(params)
    }

    return (
        <div className={twMerge("min-w-56", className)}>
            <input
                type="search"
                className={twMerge("input input-default rounded-lg")}
                placeholder={placeholder ?? "Search"}
                onChange={event => onChange(event.target.value)}
            />
        </div>
    )
}

export default Searchbox
