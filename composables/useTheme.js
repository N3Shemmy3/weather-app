export const useTheme = () => {
  const isDarkMode = ref(false);

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    const htmlEl = document.documentElement;
    if (isDarkMode.value) {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }
    // Optionally persist the theme in localStorage
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    isDarkMode.value = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  };

  onMounted(loadTheme);

  return { isDarkMode, toggleTheme };
};
