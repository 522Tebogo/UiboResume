// 主题色配置
export const themes = {
  default: {
    name: '经典蓝',
    primary: '#007bff',
    secondary: '#6c757d',
    accent: '#28a745',
    background: '#ffffff',
    border: '#e9ecef',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  ocean: {
    name: '海洋蓝',
    primary: '#17a2b8',
    secondary: '#6f42c1',
    accent: '#20c997',
    background: '#ffffff',
    border: '#e3f2fd',
    shadow: 'rgba(23, 162, 184, 0.15)'
  },
  forest: {
    name: '森林绿',
    primary: '#28a745',
    secondary: '#6c757d',
    accent: '#fd7e14',
    background: '#ffffff',
    border: '#e8f5e8',
    shadow: 'rgba(40, 167, 69, 0.15)'
  },
  sunset: {
    name: '日落橙',
    primary: '#fd7e14',
    secondary: '#6c757d',
    accent: '#dc3545',
    background: '#ffffff',
    border: '#fff3e0',
    shadow: 'rgba(253, 126, 20, 0.15)'
  },
  royal: {
    name: '皇家紫',
    primary: '#6f42c1',
    secondary: '#6c757d',
    accent: '#e83e8c',
    background: '#ffffff',
    border: '#f3e5f5',
    shadow: 'rgba(111, 66, 193, 0.15)'
  },
  coral: {
    name: '珊瑚红',
    primary: '#dc3545',
    secondary: '#6c757d',
    accent: '#fd7e14',
    background: '#ffffff',
    border: '#ffebee',
    shadow: 'rgba(220, 53, 69, 0.15)'
  },
  midnight: {
    name: '午夜黑',
    primary: '#343a40',
    secondary: '#6c757d',
    accent: '#007bff',
    background: '#ffffff',
    border: '#e9ecef',
    shadow: 'rgba(52, 58, 64, 0.15)'
  },
  mint: {
    name: '薄荷绿',
    primary: '#20c997',
    secondary: '#6c757d',
    accent: '#17a2b8',
    background: '#ffffff',
    border: '#e8f8f5',
    shadow: 'rgba(32, 201, 151, 0.15)'
  }
};

// 获取当前主题
export const getCurrentTheme = () => {
  const saved = localStorage.getItem('resume-theme');
  return saved && themes[saved] ? themes[saved] : themes.default;
};

// 设置主题
export const setTheme = (themeKey) => {
  if (themes[themeKey]) {
    localStorage.setItem('resume-theme', themeKey);
    applyTheme(themes[themeKey]);
    return true;
  }
  return false;
};

// 应用主题到CSS变量
export const applyTheme = (theme) => {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-background', theme.background);
  root.style.setProperty('--theme-border', theme.border);
  root.style.setProperty('--theme-shadow', theme.shadow);
};

// 初始化主题
export const initTheme = () => {
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
  return currentTheme;
};
