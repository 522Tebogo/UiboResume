import React, { useState, useEffect } from 'react';
import { themes, getCurrentTheme, setTheme } from '../utils/themes';
import './ThemeSelector.css';

const ThemeSelector = ({ onThemeChange }) => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 初始化主题
    const theme = getCurrentTheme();
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [onThemeChange]);

  const handleThemeSelect = (themeKey) => {
    const success = setTheme(themeKey);
    if (success) {
      const newTheme = themes[themeKey];
      setCurrentTheme(newTheme);
      setIsOpen(false);
      if (onThemeChange) {
        onThemeChange(newTheme);
      }
    }
  };

  return (
    <div className="theme-selector">
      <button 
        className="theme-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        title="选择主题色"
      >
        <div className="theme-preview">
          <div 
            className="theme-preview-color" 
            style={{ backgroundColor: currentTheme.primary }}
          ></div>
          <span className="theme-preview-name">{currentTheme.name}</span>
        </div>
        <svg 
          className={`theme-selector-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="8" 
          viewBox="0 0 12 8"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <span>选择主题色</span>
          </div>
          <div className="theme-options">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${currentTheme.name === theme.name ? 'active' : ''}`}
                onClick={() => handleThemeSelect(key)}
              >
                <div className="theme-option-preview">
                  <div 
                    className="theme-option-color" 
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div 
                    className="theme-option-accent" 
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                </div>
                <span className="theme-option-name">{theme.name}</span>
                {currentTheme.name === theme.name && (
                  <svg className="theme-check" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
