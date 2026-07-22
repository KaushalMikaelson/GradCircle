import "./globals.css";

export const metadata = {
  title: "GradCircle x Bennett | ApexScholars Program",
  description:
    "Personalized Virtual Research Program for Students (Grades 8-12). Guided by PhD Mentors from IITs, IIMs, and IISc.",
  icons: {
    icon: "/grad.svg",
    shortcut: "/grad.svg",
    apple: "/grad.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
