const {
  backGroundColor,
  themeColor,
} = require("../../libs/shared/src/lib/themes/index");

const manifest = (env: "PreProd" | "Local" | "" = ``) => ({
  short_name: `Offisito${env}`,
  name: `Offisito App${!env ? "" : " " + env}`,
  icons: [
    {
      src: `icons/l192.png`,
      type: `image/png`,
      sizes: `192x192`,
    },
    {
      src: `icons/l512.png`,
      type: `image/png`,
      sizes: `512x512`,
    },
  ],
  id: `/?source=pwa`,
  start_url: `/?source=pwa`,
  background_color: backGroundColor,
  display: `standalone`,
  scope: `/`,
  theme_color: themeColor,
  description: `Offisito Web App for Members (Guests)`,
});

module.exports = { manifest };
