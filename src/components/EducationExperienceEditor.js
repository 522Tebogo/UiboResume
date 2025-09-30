import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationExperienceEditor = ({ data, onChange }) => {
  const safeData = Array.isArray(data) ? data : [];
  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      location: '',
      highlights: ['']
    };
    onChange([...(safeData || []), newEdu]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...safeData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index) => {
    const updated = safeData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateHighlight = (eduIndex, hiIndex, value) => {
    const updated = [...safeData];
    updated[eduIndex].highlights[hiIndex] = value;
    onChange(updated);
  };

  const addHighlight = (eduIndex) => {
    const updated = [...safeData];
    updated[eduIndex].highlights.push('');
    onChange(updated);
  };

  const removeHighlight = (eduIndex, hiIndex) => {
    const updated = [...safeData];
    updated[eduIndex].highlights.splice(hiIndex, 1);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <GraduationCap size={16} />
        教育经历
      </h3>

      {safeData.map((edu, index) => (
        <div key={edu.id} className="array-item">
          <div className="array-item-header">
            <span className="array-item-title">教育经历 {index + 1}</span>
            <button
              className="btn-remove"
              onClick={() => removeEducation(index)}
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="form-group">
            <label>学校</label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
              placeholder="请输入学校名称"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>学位</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="如：本科/硕士/博士"
              />
            </div>
            <div className="form-group">
              <label>专业</label>
              <input
                type="text"
                value={edu.major}
                onChange={(e) => updateEducation(index, 'major', e.target.value)}
                placeholder="如：计算机科学与技术"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>开始时间</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                placeholder="如：2019年09月"
              />
            </div>
            <div className="form-group">
              <label>结束时间</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                placeholder="如：2023年06月"
              />
            </div>
          </div>

          <div className="form-group">
            <label>所在地</label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => updateEducation(index, 'location', e.target.value)}
              placeholder="请输入城市"
            />
          </div>

          <div className="form-group">
            <label>课程/成果/荣誉</label>
            {edu.highlights.map((h, hiIndex) => (
              <div key={hiIndex} className="responsibility-item">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => updateHighlight(index, hiIndex, e.target.value)}
                  placeholder="如：数据结构、校级奖学金等"
                />
                <button
                  className="btn-remove"
                  onClick={() => removeHighlight(index, hiIndex)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              className="btn-add-small"
              onClick={() => addHighlight(index)}
            >
              <Plus size={14} />
              添加一项
            </button>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addEducation}>
        <Plus size={16} />
        添加教育经历
      </button>
    </div>
  );
};

export default EducationExperienceEditor;


