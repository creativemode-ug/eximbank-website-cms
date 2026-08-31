import Tablev2 from "@/components/Table/table-v2"
import TableHead from "@/components/Table/table-head"
import TableHeader from "@/components/Table/table-header"
import TableBody from "@/components/Table/table-body"
import TableCell from "@/components/Table/table-cell"
import TableRow from "@/components/Table/table-row"
import TableContainer from "@/components/Table/table-container"
import TableLoading from "@/components/Table/table-loading"

const Table = Object.assign(Tablev2, {
    Cell: TableCell,
    Head: TableHead,
    Row: TableRow,
    Header: TableHeader,
    Body: TableBody,
    Loading: TableLoading,
    Container: TableContainer,
})

export default Table
