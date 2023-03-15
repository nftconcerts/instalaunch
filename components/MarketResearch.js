import React from "react";
import styles from "./NameSelection.module.css";

const MarketResearch = ({ businessName, research, setLaunch }) => {
  return (
    <div className={styles.result__container}>
      {(!research && (
        <>
          <h3 className={styles.h3}>Researching {businessName}</h3>
          <span className={styles.loader}></span>
        </>
      )) || (
        <>
          {" "}
          <h3 className={styles.h3}>Are You Up for the Challenge?</h3>{" "}
          <div className={styles.mr__result}>
            {research &&
              research.split("\n").map((para, index) => (
                <div className={styles.mr__para} key={index}>
                  {para}
                </div>
              ))}
          </div>
          <input
            type="submit"
            value={`Launch ${businessName}`}
            className={styles.launch__button}
            onClick={() => setLaunch(true)}
          />
          <div
            className="change__idea"
            onClick={() => {
              setResult(null);
            }}
          >
            Wrong Business? Change Idea
          </div>
        </>
      )}
    </div>
  );
};

export default MarketResearch;
