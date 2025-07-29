import React, { useState, useEffect } from "react";
import { Card, Switch, Select, Typography } from "antd";

const THEME_KEY = "user-theme";
const LANG_KEY = "user-language";

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

export const PreferencesPage = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light",
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANG_KEY) || "en",
  );

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    // Optionally, apply theme to document body
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  return (
    <Card
      title="User Preferences"
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <Typography.Text strong>Theme:</Typography.Text>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        options={themeOptions}
        value={theme}
        onChange={setTheme}
      />
      <Typography.Text strong>Language:</Typography.Text>
      <Select
        style={{ width: "100%" }}
        options={languageOptions}
        value={language}
        onChange={setLanguage}
      />
    </Card>
  );
};
