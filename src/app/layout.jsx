import "@/styles/globals.css";
import { inter, urbanist } from "@/config/fonts";
import { Providers } from "@/config/providers";

export const metadata = {
  title: "Cinematic",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${urbanist.variable} antialiased bg-black`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
