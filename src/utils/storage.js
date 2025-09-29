// 本地存储工具类
const STORAGE_KEY = 'uibo_resume_data';
const AUTO_SAVE_INTERVAL = 2000; // 2秒自动保存

class ResumeStorage {
  constructor() {
    this.saveTimeout = null;
  }

  // 保存数据到本地存储
  saveData(data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serializedData);
      console.log('✅ 简历数据已保存到本地存储');
      return true;
    } catch (error) {
      console.error('❌ 保存数据失败:', error);
      return false;
    }
  }

  // 从本地存储加载数据
  loadData() {
    try {
      const serializedData = localStorage.getItem(STORAGE_KEY);
      if (serializedData) {
        const data = JSON.parse(serializedData);
        console.log('✅ 简历数据已从本地存储加载');
        return data;
      }
      return null;
    } catch (error) {
      console.error('❌ 加载数据失败:', error);
      return null;
    }
  }

  // 清除本地存储
  clearData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('✅ 本地存储数据已清除');
      return true;
    } catch (error) {
      console.error('❌ 清除数据失败:', error);
      return false;
    }
  }

  // 检查是否有保存的数据
  hasData() {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  // 获取数据大小（字节）
  getDataSize() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? new Blob([data]).size : 0;
    } catch (error) {
      return 0;
    }
  }

  // 防抖保存 - 避免频繁保存
  debouncedSave(data) {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      this.saveData(data);
    }, AUTO_SAVE_INTERVAL);
  }

  // 立即保存
  immediateSave(data) {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    return this.saveData(data);
  }

  // 导出数据
  exportData() {
    const data = this.loadData();
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `uibo_resume_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    }
    return false;
  }

  // 导入数据
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.saveData(data);
          resolve(data);
        } catch (error) {
          reject(new Error('文件格式不正确'));
        }
      };
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsText(file);
    });
  }
}

// 创建单例实例
const resumeStorage = new ResumeStorage();

export default resumeStorage;
