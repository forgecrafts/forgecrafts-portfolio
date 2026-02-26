import "./globals.css";

export const metadata = {
  title: "Liam Thompson — Zoo Island Portfolio",
  description:
    "Senior Full Stack & Mobile Engineer with 7+ years of experience. Explore my career through a 3D zoo island experience.",
  keywords: [
    "Full Stack Developer",
    "Mobile Engineer",
    "React Native",
    "React",
    "Next.js",
    "Node.js",
    "Django",
    "Portfolio",
    "Liam Thompson",
  ],
  openGraph: {
    title: "Liam Thompson — Zoo Island Portfolio",
    description:
      "A 3D portfolio experience — each exhibit tells the story of a career milestone.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
