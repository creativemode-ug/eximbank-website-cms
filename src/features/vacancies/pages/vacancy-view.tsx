import { IconCalendarMonth } from "@tabler/icons-react"
import { useLocation } from "react-router-dom"
import { Vacancy } from "@/features/vacancies/types"
import { Modal, ModalHead, ModalPanel } from "@/components/PModal"
import Badge from "@/components/Badge"
import useRouteModal from "@/hooks/useRouterModal"

export default function PositionView() {
    const location = useLocation()
    const position = location.state as Vacancy

    const { open, closeModal } = useRouteModal()

    return (
        <Modal isOpen={open} onClose={closeModal}>
            <ModalPanel childClassName="w-full md:max-w-2xl">
                <ModalHead
                    title={position?.type.toUpperCase() ?? ""}
                    onClose={close}
                ></ModalHead>
                <div className="p-8">
                    {position && (
                        <div>
                            <h4 className="lg:text-xl 2xl:text-2xl text-primary font-semibold mb-4 md:mb-8">
                                {position.title}
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8 text-xs text-zinc-500">
                                <div className="flex items-start">
                                    <IconCalendarMonth className="text-primary w-6 h-6 md:w-8 md:h-8 mr-3" />

                                    <div>
                                        <p>
                                            Published, &nbsp;{" "}
                                            {new Date(
                                                position.created_at
                                            ).toLocaleString()}
                                        </p>
                                        <p>
                                            Deadline,{" "}
                                            {new Date(
                                                position.deadline
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end space-y-2">
                                    <section className="flex space-x-3">
                                        {position.location}
                                    </section>

                                    <section>
                                        {position.is_published ? (
                                            <Badge
                                                intent="primary"
                                                text={"Published"}
                                            />
                                        ) : (
                                            <Badge
                                                intent="default"
                                                text={"Draft"}
                                            />
                                        )}
                                    </section>
                                </div>
                            </div>

                            <div className="quote text-xs xl:text-sm mb-4">
                                {position.summary}
                            </div>

                            <img
                                src={position.image}
                                alt={position.slug}
                                className="w-full h-96 object-center object-cover bg-primary-100 rounded-xl mb-4 md:mb-8"
                            />
                        </div>
                    )}
                </div>
            </ModalPanel>
        </Modal>
    )
}
