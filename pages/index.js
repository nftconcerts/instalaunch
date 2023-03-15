import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IdeaForm from "../components/IdeaForm";
import NameSelection from "../components/NameSelection";
import MarketResearch from "../components/MarketResearch";
import Register from "../components/Register";

let delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Home() {
  const [businessInput, setBusinessInput] = useState("");
  const [result, setResult] = useState();
  const [businessNames, setBusinessNames] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [customBusinessName, setCustomBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [research, setResearch] = useState("");
  const [launch, setLaunch] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (businessInput.trim().length === 0) {
      alert("Please enter a business idea");
      return;
    }

    setLoading(true);
    try {
      launchAnimation(); // consider using CSS animations or a preloader library
      const response = await fetch("/api/generateNames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ business: businessInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log("Chatbot response:", data.result);
      await delay(1500);
      setResult(data.result);
      setBusinessNames(data.result.split(","));
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      await delay(2000);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const conductMarketResearch = async () => {
    if (businessInput.trim().length === 0) {
      alert("Please enter a business idea");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generateMR", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ business: businessInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log("Chatbot response:", data.result);
      await delay(1500);
      setResearch(data.result);
    } catch (error) {
      console.error(error);
      await delay(2000);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function launchAnimation() {
    const image = document.getElementById("logo");
    const form = document.getElementById("form");
    image.src = "/launched-v2.gif";
    form.style =
      "animation-delay: 1s; animation: fadeOut 1s ease-in-out forwards;";
    await delay(1500);
    image.style = "animation: flyAway 1s ease-in-out forwards;";
  }

  return (
    <div>
      <Head>
        <title>InstaLaunch AI</title>
        <link rel="icon" href="/instalaunch-icon.png" />
        <meta property="og:image" content="/instalaunch-icon.png"></meta>
      </Head>
      <Header />
      <main className={styles.main}>
        {!result ? (
          <IdeaForm
            onSubmit={onSubmit}
            businessInput={businessInput}
            setBusinessInput={setBusinessInput}
            loading={loading}
          />
        ) : (
          <>
            {(!businessName && (
              <NameSelection
                businessNames={businessNames}
                setBusinessName={setBusinessName}
                customBusinessName={customBusinessName}
                setCustomBusinessName={setCustomBusinessName}
                setResult={setResult}
                conductMarketResearch={conductMarketResearch}
              />
            )) || (
              <>
                {(!launch && (
                  <MarketResearch
                    businessName={businessName}
                    research={research}
                    setLaunch={setLaunch}
                  />
                )) || <Register />}
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
