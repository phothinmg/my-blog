function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});
const button = document.querySelector("[data-theme-toggle]");
const currentCta = currentThemeSetting === "dark" ? "☀" : "☪";
button.innerHTML = currentCta;

// Set the initial theme on page load
document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  const newCta = newTheme === "dark" ? "☀" : "☪";
  button.innerHTML = newCta;
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});
