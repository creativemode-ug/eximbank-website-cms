import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { QueryOptions } from "@/types"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"
import { useSearchParamState } from "@/hooks/useSearchParamState"

import Button from "@/components/Buttons/Button"
import Hide from "@/components/hide"

export type PaginationProps = {
    className?: string
    totalCount: number
    pageSize: number
    displaySize?: number
}

const Pagination = (props: PaginationProps) => {
    const { paramState, setQueryParam } = useSearchParamState<QueryOptions>()

    const currentPage = Number(paramState.page) || 1
    const displaySize = props.displaySize ?? 6

    const [pageNumber] = useState<number>(currentPage)
    const [pageRange, setPageRange] = useState<number[]>([])

    const pageGenerator = (): number[] => {
        const remainder = props.totalCount % props.pageSize > 0 ? 1 : 0

        const range =
            parseInt((props.totalCount / props.pageSize).toString()) + remainder

        return [...Array(range)].map((_, i) => i + 1)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setQueryParam("page", currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage <= props.totalCount) {
            setQueryParam("page", currentPage + 1)
        }
    }

    const onPageChange = (page: number) => {
        setQueryParam("page", page)
    }

    const getWindow = () => {
        const index = pageRange.indexOf(currentPage)
        const halfWindow = Math.floor(displaySize / 2)

        // Calculate the start and end indices of the window
        let start = Math.max(0, index - halfWindow)
        const end = Math.min(pageRange.length, start + displaySize)

        // Adjust the start if the end index exceeds the array length
        if (end - start < displaySize) {
            start = Math.max(0, end - displaySize)
        }

        return pageRange.slice(start, end)
    }

    useEffect(() => {
        setPageRange(pageGenerator())
    }, [pageNumber, props.totalCount, currentPage])

    return (
        <Hide condition={props.totalCount < 1}>
            <div
                className={twMerge(
                    "flex items-center justify-center",
                    props.className
                )}
            >
                <div className={"flex items-center space-x-2"}>
                    <Button
                        intent="primary"
                        disabled={currentPage <= 1}
                        onClick={handlePreviousPage}
                        leftIcon={
                            <IconChevronLeft
                                className="size-4"
                                strokeWidth={2}
                            />
                        }
                        className={twMerge(
                            "border bg-transparent !text-xs text-zinc-600 hover:bg-transparent",
                            currentPage <= 1
                                ? "cursor-not-allowed text-zinc-400 active:ring-0"
                                : "text-primary-800"
                        )}
                    >
                        Prev
                    </Button>

                    <div className="flex items-center space-x-1">
                        {getWindow().map(el => (
                            <Button
                                type="button"
                                intent="secondary"
                                className={twMerge(
                                    "rounded-md border border-zinc-200 !text-xs hover:bg-transparent",
                                    currentPage == el
                                        ? "bg-primary hover:bg-primary text-white"
                                        : "bg-transparent text-zinc-600"
                                )}
                                onClick={() => onPageChange(el)}
                                key={el}
                            >
                                {el}
                            </Button>
                        ))}
                    </div>

                    <Button
                        intent="primary"
                        disabled={currentPage === pageRange.length}
                        onClick={handleNextPage}
                        rightIcon={
                            <IconChevronRight
                                className="size-4"
                                strokeWidth={2}
                            />
                        }
                        className={twMerge(
                            "border bg-transparent !text-xs text-zinc-600 hover:bg-transparent",
                            currentPage === pageRange.length &&
                                "cursor-not-allowed text-zinc-400"
                        )}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Hide>
    )
}

export default Pagination
