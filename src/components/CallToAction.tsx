import Button from "@/components/Buttons/Button"
import { IconArrowRight } from "@tabler/icons-react"



interface IProps {
    title: string
    subTitle?: string
    description?: string
    primaryLabel?: string | null
    secondaryLabel?: string
    image: string
}

export default function CallToAction(props: IProps) {

    return (
        <div className="relative bg-primary text-white overflow-hidden">
            <div className="container flex flex-wrap md:flex-nowrap justify-between">
                
                <section className="relative z-10 w-full md:w-3/5 xl:w-5/12 py-12 lg:py-20 md:pl-4">
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-xl md:text-2xl 2xl:text-3xl w-full md:w-4/5 font-semibold">
                            {props.title}
                        </h2>

                        <p className="xl:text-base 2xl:text-lg font-medium">
                            {props.subTitle}
                        </p>

                        <p className="text-sm font-light">
                            {props.description}
                        </p>

                        <div className="flex flex-wrap sm:flex-nowrap gap-4">
                            {
                                props.primaryLabel && (
                                    <Button 
                                        className={`flex justify-center items-center 
                                        py-2.5 w-full sm:w-auto font-semibold capitalize border-0 
                                        bg-secondary text-primary hover:bg-secondary-300`}
                                        intent="primary"
                                        rightIcon={<IconArrowRight className="w-4 h-4" />}
                                    >
                                        {props.primaryLabel}
                                    </Button>
                                )
                            }

                            {
                                props.secondaryLabel && (
                                    <Button 
                                        className="w-full sm:w-auto bg-transparent border-secondary text-secondary"
                                        intent="primary"
                                    >
                                        <span></span>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </section>
                

                <section className="order-first md:order-last w-full md:w-auto md:flex-1">
                    <div className="relative md:absolute inset-x-0 md:right-0 md:inset-y-0 flex justify-end">
                    
                        <div className="bg-transparent md:bg-tertiary md:pl-2 w-full md:w-1/2 h-full overflow-hidden md:clip-polygon-cta">
                            <img
                                src={props.image}
                                width={800}
                                height={800}
                                alt={"image"}
                                className="w-full h-full object-cover md:clip-polygon-cta"
                            />
                        </div>
                    
                    </div>
                </section>
            </div>
        </div>
    )
}