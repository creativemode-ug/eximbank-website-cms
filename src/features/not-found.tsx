import { Link } from "react-router-dom";

import Button from "@/components/Buttons/Button";


export default function NotFound(){


    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base xl:text-xl font-semibold text-slate-400">404</p>

                <h2 className="mt-4 text-3xl sm:text-5xl text-primary font-bold tracking-tight">
                    Page not found
                </h2>

                <p className="mt-6 text-base leading-7 text-slate-400">
                    Sorry, we couldn`t find the page you`re looking for.
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/">
                        <Button 
                            type="button" 
                            intent="primary" 
                            size="md"
                        >
                            Go back home
                        </Button>
                    </Link>

                    <Button 
                        type="button"
                        intent="secondary" 
                        size="md"
                    >
                        Contact support
                    </Button>
                </div>
            </div>
        </main>
    )
}