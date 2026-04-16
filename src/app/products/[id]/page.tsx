import { Metadata } from "next";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Bubble Liquid",
    };
  }

  const mainImage = product.largeImage ?? product.image;

  return {
    title: `${product.name} | Bubble Liquid`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [mainImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [mainImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const mainImage = product.largeImage ?? product.image;

  // JSON-LD AEO Structured Data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://bubbleliquids.com${mainImage}`,
    description: product.description,
    offers: {
      "@type": "AggregateOffer",
      offerCount: product.sizes.length,
      lowPrice: Math.min(...product.sizes.map((s) => s.price)),
      highPrice: Math.max(...product.sizes.map((s) => s.price)),
      priceCurrency: "INR",
    },
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient />
    </>
  );
}
