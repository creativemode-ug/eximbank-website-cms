import http from "@/http";
import type { ListResponse, APIResponse, PublishInput } from "@/types";
import type { Document, DocumentOptions } from "@/features/forms-and-guide/types";



export async function getDocuments(options?: DocumentOptions) {
    const response = await http.get<ListResponse<Document>>("/documents", {
        params: options
    })

    return response.data
}

export async function createDocument(input: FormData) {
    const response = await http.post<APIResponse<Document>>(
        "/documents", input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function editDocument(input: { documentId: string, data: FormData }) {
    const response = await http.post<APIResponse<Document>>(
        `/documents/${input.documentId}`, input.data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export async function publishDocument(input: PublishInput) {
    const response = await http.put<APIResponse<Document>>(`/documents/${input.id}`, input)

    return response.data
}

export async function deleteDocument(documentId: string) {
    const response = await http.delete<any>(`/documents/${documentId}`)
    return response.data
}