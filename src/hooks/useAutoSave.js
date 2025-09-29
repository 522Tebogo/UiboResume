import { useEffect, useRef } from 'react';
import resumeStorage from '../utils/storage';

// 自动保存Hook
const useAutoSave = (data, options = {}) => {
  const {
    enabled = true,
    interval = 2000,
    onSave = () => {},
    onError = () => {}
  } = options;

  const previousDataRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled || !data) return;

    // 检查数据是否发生变化
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (hasChanged) {
      // 清除之前的定时器
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // 设置新的保存定时器
      saveTimeoutRef.current = setTimeout(() => {
        try {
          resumeStorage.debouncedSave(data);
          onSave(data);
          previousDataRef.current = JSON.parse(JSON.stringify(data));
        } catch (error) {
          onError(error);
        }
      }, interval);
    }

    // 清理函数
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, enabled, interval, onSave, onError]);

  // 立即保存函数
  const saveImmediately = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    try {
      const success = resumeStorage.immediateSave(data);
      if (success) {
        onSave(data);
        previousDataRef.current = JSON.parse(JSON.stringify(data));
        return true;
      } else {
        onError(new Error('立即保存失败'));
        return false;
      }
    } catch (error) {
      onError(error);
      return false;
    }
  };

  return {
    saveImmediately
  };
};

export default useAutoSave;
