import React from 'react';
import { FileText } from 'lucide-react';

const SummaryEditor = ({ data, onChange }) => {
  return (
    <div className="editor-section">
      <h3 className="section-title">
        <FileText size={16} />
        个人总结
      </h3>
      
      <div className="form-group">
        <label>个人总结</label>
        <textarea
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="请简要介绍您的背景、技能和职业目标..."
          rows={6}
        />
      </div>
    </div>
  );
};

export default SummaryEditor;
