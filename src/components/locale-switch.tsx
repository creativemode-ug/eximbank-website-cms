import { Languages, LanguagesList } from "@/i18n.config";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { QueryOptions } from "@/types";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";


const LocaleSwitch = () => {
    const defaultLocale: Languages = import.meta.env.VITE_DEFAULT_LOCALE ?? "en";
    const { paramState, setQueryParam } = useSearchParamState<QueryOptions>();

    useEffect(() => {
        if(!paramState.locale) {
            setQueryParam("locale", defaultLocale)
        }
    }, [paramState,])

    return (
        <div className="flex p-0.5 space-x-0.5 bg-zinc-100 rounded overflow-hidden">
            {
                LanguagesList.map((locale) => (
                    <button 
                        key={locale} 
                        className={twMerge(
                            "text-xs font-semibold uppercase py-1 px-3 rounded-sm shadow border",
                            paramState.locale == locale ? 
                            "text-white bg-primary-accent border-primary-accent" : 
                            "text-zinc-600 bg-white border-zinc-200"
                        )}
                        onClick={() => setQueryParam("locale", locale)}

                    >
                        {locale}
                    </button>
                ))
            }
        </div>
    )
}

export default LocaleSwitch