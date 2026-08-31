export interface IRegions {
    name: string
    districts: IDistricts[]
}

export interface IDistricts {
    name: string
    municipals: string[]
}