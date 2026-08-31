import { Outlet, useNavigate } from "react-router-dom";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { useGetDocuments } from "@/features/forms-and-guide/repositories";
import type { DocumentOptions } from "@/features/forms-and-guide/types";
import { IconPlus } from "@tabler/icons-react";
import { useEmptyState } from "@/components/empty-state";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";

import Button from "@/components/Buttons/Button";
import Pagination from "@/components/pagination";
import DocumentCard from "@/features/forms-and-guide/fragments/document-card";
import DocumentLoader from "@/features/forms-and-guide/fragments/document-loader";
import AccessGuard from "@/guards/access_guard";
import PageHeader from "@/components/page-header";
import AsyncData from "@/components/async-data";
import FileNotFound from "@/assets/file-not-found.png";




export default function FormsAndGuide() {
    const navigate = useNavigate();

    const { paramState } = useSearchParamState<DocumentOptions>({ page: 1 });
    const { documents, isLoading} = useGetDocuments({ 
        page: paramState.page ?? 1, 
        per_page: 20,
    });

    const createPermissions = getPermission(ContentType.Document, [Action.CREATE, Action.ALL])

    const handleCreate = () => navigate("create");

    const EmptyState = useEmptyState({
        image: FileNotFound,
        title: "Documents not found",
        description: `Currently, there are no documents available. To add forms 
        or guide documents, click the add document button`,
        className: "h-[70vh]"
    })


    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader title="Forms, Guide & Documents">
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        Add document
                    </Button>
                </AccessGuard>
            </PageHeader>

            <AsyncData 
                loading={isLoading} 
                loader={<DocumentLoader />} 
                fallback={EmptyState}             
                data={documents?.data}               
            >
                {(value) => (
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-8">
                        {
                            value.map((doc) => (
                                <DocumentCard 
                                    document={doc}
                                    key={doc.id}
                                />
                            ))
                        }
                    </div>
                )}
            </AsyncData>

            <Pagination
                pageSize={10}
                totalCount={documents?.meta.total ?? 0}
            />
        </div>
    )
}