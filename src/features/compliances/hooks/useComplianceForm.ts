import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
    ComplianceSchema,
    TComplianceSchema,
    ComplianceTypes,
} from "@/features/compliances/types"
import { useImportCompliance } from "@/features/compliances/repositories/compliances"
import { yupResolver } from "@hookform/resolvers/yup"

function useComplianceForm() {
    const navigate = useNavigate()

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(ComplianceSchema),
    })

    const { mutate, isPending } = useImportCompliance(() => handleClose())

    const handleClose = () => {
        reset()
        navigate(`/compliances`)
    }

    const complianceTypeOptions = ComplianceTypes.map(item => ({
        label: item.toLocaleUpperCase(),
        value: item,
    }))

    const submit = (data: TComplianceSchema) => {
        const formData = new FormData()
        formData.append("type", data.type)

        if (data.document) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("file", data.document[0])
        }
        mutate(formData)
    }

    return {
        control,
        complianceTypeOptions,
        handleSubmit,
        handleClose,
        submit,
        isPending,
    }
}

export default useComplianceForm
