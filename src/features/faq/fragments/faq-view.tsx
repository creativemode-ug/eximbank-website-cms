import { Faq } from "@/features/faq/types"

type Props = {
    faq: Faq
}

function FaqDetails({ faq }: Props) {
    return (
        <div className="bg-neutral-100 border border-zinc-200 m-2 p-2 rounded-md">
            <h4 className="text-zinc-800 text-sm font-semibold mb-3">
                Q: {faq.question}
            </h4>
            <div
                dangerouslySetInnerHTML={{ __html: faq.answer }}
                className={`text-zinc-800 text-sm min-w-fit prose prose-p:text-sm 
                prose-h4:text-sm prose-h4:lg:text-sm prose-h4:mb-0 prose-h4:font-semibold
                prose-ul:gap-[1px] prose-ol:gap-[1px] prose-ul:list-decimal prose-ol:list-decimal
                prose-ul:list-inside prose-ol:list-inside prose-ul:grid prose-ol:grid
                prose-ul:lg:grid-cols-2 prose-li:!mb-0 prose-li:px-2 prose-li:py-1 prose-a:text-tertiary
                prose-table:table-auto prose-table:mt-4 prose-table:overflow-hidden 
                prose-thead:text-primary prose-thead:border-none prose-th:py-2 prose-th:px-4
                prose-th:font-author prose-th:font-medium prose-th:bg-secondary prose-th:text-primary 
                prose-td:font-medium prose-td:px-4 prose-td:border-b prose-td:border-primary-200 
                `}
            />
        </div>
    )
}

export default FaqDetails
