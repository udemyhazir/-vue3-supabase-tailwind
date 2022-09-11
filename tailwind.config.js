module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "at-light-orange": "#f4a261",
        "at-orange": "#e36414",
        "light-grey": "#f1f1f1",
        "at-light-green": "#44ba9f",
        "at-green": "#286d5d",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
