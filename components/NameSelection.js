import React from "react";
import styles from "./NameSelection.module.css";

const NameSelection = ({
  businessName,
  businessNames,
  setBusinessName,
  customBusinessName,
  setCustomBusinessName,
  setResult,
  conductMarketResearch,
}) => {
  return (
    <>
      {!businessName ? (
        <div className={styles.result__container}>
          <h3 className={styles.h3}>Choose a Name</h3>
          <div className="result">
            {businessNames.map((name, index) => (
              <button
                key={index}
                onClick={() => {
                  setBusinessName(name);
                  conductMarketResearch(customBusinessName);
                }}
                className="result__button"
              >
                {name}
              </button>
            ))}
          </div>
          <div className={styles.input__container}>
            <h5 className={styles.h5}>Or..</h5>
            <input
              type="text"
              name="animal"
              placeholder="Enter Custom Business Name"
              value={customBusinessName}
              onChange={(e) => setCustomBusinessName(e.target.value)}
            />
            <input
              type="submit"
              value="Use Custom Name"
              className={styles.launch__button}
              onClick={() => {
                setBusinessName(customBusinessName);
                conductMarketResearch(customBusinessName);
              }}
            />
            <div
              className="change__idea"
              onClick={() => {
                setResult(null);
              }}
            >
              Wrong Business? Change Idea
            </div>
          </div>
        </div>
      ) : (
        <div className="result__container">{businessName} </div>
      )}
    </>
  );
};

export default NameSelection;
