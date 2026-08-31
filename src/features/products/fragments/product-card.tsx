import { ProductTypeEnum, type Product } from "@/features/products/types"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { ProductQueryOptions } from "@/features/products/types"

export type ProductCardProps = {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {
    const { paramState } = useSearchParamState<ProductQueryOptions>()

    return (
        <Link
            to={`/services/products/${product.id}?locale=${paramState.locale}`}
            state={product}
            className={twMerge(
                "border border-zinc-200 hover:border-zinc-300",
                "rounded-lg p-2 space-y-2",
                !product.is_published && "bg-zinc-100"
            )}
        >
            <div
                className={twMerge(
                    "relative h-56 overflow-hidden bg-zinc-100",
                    "rounded-lg group"
                )}
            >
                <img
                    src={product.banner_img ?? ""}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs text-zinc-400">
                    {product.type == ProductTypeEnum.Personal
                        ? "Personal"
                        : "Business"}
                </p>
                <h4 className="text-xs xl:text-sm capitalize line-clamp-2">
                    {product.title}
                </h4>
            </div>
        </Link>
    )
}

export default ProductCard
