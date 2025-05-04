import { Rubik } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Langame | Language Learning Platform",
  description:
    "Langame is a language learning platform that helps you learn languages efficiently with natural language processing and smart scheduling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${rubik.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
