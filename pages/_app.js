import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar, Footer } from "../components/export";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className=" dark:bg-nft-dark bg-white  transition-colors duration-200 ease-in  min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
