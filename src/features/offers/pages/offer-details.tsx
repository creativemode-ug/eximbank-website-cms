import { useGetOfferDetail } from "@/features/offers/repositories/offers"
import { useNavigate, useParams } from "react-router-dom"
import type { QueryOptions } from "@/types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { OfferTypeEnum } from "@/features/offers/types"

import CallToAction from "@/components/CallToAction"
import Modal from "@/components/Modal"
import Jumbotron from "@/components/Jumbotron"
import Loader from "@/components/loading-indicator"
import Hide from "@/components/hide"

function OfferDetail() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<QueryOptions>()
    const { offerId } = useParams()
    const { offer, isLoading } = useGetOfferDetail({
        offerId: offerId,
        locale: paramState.locale,
    })

    return (
        <Modal
            title={offer?.data.card_type.name}
            isOpen={true}
            onClose={() => navigate("/offers-and-perks")}
            size="2xl"
        >
            <>
                <Loader loading={isLoading} />
                {offer && (
                    <div>
                        <div className="overflow-hidden rounded-lg mb-8">
                            {offer.data.offer_type == OfferTypeEnum.GLOBAL ? (
                                <CallToAction
                                    title={offer.data.title}
                                    subTitle={offer.data.caption}
                                    description={""}
                                    image={offer.data.banner_image}
                                    primaryLabel={""}
                                />
                            ) : (
                                <Jumbotron
                                    title={offer.data.title}
                                    subTitle={offer.data.caption}
                                    description={""}
                                    image={offer.data.banner_image}
                                    primaryLabel={""}
                                />
                            )}
                        </div>

                        <Hide condition={offer.data.updated_at == undefined}>
                            <div className="flex justify-between items-center text-tertiary text-sm italic">
                                <p>
                                    Last updated,{" "}
                                    {new Date(
                                        offer.data.updated_at!
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </Hide>
                    </div>
                )}
            </>
        </Modal>
    )
}

export default OfferDetail
