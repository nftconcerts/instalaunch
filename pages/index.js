import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

let delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default function Home() {
  const [businessInput, setBusinessInput] = useState("");
  const [result, setResult] = useState();
  const [businessNames, setBusinessNames] = useState([]);
  const [businessName, setBusinessName] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (businessInput.trim().length === 0) {
      alert("Please enter a business idea");
      return;
    }

    try {
      launchAnimation();
      const response = await fetch("/api/generate", {
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
      setBusinessInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      await delay(2000);
      alert(error.message);
    }
  }

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
      </Head>
      <Header />
      <main className={styles.main}>
        {(!result && (
          <>
            <img
              src="/instalaunch-logo-transparent.png"
              className={styles.icon}
              id="logo"
              alt="/launched-logo-2.png"
            />
            <form onSubmit={onSubmit} id="form">
              <input
                type="text"
                name="animal"
                placeholder="Enter Your Business Idea"
                value={businessInput}
                onChange={(e) => setBusinessInput(e.target.value)}
              />
              <input
                type="submit"
                value="Launch Your Business"
                className="launch__button"
              />
            </form>
          </>
        )) || (
          <div className="result__container">
            {" "}
            <h3 className={styles.h3}>Step 1 - Choose a Name</h3>
            <div className="result">
              <button
                onClick={() => {
                  setBusinessName(businessNames[0]);
                }}
                className="result__button"
              >
                {businessNames[0]}
              </button>{" "}
              <button
                onClick={() => {
                  setBusinessName(businessNames[1]);
                }}
                className="result__button"
              >
                {businessNames[1]}
              </button>{" "}
              <button
                onClick={() => {
                  setBusinessName(businessNames[2]);
                }}
                className="result__button"
              >
                {businessNames[2]}
              </button>{" "}
              <button
                onClick={() => {
                  setBusinessName(businessNames[3]);
                }}
                className="result__button"
              >
                {businessNames[3]}
              </button>{" "}
            </div>
            <div className="input__container">
              <h5 className={styles.h5}>Or..</h5>
              <input
                type="text"
                name="animal"
                placeholder="Enter Custom Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <input
                type="submit"
                value="Use Custom Name"
                className="launch__button"
              />
              <div
                className="change__idea"
                onClick={() => {
                  setResult(null);
                }}
              >
                Wrong Buisness? Change Idea
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
