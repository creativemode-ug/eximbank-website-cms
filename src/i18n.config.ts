export const LanguagesList = ["en", "sw" , "fr"];

export type Languages = typeof LanguagesList[number]

export enum CountryISOCode {
    TZ = "TZ",
    UG = "UG",
    ET = "ET",
    DJ = "DJ", 
    KM = "KM"
}

export type Locale = {
    name: Languages,
    label: string,
    flag: string
}

export const i18n = {
    defaultLocale: "en",
    locales: [
        { name: "en", label: "English", flag: "/images/flags/uk.webp"  },
        // { name: "sw", label: "Swahili", flag: "/images/flags/tanzania.webp" },
        // { name: "fr", label: "France", flag: "/images/flags/france.webp"  },
    ] as Array<Locale>
} as const


export const hasLocaleInPath = (pathname: string) => {
    return i18n.locales.some((l) => pathname.startsWith(`/${l.name}/`) || pathname == `/${l.name}`)
} 