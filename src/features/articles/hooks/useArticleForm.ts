import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    ArticleSchema,
    TypeArticleSchema,
    ArticleTypes,
    ArticleOptions,
} from "@/features/articles/types"
import {
    useCreateArticle,
    useEditArticle,
    useGetArticleDetail,
} from "@/features/articles/repositories/articles"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"

export default function useArticleForm() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<ArticleOptions>()
    const { articleId } = useParams()

    const { article } = useGetArticleDetail({
        articleId: articleId,
        locale: paramState.locale,
    })

    const { handleSubmit, control, setValue, reset } = useForm({
        resolver: yupResolver(ArticleSchema),
    })

    const createMutation = useCreateArticle(() => handleClose())
    const updateMutation = useEditArticle(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const articleTypeOptions = ArticleTypes.map(i => ({
        label: i.toLocaleUpperCase(),
        value: i.toLowerCase(),
    }))

    const handleClose = () => {
        reset()
        navigate(`/articles`)
    }

    const submit = (data: TypeArticleSchema) => {
        const formData = new FormData()

        if (data.image) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("image", data.image[0])
        }

        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("type", data.type)
        formData.append("priority", data.priority ? "1" : "0")
        formData.append("read_time", `${data.readTime ?? ""}`)
        formData.append("is_published", data.isPublished ? "1" : "0")
        formData.append("locale", data.locale)

        if (articleId) {
            updateMutation.mutate({
                articleId: articleId,
                data: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    useEffect(() => {
        if (article) {
            setValue("title", article.data.title)
            setValue("description", article.data.description)
            setValue("type", article.data.type)
            setValue("readTime", article.data.read_time)
            setValue("priority", article.data.priority == 1 ? true : false)
            setValue(
                "isPublished",
                article.data.is_published == 1 ? true : false
            )
        }
        setValue("locale", paramState.locale as string)
    }, [paramState, article])

    return {
        control,
        handleSubmit,
        handleClose,
        submit,
        isPending,
        articleId,
        articleTypeOptions,
    }
}
