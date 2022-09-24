/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".backface": {
      backfaceVisibilty: "hidden",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpurpleOne: "#dec9e9",
        lightpurpleTwo: "#dac3e8",
        lightpurpleThree: "#d2b7e5",
        medpurpleOne: "#c19ee0",
        medpurpleTwo: "#b185db",
        medpurpleThree: "#a06cd5",
        darkpurpleOne: "#9163cb",
        darkpurpleTwo: "#815ac0",
        darkpurpleThree: "#7251b5",
        darkPurpleFour: "#6247aa",
        darkMode: "#121212",
      },
      width: {
        "375px": "375px",
        "90vw": "90vw",
        "75vw": "75vw",
      },
    },
    fontFamily: {
      Chillax: ["Chillax", "sans-serif"],
    },
    scale: {
      tiny: "0.2",
    },
  },
  plugins: [myclass],
};
