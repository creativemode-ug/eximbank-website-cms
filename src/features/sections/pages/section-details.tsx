import { useGetSectionDetail } from "@/features/sections/repositories"
import { useNavigate, useParams } from "react-router-dom";
import type { QueryOptions } from "@/types";
import { useSearchParamState } from "@/hooks/useSearchParamState";

import CallToAction from "@/components/CallToAction";
import Modal from "@/components/Modal";
import Jumbotron from "@/components/Jumbotron";
import Loader from "@/components/loading-indicator";




export default function SectionDetail() {
    const navigate =  useNavigate();

    const { paramState } = useSearchParamState<QueryOptions>();
    const { sectionId } = useParams();
    const { section, isLoading } = useGetSectionDetail({
        sectionId: sectionId,
        locale: paramState.locale
    });

    return (

        <Modal
            title={section?.data.type.toUpperCase()}
            isOpen={true}
            onClose={() => navigate("/sections")}
            size="2xl"
        >
            <>
                <Loader loading={isLoading} />
                {
                    section && (
                        <div>
                            <div className="overflow-hidden rounded-lg mb-8">
                                {
                                    section.data.type.toUpperCase() == "CTA" ? (
                                        <CallToAction 
                                            title={section.data.title}
                                            subTitle={section.data.sub_title}
                                            description={section.data.description}
                                            image={section.data.image}
                                            primaryLabel={section.data.action}
                                        />
                                    ) : (
                                        <Jumbotron 
                                            title={section.data.title}
                                            subTitle={section.data.sub_title}
                                            description={section.data.description}
                                            image={section.data.image}
                                            primaryLabel={section.data.action}
                                        />
                                    )
                                }
                                
                            </div>

                            <div className="flex justify-between items-center text-tertiary text-sm italic">
                                <p>Last updated, {new Date(section.data.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    )
                }
            </>
        </Modal>
    )
}