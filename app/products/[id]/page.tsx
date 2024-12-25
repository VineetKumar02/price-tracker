import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/')

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex items-center justify-center w-full h-screen gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            // fill={true}
            width={500}
            height={500}
            className="object-contain p-5"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-3 flex-wrap pb-4">
            <p className="text-xl
               text-secondary font-semibold">
              {product.title}
            </p>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-3xl text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="product-stars">
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-primary-orange font-semibold">
                  {product.stars || '25'}
                </p>
              </div>

              <div className="product-reviews">
                <Image
                  src="/assets/icons/comment.svg"
                  alt="comment"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-secondary font-semibold">
                  {product.reviewsCount} Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>
          </div>

          <Modal productId={id} productURL={product.url} />
        </div>
      </div>

      <div className="flex flex-col gap-12 p-10">

        <h3 className="text-2xl text-secondary font-semibold">
          Product Description
        </h3>

        <div className="flex flex-col gap-4">
          {product?.description?.split('\n')}
        </div>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails