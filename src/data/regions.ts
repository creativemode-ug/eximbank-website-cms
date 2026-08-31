import { CountryISOCode } from "@/i18n.config";
import { regions as tz_regions } from "./tz_regions"; 
import { regions as ug_regions } from "./ug_regions"; 
import { regions as km_regions } from "./km_regions"; 
import { regions as dj_regions } from "./dj_regions"; 


export default function getRegions(country?: CountryISOCode) {
    const iso = import.meta.env.VITE_COUNTRY_CODE ?? country;
    
    if (iso === CountryISOCode.TZ) {
        return tz_regions;
    } 

    if (iso === CountryISOCode.UG) {
        return ug_regions;
    } 

    if (iso === CountryISOCode.KM) {
        return km_regions;
    } 

    if (iso === CountryISOCode.DJ) {
        return dj_regions;
    }

    return tz_regions;
}