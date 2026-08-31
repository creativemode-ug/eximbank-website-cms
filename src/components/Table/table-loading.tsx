import { Fragment } from "react"

import TableCell from "@/components/Table/table-cell"
import TableRow from "@/components/Table/table-row"
import SkeletonLoader from "@/components/loaders/skeleton-loader"

export type TableLoadingProps = {
    cellCount: number
    rowCount?: number
}

function TableLoading({ cellCount, rowCount = 8 }: TableLoadingProps) {
    return (
        <Fragment>
            {[...Array(rowCount)].map(row => (
                <TableRow key={row}>
                    {[...Array(cellCount)].map(cell => (
                        <TableCell key={cell}>
                            <SkeletonLoader className="w-full h-6" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </Fragment>
    )
}

export default TableLoading
