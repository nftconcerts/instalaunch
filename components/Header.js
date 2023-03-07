import React from "react";

function Header() {
  return (
    <div className="header__full__width">
      <a href="/">
        <img
          src="/instalaunch-text-logo.png"
          className="header__text__logo"
          alt="InstaLaunch Text Logo"
        />
      </a>
      <a href="/login">LOGIN</a>
    </div>
  );
}

export default Header;
