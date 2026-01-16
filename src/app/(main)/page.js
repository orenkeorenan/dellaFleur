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
    {
      title: "Flower Bouquet",
      price: "15.000",
      cardImages: ["/flower0.png"], 
      sizeImages: {
        medium: "/flower0.png",
        large: "/flower01.png",
      },
    },
    {
      title: "Snacks Bouquet",
      price: "18.000",
      cardImages: ["/snack.png"],
    },
    {
      title: "Custom Bouquet",
      price: "20.000",
      cardImages: [
        "/custom1.png",
        "/custom2.png",
      ],
    },
  ];


  // Helper to render modal
  const renderModal = () => {
    if (!selectedProduct || !isChooseModalOpen) return null;

    switch (selectedProduct.title) {
      case "Flower Bouquet":
        return <FlowerModal isOpen={isChooseModalOpen} onClose={() => setIsChooseModalOpen(false)} product={selectedProduct} />;
      case "Snacks Bouquet":
        return <SnacksModal isOpen={isChooseModalOpen} onClose={() => setIsChooseModalOpen(false)} product={selectedProduct} />;
      case "Custom Bouquet":
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
            <span>Today - 13 February</span>
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
                images={product.cardImages}
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
