import "./globals.css";

export const metadata = {
  title: "AI Movie Insight Builder",
  description: "AI-powered movie sentiment analyzer"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        {children}
      </body>
    </html>
  );
}
