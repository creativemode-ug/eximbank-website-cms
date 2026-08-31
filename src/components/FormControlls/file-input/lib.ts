import { MediaType } from "./types";


// Return File Extension From Url
export function getTypeFromUrl(url?: string) {
    if(url == undefined) return null

    const urlSplit = url.split(".")
    return urlSplit[urlSplit.length]
}

// Return File Extension From File Object
export function getTypeFromFile(file?: File): MediaType | null {
    if(file == undefined) return null

    return file.type.split("/")[0] as MediaType;
}

