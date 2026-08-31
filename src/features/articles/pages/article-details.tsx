import { IconCalendarMonth } from "@tabler/icons-react"
import { useNavigate, useParams } from "react-router-dom"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useGetArticleDetail } from "@/features/articles/repositories/articles"
import { QueryOptions } from "@/types"
import { Modal, ModalPanel } from "@/components/PModal"

import Badge from "@/components/Badge"
import AsyncData from "@/components/async-data"
import LoadingIndicator from "@/components/loading-indicator"

function ArticleDetail() {
    const navigate = useNavigate()

    const { articleId } = useParams()
    const { paramState } = useSearchParamState<QueryOptions>({ page: 1 })

    const { article, isLoading } = useGetArticleDetail({
        articleId: articleId,
        locale: paramState.locale,
    })

    const handleClose = () => navigate("/articles/")

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <AsyncData
                    loading={isLoading}
                    loader={<LoadingIndicator loading={true} />}
                    fallback={undefined}
                    data={article?.data}
                >
                    {article => (
                        <div className="p-8">
                            <h4 className="lg:text-xl 2xl:text-2xl text-primary font-semibold mb-4 md:mb-8">
                                {article.title}
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8 text-xs text-zinc-500">
                                <div className="flex items-start">
                                    <IconCalendarMonth className="text-primary w-6 h-6 md:w-8 md:h-8 mr-3" />

                                    <div>
                                        <p>
                                            Written, &nbsp;{" "}
                                            {new Date(
                                                article.created_at
                                            ).toLocaleString()}
                                        </p>
                                        <p>{article.read_time} min read</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end space-y-2">
                                    <section className="flex space-x-3">
                                        {article.is_published
                                            ? "Top story"
                                            : "Normal Story"}
                                    </section>

                                    <section>
                                        {article.is_published ? (
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

                            <img
                                src={article.image}
                                alt={article.slug}
                                className="w-full h-96 object-center object-cover bg-primary-100 rounded-xl mb-4 md:mb-8"
                            />

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: article.description,
                                }}
                                className="editor-content text-sm"
                            />
                        </div>
                    )}
                </AsyncData>
            </ModalPanel>
        </Modal>
    )
}

export default ArticleDetail
