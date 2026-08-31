import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { IconFile, IconPlus, IconTrash } from "@tabler/icons-react"
import {
    useBulkDeleteLocation,
    useGetLocations,
} from "@/features/locations/repositories/locations"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { Location, LocationOptions } from "@/features/locations/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useEmptyState } from "@/components/empty-state"

import Table from "@/components/Table/Table"
import Pagination from "@/components/pagination"
import LocationActions from "@/features/locations/fragments/location-actions"
import LocationColumns from "@/features/locations/fragments/location-columns"
import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"
import AccessGuard from "@/guards/access_guard"
import PageHeader from "@/components/page-header"
import SearchBox from "@/components/search-box"
import Hide from "@/components/hide"

function Locations() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<LocationOptions>({ page: 1 })
    const { showConfirm, close } = useDialog()

    const [selected, setSelected] = useState<Location[]>([])

    const { locations, isLoading } = useGetLocations({
        page: paramState.page ?? 1,
        per_page: 10,
        keyword: paramState.keyword,
    })

    const emptyState = useEmptyState({
        title: "No Location Data Yet",
        description: `To populate this section please, upload location data
        via upload button or create new entry via New Location button`,
    })

    const bulkDelete = useBulkDeleteLocation(() => {
        close()
        setSelected([])
    })

    const createPermissions = getPermission(ContentType.Metric, [
        Action.CREATE,
        Action.ALL,
    ])

    console.log(paramState)

    const handleBulkDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting all these items`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={bulkDelete.isPending}
                        onClick={() =>
                            bulkDelete.mutate({
                                ids: selected.map(el => el.id),
                            })
                        }
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader title="Manage Locations">
                <div className="flex items-center gap-2">
                    <AccessGuard permissions={createPermissions}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                            onClick={() => navigate("create")}
                        >
                            New Location
                        </Button>
                    </AccessGuard>

                    <AccessGuard permissions={createPermissions}>
                        <Button
                            type="button"
                            intent="tertiary"
                            leftIcon={<IconFile size={16} />}
                            onClick={() => navigate("bulk")}
                        >
                            Upload
                        </Button>
                    </AccessGuard>
                </div>
            </PageHeader>

            <div className="flex justify-between items-center">
                <SearchBox className="!w-80" />

                <Hide condition={selected.length == 0}>
                    <Button
                        type="button"
                        intent="danger"
                        size="sm"
                        leftIcon={<IconTrash className="size-4" />}
                        onClick={handleBulkDelete}
                    >
                        Delete All
                    </Button>
                </Hide>
            </div>

            <Table
                columns={LocationColumns}
                data={locations?.data ?? []}
                isLoading={isLoading}
                hasSelection={true}
                hasActions={true}
                emptyState={emptyState}
                onSelection={(values: Location[]) => setSelected(values)}
                actions={location => <LocationActions location={location} />}
            />

            <Pagination pageSize={10} totalCount={locations?.meta.total ?? 0} />
        </div>
    )
}

export default Locations
