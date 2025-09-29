import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

const HonorsEditor = ({ data, onChange }) => {
  const addHonor = () => {
    onChange([...data, '']);
  };

  const updateHonor = (index, value) => {
    const updated = [...data];
    updated[index] = value;
    onChange(updated);
  };

  const removeHonor = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <Award size={16} />
        荣誉奖项
      </h3>
      
      {data.map((honor, index) => (
        <div key={index} className="array-item">
          <div className="array-item-header">
            <span className="array-item-title">奖项 {index + 1}</span>
            <button
              className="btn-remove"
              onClick={() => removeHonor(index)}
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="form-group">
            <label>奖项名称</label>
            <input
              type="text"
              value={honor}
              onChange={(e) => updateHonor(index, e.target.value)}
              placeholder="请输入奖项名称"
            />
          </div>
        </div>
      ))}
      
      <button className="btn-add" onClick={addHonor}>
        <Plus size={16} />
        添加荣誉奖项
      </button>
    </div>
  );
};

export default HonorsEditor;
