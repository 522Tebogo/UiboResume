import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, Download, Upload } from 'lucide-react';
import './SaveStatus.css';

const SaveStatus = ({ 
  isSaving = false, 
  lastSaved = null, 
  hasError = false, 
  onExport, 
  onImport 
}) => {
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (isSaving || hasError) {
      setShowStatus(true);
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, hasError]);

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const saved = new Date(timestamp);
    const diff = now - saved;
    
    if (diff < 60000) { // 1分钟内
      return '刚刚保存';
    } else if (diff < 3600000) { // 1小时内
      return `${Math.floor(diff / 60000)}分钟前保存`;
    } else {
      return saved.toLocaleTimeString();
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file && onImport) {
      onImport(file);
    }
  };

  return (
    <div className="save-status">
      {/* 操作按钮 - 始终显示 */}
      <div className="save-actions">
        <button 
          className="btn-icon" 
          onClick={onExport}
          title="导出数据"
        >
          <Download size={16} />
        </button>
        
        <label className="btn-icon" title="导入数据">
          <Upload size={16} />
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* 状态指示器 */}
      {showStatus && (
        <div className={`status-indicator ${hasError ? 'error' : 'success'}`}>
          {hasError ? (
            <>
              <AlertCircle size={16} />
              <span>保存失败</span>
            </>
          ) : isSaving ? (
            <>
              <Save size={16} />
              <span>正在保存...</span>
            </>
          ) : (
            <>
              <Check size={16} />
              <span>已保存</span>
            </>
          )}
        </div>
      )}

      {/* 最后保存时间 */}
      {lastSaved && (
        <div className="last-saved">
          {formatLastSaved(lastSaved)}
        </div>
      )}
    </div>
  );
};

export default SaveStatus;
