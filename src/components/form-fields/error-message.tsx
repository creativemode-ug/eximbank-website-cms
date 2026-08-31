import Hide from "@/components/hide"

function ErrorMessage({ error }: { error?: string | null }) {
    return (
        <Hide condition={typeof error !== "string"}>
            <div className="text-xs text-red-700 font-medium">
                {error ? error : "field is required"}
            </div>
        </Hide>
    )
}

export default ErrorMessage
