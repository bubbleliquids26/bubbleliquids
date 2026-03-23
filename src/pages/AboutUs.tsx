import { Flower, Palette, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PopularProducts from "@/components/PopularProducts";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative w-full py-8 md:py-12 px-4 md:px-6 mt-24 flex justify-center">
        <div className="w-[1050px] h-72 md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/About-banner.png"
            alt="Bubble About Banner"
            className="w-full h-full object-fit"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1596401643170-6f87ee183ff3?w=1500&h=600&fit=crop";
            }}
          />
        </div>
      </section>

      {/* About Heading */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ABOUT BUBBLE
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto"></div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-primary to-blue-950 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed italic">
              "I love Bubble products because they deliver exceptional cleaning
              power and leave my home fresh and sparkling. The fragrance lasts
              long, and my family loves the refreshing scent!"
            </p>
            <p className="mt-6 text-pink-300 font-semibold">
              — Satisfied Customer
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-pink-100 rounded-full">
                <Flower className="w-12 h-12 text-pink-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Long-lasting Freshness
              </h3>
              <p className="text-gray-600">
                Our advanced formula keeps your home fresh and clean for
                extended periods
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-blue-100 rounded-full">
                <Palette
                  className="w-12 h-12 text-blue-600"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Powerful Cleaning
              </h3>
              <p className="text-gray-600">
                Cuts through grease and dirt effectively, delivering sparkling
                clean results
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-purple-100 rounded-full">
                <Heart
                  className="w-12 h-12 text-purple-600"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Care for Your Home
              </h3>
              <p className="text-gray-600">
                Gentle on surfaces while tough on stains, protecting your home's
                beauty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Bubble has been at the forefront of cleaning excellence for over a
              decade. We believe that every home deserves products that deliver
              exceptional results without compromise.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              From our humble beginnings, we've grown into a trusted name in
              household cleaning. Our commitment to quality, innovation, and
              customer satisfaction has never wavered. We continue to develop
              advanced formulas that tackle tough cleaning challenges while
              being kind to your home and family.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every product in our range is crafted with care, combining
              powerful ingredients with pleasant fragrances. We're proud to be
              part of millions of homes, making cleaning easier and more
              enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Products Showcase - Popular Products */}
      <PopularProducts />

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Quality</h3>
              <p className="text-gray-700">
                We never compromise on the quality of our ingredients and
                manufacturing processes. Every product undergoes rigorous
                testing to ensure excellence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously research and develop new formulas to meet
                evolving customer needs and deliver cutting-edge cleaning
                solutions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Responsibility
              </h3>
              <p className="text-gray-700">
                We're committed to environmental sustainability and safe
                practices that protect both your family and our planet.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Customer Focus
              </h3>
              <p className="text-gray-700">
                Your satisfaction is our priority. We listen to feedback and
                continuously improve to serve you better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Ready to Experience Bubble?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover our complete range of products designed to make your home
            cleaner, fresher, and more beautiful.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-primary"
            >
              Shop Our Products <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
