import React from "react";
import styles from "./IdeaForm.module.css";

const IdeaForm = ({ onSubmit, businessInput, setBusinessInput, loading }) => {
  return (
    <div className={styles.content}>
      <div className={styles.icon__container}>
        <img
          src="/instalaunch-logo-transparent.png"
          className={styles.icon}
          id="logo"
          alt="/launched-logo-2.png"
        />
      </div>
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
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default IdeaForm;
