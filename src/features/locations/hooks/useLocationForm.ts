import { useForm } from "react-hook-form"
import { useEffect, useRef } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate } from "react-router-dom"
import {
    type Location,
    LocationTypes,
    type TypeLocationSchema,
    LocationSchema,
} from "@/features/locations/types"
import {
    useCreateLocation,
    useEditLocation,
} from "@/features/locations/repositories/locations"

import Regions from "@/data/regions"

function useLocationForm() {
    const navigate = useNavigate()
    const location = useLocation()

    const place = location.state as Location | null

    const { control, handleSubmit, setValue, watch } = useForm({
        resolver: yupResolver(LocationSchema),
    })

    const selectedRegion = watch("region")
    const previousRegionRef = useRef<string | undefined>(undefined)

    const createMutation = useCreateLocation(() => handleClose())
    const updateMutation = useEditLocation(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TypeLocationSchema) => {
        if (place) {
            updateMutation.mutate({
                locationId: place?.id,
                data: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const locationTypeOptions = LocationTypes.map(i => ({
        label: i.toUpperCase(),
        value: i.toLowerCase(),
    }))

    const regionOptions = () =>
        Regions().map(el => ({ label: el.name, value: el.name }))

    const districtOptions = (name?: string) => {
        const region = Regions().find(el => el.name == name)

        if (region)
            return region.districts.map(el => ({
                label: el.name,
                value: el.name,
            }))

        return []
    }

    const handleClose = () => navigate("/locations")

    useEffect(() => {
        if (place) {
            setValue("name", place.name)
            setValue("type", place.type)
            setValue("region", place.region)
            setValue("district", place.district)
            setValue("location", place.location)
            setValue("phone_number", place.phone_number)
            setValue("latitude", place.latitude)
            setValue("longitude", place.longitude)
            setValue("is_published", place.is_published == 1 ? true : false)
        }
    }, [place, setValue])

    useEffect(() => {
        if (selectedRegion && previousRegionRef.current !== undefined && previousRegionRef.current !== selectedRegion) {
            setValue("district", "")
        }
        previousRegionRef.current = selectedRegion
    }, [selectedRegion, setValue])

    return {
        control,
        submit,
        handleSubmit,
        handleClose,
        isPending,
        locationTypeOptions,
        regionOptions,
        districtOptions,
        selectedRegion,
        place,
    }
}

export default useLocationForm
