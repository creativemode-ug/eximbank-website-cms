export type MediaType = "image" | "video" | "audio" | "text" | "application"

export enum ImageAcceptEnum {
    jpeg = "image/jpeg", 
    png = "image/png", 
    jpg = "image/jpg", 
    svg = "image/svg",
    webp = "image/webp"
}

export enum DocAcceptEnum {
    doc = "application/msword",
    docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ppt = "application/vnd.ms-powerpoint",
    pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    pdf = "application/pdf"
}

export enum SheetAcceptEnum {
    csv = "text/csv",
    xls = "application/vnd.ms-excel",
    xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

export enum VideoAcceptEnum {
    mp4 = "video/mp4",
    mpeg = "video/mpeg",
    ogg = "video/ogg"
}

