import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const WorkExperienceEditor = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateResponsibility = (expIndex, respIndex, value) => {
    const updated = [...data];
    updated[expIndex].responsibilities[respIndex] = value;
    onChange(updated);
  };

  const addResponsibility = (expIndex) => {
    const updated = [...data];
    updated[expIndex].responsibilities.push('');
    onChange(updated);
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updated = [...data];
    updated[expIndex].responsibilities.splice(respIndex, 1);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <Briefcase size={16} />
        工作经历
      </h3>
      
      {data.map((experience, index) => (
        <div key={experience.id} className="array-item">
          <div className="array-item-header">
            <span className="array-item-title">工作经历 {index + 1}</span>
            <button
              className="btn-remove"
              onClick={() => removeExperience(index)}
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="form-group">
            <label>公司名称</label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              placeholder="请输入公司名称"
            />
          </div>
          
          <div className="form-group">
            <label>职位</label>
            <input
              type="text"
              value={experience.position}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              placeholder="请输入职位"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>开始时间</label>
              <input
                type="text"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                placeholder="如：2023年01月"
              />
            </div>
            <div className="form-group">
              <label>结束时间</label>
              <input
                type="text"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                placeholder="如：2023年12月"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>工作地点</label>
            <input
              type="text"
              value={experience.location}
              onChange={(e) => updateExperience(index, 'location', e.target.value)}
              placeholder="请输入工作地点"
            />
          </div>
          
          <div className="form-group">
            <label>工作职责</label>
            {experience.responsibilities.map((responsibility, respIndex) => (
              <div key={respIndex} className="responsibility-item">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                  placeholder="请输入工作职责"
                />
                <button
                  className="btn-remove"
                  onClick={() => removeResponsibility(index, respIndex)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              className="btn-add-small"
              onClick={() => addResponsibility(index)}
            >
              <Plus size={14} />
              添加职责
            </button>
          </div>
        </div>
      ))}
      
      <button className="btn-add" onClick={addExperience}>
        <Plus size={16} />
        添加工作经历
      </button>
    </div>
  );
};

export default WorkExperienceEditor;
