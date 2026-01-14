"use client"

import { useState } from "react";
import NavButtons from "../components/Buttons/NavButtons";
import ProductCard from "../components/ProductCard/ProductCard";
import FlowerModal from "../components/Modals/FlowerModals";
import SnacksModal from "../components/Modals/SnacksModal";
import CustomsModal from "../components/Modals/CustomsModal";
import HowToPurchase from "../components/HowToPurchase/HowToPurchase";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);

  const products = [
    { title: "Flower Bouquete", price: "15.000", images: ["/flower2.png"] },
    { title: "Snacks Bouquete", price: "18.000", images: ["/snack1.png"] },
    {
      title: "Customs Bouquete",
      price: "20.000", // fixed from "rice" to "price"
      images: [
        "/custom1.png",
        "/custom2.png",
        "/custom3.png",
        "/flower1.png",
        "/flower2.png",
        "/flower3.png",
      ],
    },
  ];

  // Helper to render modal
  const renderModal = () => {
    if (!selectedProduct || !isChooseModalOpen) return null;

    switch (selectedProduct.title) {
      case "Flower Bouquete":
        return <FlowerModal isOpen={isChooseModalOpen} onClose={() => setIsChooseModalOpen(false)} product={selectedProduct} />;
      case "Snacks Bouquete":
        return <SnacksModal isOpen={isChooseModalOpen} onClose={() => setIsChooseModalOpen(false)} product={selectedProduct} />;
      case "Customs Bouquete":
        return <CustomsModal isOpen={isChooseModalOpen} onClose={() => setIsChooseModalOpen(false)} product={selectedProduct} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem"}}>
      <h1 style={{ textAlign: "center", fontSize: "1.15rem" }}>
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            fontStyle: "italic",
            color:"black"
          }}
        >
            <span>(Preorder Graduation)</span>
            <span>20 January - 13 February</span>
        </div>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem",alignItems:'center' }}>
        <NavButtons active={activeTab} setActive={setActiveTab} />

        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {activeTab === "Products" ? (
            products.map((product) => (
              <ProductCard
                key={product.title}
                title={product.title}
                price={product.price}
                images={product.images}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsChooseModalOpen(true);
                }}
              />
            ))
          ) : (
            <HowToPurchase />
          )}
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}
