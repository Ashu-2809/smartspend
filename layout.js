import "./globals.css";

export const metadata = { title: "SmartSpend", description: "Personal finance tracker" };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
