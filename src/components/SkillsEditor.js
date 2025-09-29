import React from 'react';
import { Code, Plus, Trash2 } from 'lucide-react';

const SkillsEditor = ({ data, onChange }) => {
  const addTechnicalSkill = () => {
    const updated = {
      ...data,
      technical: [...(data.technical || []), { name: '', level: '熟练' }]
    };
    onChange(updated);
  };

  const updateTechnicalSkill = (index, field, value) => {
    const updated = {
      ...data,
      technical: data.technical.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    };
    onChange(updated);
  };

  const removeTechnicalSkill = (index) => {
    const updated = {
      ...data,
      technical: data.technical.filter((_, i) => i !== index)
    };
    onChange(updated);
  };

  const addLanguage = () => {
    const updated = {
      ...data,
      languages: [...(data.languages || []), '']
    };
    onChange(updated);
  };

  const updateLanguage = (index, value) => {
    const updated = {
      ...data,
      languages: data.languages.map((lang, i) => i === index ? value : lang)
    };
    onChange(updated);
  };

  const removeLanguage = (index) => {
    const updated = {
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    };
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <Code size={16} />
        技能和语言
      </h3>
      
      <div className="skills-section">
        <h4 className="subsection-title">技能</h4>
        {(data.technical || []).map((skill, index) => (
          <div key={index} className="array-item">
            <div className="array-item-header">
              <span className="array-item-title">技能 {index + 1}</span>
              <button
                className="btn-remove"
                onClick={() => removeTechnicalSkill(index)}
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>技能名称</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateTechnicalSkill(index, 'name', e.target.value)}
                  placeholder="如：SPSS"
                />
              </div>
              <div className="form-group">
                <label>熟练程度</label>
                <select
                  value={skill.level}
                  onChange={(e) => updateTechnicalSkill(index, 'level', e.target.value)}
                >
                  <option value="精通">精通</option>
                  <option value="熟练">熟练</option>
                  <option value="了解">了解</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button className="btn-add" onClick={addTechnicalSkill}>
          <Plus size={16} />
          添加技能
        </button>
      </div>
      
      <div className="skills-section">
        <h4 className="subsection-title">语言</h4>
        {(data.languages || []).map((language, index) => (
          <div key={index} className="array-item">
            <div className="array-item-header">
              <span className="array-item-title">语言 {index + 1}</span>
              <button
                className="btn-remove"
                onClick={() => removeLanguage(index)}
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="form-group">
              <label>语言证书</label>
              <input
                type="text"
                value={language}
                onChange={(e) => updateLanguage(index, e.target.value)}
                placeholder="如：CET-4, CET-6"
              />
            </div>
          </div>
        ))}
        
        <button className="btn-add" onClick={addLanguage}>
          <Plus size={16} />
          添加语言
        </button>
      </div>
    </div>
  );
};

export default SkillsEditor;
