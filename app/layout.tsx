import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formulario Diagnóstico",
  description: "Herramientas digitales educativas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}




// #0a2747 (Primario): Es un tono oscuro de azul, que genera una sensación de profesionalismo y profundidad. Este color puede ser ideal para encabezados, menús o áreas importantes en tu sitio web.

// #b07b2a (Secundario): Este es un tono dorado, cálido y sofisticado. Puede utilizarse para resaltar botones, iconos, o como un color de acento para elementos clave, aportando un toque de elegancia a tu diseño.

// #9ccbd0 (Complementario): Este es un azul más claro y suave, que combina perfectamente con los tonos anteriores. Es ideal para fondos, textos secundarios o detalles que necesiten una apariencia más ligera y aireada.