import Pattern from "@/assets/exim-pattern.svg";


interface IProps {
    title: string
    subTitle?: string
}

export default function Banner(props: IProps) {

    return (
        <div 
            className="relative w-full py-6 px-4 md:px-6 xl:px-10 bg-primary bg-no-repeat bg-cover rounded-md mb-16"
            style={{ backgroundImage: `url(${Pattern})`}}
        >

            <p className="text-white text-base xl:text-xl font-semibold mb-2">
                {props.title}
            </p>

            {
                props.subTitle && (
                <p className="text-blue-100 text-xs xl:text-sm font-light">
                    {props.subTitle}
                </p>
            )}
        </div>
    )
}