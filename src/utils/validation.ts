export enum ImageAcceptEnum {
    jpeg = "image/jpeg",
    png = "image/png",
    jpg = "image/jpg",
    svg = "image/svg",
    webp = "image/webp",
}

export enum DocAcceptEnum {
    doc = "application/msword",
    docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ppt = "application/vnd.ms-powerpoint",
    pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    pdf = "application/pdf",
}

export enum SheetAcceptEnum {
    csv = "text/csv",
    xls = "application/vnd.ms-excel",
    xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

export enum VideoAcceptEnum {
    mp4 = "video/mp4",
    mpeg = "video/mpeg",
    ogg = "video/ogg",
}

export function validateFileSize(
    files?: FileList,
    allowedSize?: number
): boolean {
    let valid = true
    if (files) {
        Object.keys(files).map((_, index) => {
            const file = files[index]
            const size = file.size / 1024 / 1024 // size in mb
            if (allowedSize !== undefined) {
                if (size > allowedSize) valid = false
            } else {
                if (size > 2) valid = false
            }
        })
    }
    return valid
}

export function validateImageFile(
    files?: FileList,
    accepts: string[] = [
        ImageAcceptEnum.jpeg,
        ImageAcceptEnum.jpg,
        ImageAcceptEnum.png,
        ImageAcceptEnum.webp,
    ]
): boolean {
    let valid: boolean = true
    if (files) {
        Object.keys(files).map((_, index) => {
            const file = files[index]
            if (!accepts.includes(file.type)) {
                valid = false
            }
        })
    }
    return valid
}

export function validateDocFiles(
    files?: FileList,
    accepts: string[] = [DocAcceptEnum.pdf]
): boolean {
    let valid: boolean = true

    if (files) {
        Object.keys(files).map((_, index) => {
            const file = files[index]
            if (!accepts.includes(file.type)) {
                valid = false
            }
        })
    }
    return valid
}
