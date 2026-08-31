
export type ErrorMessageProps = {
    error?: string
    hasError?: boolean
}

const ErrorMessage = ({ error, hasError }: ErrorMessageProps) => {

    return (
        <div>
            {
                (error || hasError) &&
                <div className="text-xs text-rose-800 font-medium px-1 pt-1">
                    { error ? error : "field is required" }
                </div>
            }
        </div>
    )
}

export default ErrorMessage