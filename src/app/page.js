"use client";

import dynamic from "next/dynamic";

const ZooPortfolio = dynamic(() => import("@/components/ZooPortfolio"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a1628",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(91,141,239,0.2)",
          borderTopColor: "#5B8DEF",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p
        style={{
          color: "#5a6d8a",
          fontSize: "14px",
          fontFamily: "Outfit, sans-serif",
          letterSpacing: "2px",
        }}
      >
        Loading Zoo Island...
      </p>
    </div>
  ),
});

export default function Home() {
  return <ZooPortfolio />;
}
