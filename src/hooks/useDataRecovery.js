import { useEffect } from 'react';
import resumeStorage from '../utils/storage';

// 数据恢复Hook
const useDataRecovery = (initialData, onDataLoaded) => {

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // 检查是否有保存的数据
        if (resumeStorage.hasData()) {
          const savedData = resumeStorage.loadData();
          
          if (savedData && isValidResumeData(savedData)) {
            onDataLoaded(savedData);
          }
        }
      } catch (error) {
        console.error('❌ 数据恢复失败:', error);
      }
    };

    loadSavedData();
  }, [onDataLoaded]);

  // 验证数据结构的完整性
  const isValidResumeData = (data) => {
    try {
      // 检查基本结构
      if (!data || typeof data !== 'object') return false;
      if (!data.personalInfo || typeof data.personalInfo !== 'object') return false;
      if (!Array.isArray(data.sections)) return false;

      // 检查个人信息字段
      const requiredPersonalFields = ['name', 'phone', 'email'];
      for (const field of requiredPersonalFields) {
        if (typeof data.personalInfo[field] !== 'string') return false;
      }

      // 检查板块结构
      for (const section of data.sections) {
        if (!section.id || !section.type || !section.title) return false;
        if (typeof section.visible !== 'boolean') return false;
        if (typeof section.order !== 'number') return false;
      }

      return true;
    } catch (error) {
      console.error('数据验证失败:', error);
      return false;
    }
  };

  // 清除保存的数据
  const clearSavedData = () => {
    try {
      resumeStorage.clearData();
      console.log('✅ 已清除保存的数据');
      return true;
    } catch (error) {
      console.error('❌ 清除数据失败:', error);
      return false;
    }
  };

  // 导出数据
  const exportData = () => {
    try {
      return resumeStorage.exportData();
    } catch (error) {
      console.error('❌ 导出数据失败:', error);
      return false;
    }
  };

  // 导入数据
  const importData = (file) => {
    return resumeStorage.importData(file);
  };

  return {
    clearSavedData,
    exportData,
    importData
  };
};

export default useDataRecovery;
