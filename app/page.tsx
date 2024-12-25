import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="flex items-center justify-center w-full h-screen px-6 md:px-20 py-6">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Your Gateway to Smart Shopping:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unlock the Best Prices with Precision — Welcome to
              <span className="text-primary"> Price Pulse</span>
            </h1>

            <p className="my-6">
              Explore the World of Smart Savings! Discover, Track, and Save on Every Purchase with Real-Time Price Alerts and
              In-Depth Market Analysis. Dive deeper into the shopping experience with our advanced tools that help you stay
              ahead of market trends, ensuring you never miss out on the best deals.
            </p>

            <div className="font-semibold text-xl mb-2">
              Start Saving Smartly Today:
            </div>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending Products</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home