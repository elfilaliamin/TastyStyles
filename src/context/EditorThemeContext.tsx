/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

type EditorTheme = 'dark' | 'light';

interface EditorThemeContextType {
  editorTheme: EditorTheme;
  toggleEditorTheme: () => void;
  setEditorTheme: (theme: EditorTheme) => void;
}

const STORAGE_KEY = 'tastystyles_editor_theme';

const EditorThemeContext = createContext<EditorThemeContextType | undefined>(undefined);

export const EditorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editorTheme, setEditorThemeState] = useState<EditorTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as EditorTheme | null;
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      // Default to dark mode for the tool UI
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (editorTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem(STORAGE_KEY, editorTheme);
  }, [editorTheme]);

  const toggleEditorTheme = () => {
    setEditorThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setEditorTheme = (theme: EditorTheme) => {
    setEditorThemeState(theme);
  };

  return (
    <EditorThemeContext.Provider value={{ editorTheme, toggleEditorTheme, setEditorTheme }}>
      {children}
    </EditorThemeContext.Provider>
  );
};

export function useEditorTheme(): EditorThemeContextType {
  const context = useContext(EditorThemeContext);
  if (!context) {
    throw new Error('useEditorTheme must be used within an EditorThemeProvider');
  }
  return context;
}

