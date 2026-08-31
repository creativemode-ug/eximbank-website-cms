
export const RoundedClipBorders = () => {

    return (
        <svg className="hidden absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="roundedClipBorder">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />    
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="roundedClipBorder" />
                    <feComposite in="SourceGraphic" in2="roundedClipBorder" operator="atop"/>
                </filter>
            </defs>
        </svg>
    )
}