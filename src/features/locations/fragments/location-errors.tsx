import { LocationResponse } from "@/features/locations/types"

type Props = {
    failures?: LocationResponse
}

const LocationErrors = ({ failures }: Props) => {
    if (!failures || !failures.failed_rows || failures.failed_rows.length === 0) {
        return null
    }

    return (
        <div className="space-y-2 py-2 px-3 bg-red-100 border border-red-200 rounded-md max-h-40">
            <p className="text-xs">
                All data has been created with exceptions of the following
            </p>
            <ul className="space-y-1 text-red-400">
                {failures.failed_rows.map((item, index) => (
                    <li className="space-y-0.5" key={index}>
                        <p className="text-red-500 text-xs">
                            Row with name {item.row.name} has
                        </p>
                        <ul className="list-inside list-disc">
                            <li>{item.error.map(el => el)}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LocationErrors
