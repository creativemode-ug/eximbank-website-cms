import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { twMerge } from "tailwind-merge";

interface ClickEvent {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
}

interface IProps extends ReactPaginateProps {
    setCurrPage: (page: number) => void;
    currPage: number;
    activeClassName?: string;
    containerClassName?: string;
    pageLinkClassName?: string;
    pageClassName?: string;
}

export default function Pagination({ setCurrPage, currPage, ...props }: IProps) {
    const handlePageChange = (selectedPage: ClickEvent) => {
        setCurrPage(selectedPage.selected);
    };

    return (
        <ReactPaginate
            // @ts-ignore
            previousLabel={
                <IconChevronLeft className={"h-5 w-5"} />
            }
            activeClassName={twMerge(
                "bg-primary border-primary text-white text-[#fff]",
                props.activeClassName
            )}
            nextLabel={<IconChevronRight className={"h-5 w-5"} />}
            containerClassName={twMerge(
                "flex justify-center items-center space-x-3 text-xs",
                props.containerClassName
            )}
            pageClassName={twMerge(
                "px-3.5 py-1 rounded hover:opacity-90 border-[1.5px]",
                props.pageClassName
            )}
            disabledLinkClassName={"opacity-50 cursor-not-allowed"}
            pageLinkClassName={twMerge(
                "center",
                props.pageLinkClassName
            )}
            onPageChange={handlePageChange} // handler function
            initialPage={currPage} // current page number
            {...props}
        />
    );
};
