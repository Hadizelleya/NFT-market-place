import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar, Footer } from "../components/export";
import { NFTProvider } from "../context/NFTContext";
function MyApp({ Component, pageProps }) {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className=" dark:bg-nft-dark bg-white  transition-colors duration-200 ease-in  min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </NFTProvider>
  );
}

export default MyApp;
