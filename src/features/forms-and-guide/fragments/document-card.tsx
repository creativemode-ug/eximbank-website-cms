import type { Document } from "@/features/forms-and-guide/types";
import { Link } from "react-router-dom";



export type DocumentCardProps = {
    document: Document
}
 
function DocumentCard({ document }: DocumentCardProps) {

    return (
        <Link 
            to={`/forms-and-guide/${document.id}`} 
            state={document} 
            className="space-y-4"
        >
            <div 
                className="relative h-[20rem] border border-zinc-200 bg-zinc-100 bg-left bg-cover bg-no-repeat overflow-hidden rounded-md group"
                style={{ backgroundImage: `url(${document.cover_image})` }}
            >
                {/* <div className="group-hover:absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 w-full duration-500 bg-primary-accent/40 backdrop-blur-sm"></div> */}
            </div>

            <h4 className="text-xs xl:text-sm text-primary font-medium line-clamp-2">
                {document.title}
            </h4>
        </Link>
    )
}

export default DocumentCard