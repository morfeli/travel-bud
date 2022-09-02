/** @type {import('tailwindcss').Config} */
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
        darkMode: "#595959",
      },
      width: {
        "375px": "375px",
      },
    },
    fontFamily: {
      Chillax: ["Chillax", "sans-serif"],
    },
    scale: {
      tiny: "0.2",
    },
  },
  plugins: [],
};
