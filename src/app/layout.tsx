import type { Metadata } from "next";
import { Geist, Geist_Mono, Tinos } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import SessionWrapper from "@/provider/SessionWrapper";
import SidebarWrapper from "@/components/sidebarWrapper";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tinos = Tinos({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Engineer | Web & DevOps Enthusiast | Asad Qureshi",
  description:
    "Full-Stack Engineer with expertise in modern web development and a strong foundation in DevOps. Passionate about building scalable applications, automating workflows, and optimizing cloud infrastructure. Bridging the gap between development and operations for seamless deployments.",
  keywords: [
    "FullStack Developer",
    "Developer",
    "Fullstack",
    "Engineer",
    "DevOps",
    "Web Development",
    "Web Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Problem Solver",
    "Coder",
    "Full-Stack",
    "MERN Stack",
    "MongoDB",
    "Mongo",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "TypeScript",
    "Freelance Developer",
    "Freelance Web Developer",
    "Freelance Software Engineer",
    "DevOps Engineer",
    "Docker",
    "Kubernetes",
    "REST API",
    "Backend Specialist",
    "Frontend Specialist",
    "IBR Infotech",
    "Asad Qureshi Portfolio",
    "Portfolio",
    "Fullstack Developer Portfolio",
  ],
  openGraph: {
    title: "Full-Stack Engineer | Web & DevOps Enthusiast | Asad Qureshi",
    description:
      "Experienced Full-Stack Engineer skilled in web development and DevOps. Explore my portfolio and projects.",
    url: "https://asadqureshi.tech",
    type: "website",
    images: [
      {
        url: "https://asadqureshi.tech/portfolio-image.png", // Add an image for social sharing
        width: 1200,
        height: 630,
        alt: "Asad Qureshi - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Engineer | Web & DevOps Enthusiast | Asad Qureshi",
    description:
      "Full-Stack Engineer with expertise in web development and DevOps. Passionate about building scalable applications.",
    images: ["https://asadqureshi.tech/portfolio-image.png"], // Same as OpenGraph image
  },
  metadataBase: new URL("https://asadqureshi.tech"),
  alternates: {
    canonical: "https://asadqureshi.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistMono.style} ${geistSans.style} antialiased`}>
        <SessionWrapper>
          <SidebarProvider className="">
            <SidebarWrapper />
            <main className=" w-full">
              {/* <SidebarTrigger
                className=" text-white rounded-none"
                id="sidebar"
              /> */}
              {children}
              <Footer />
              <Toaster />
            </main>
          </SidebarProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
