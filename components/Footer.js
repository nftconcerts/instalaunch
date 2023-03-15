import React from "react";

function Footer() {
  const shareData = {
    title: "InstaLaunch AI",
    text: "Launch a Business in 45 Minutes",
    url: "https://instalaunch.ai",
  };

  return (
    <div className="footer__full__width">
      <div className="footer__top">
        <p>
          {" "}
          <a href="mailto:jdendrin@me.com?subject=Seeking Investment Information for InstaLaunch&body=Hello InstaLaunch,  %0D%0A%0D%0AI would love investment information.%0D%0A%0D%0AThank you, %0D%0A%0D%0A[INSERT YOUR FULL NAME PLEASE]">
            Invest
          </a>
        </p>
        <p
          onClick={() => {
            if (navigator.share) {
              navigator.share(shareData);
            } else {
              navigator.clipboard.writeText(shareData.url);
              alert("URL Copied to Clipboard");
            }
          }}
        >
          <a> Share</a>
        </p>
      </div>
      <div className="footer__bottom">
        <p>Copyright © 2023 Sheep LLC. All rights reserverd.</p>
      </div>
    </div>
  );
}

export default Footer;
