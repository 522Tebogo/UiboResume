import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';

const OrganizationExperienceEditor = ({ data, onChange }) => {
  const addOrganization = () => {
    const newOrganization = {
      id: Date.now(),
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: ['']
    };
    onChange([...data, newOrganization]);
  };

  const updateOrganization = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeOrganization = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateResponsibility = (orgIndex, respIndex, value) => {
    const updated = [...data];
    updated[orgIndex].responsibilities[respIndex] = value;
    onChange(updated);
  };

  const addResponsibility = (orgIndex) => {
    const updated = [...data];
    updated[orgIndex].responsibilities.push('');
    onChange(updated);
  };

  const removeResponsibility = (orgIndex, respIndex) => {
    const updated = [...data];
    updated[orgIndex].responsibilities.splice(respIndex, 1);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <Users size={16} />
        社团和组织经历
      </h3>
      
      {data.map((organization, index) => (
        <div key={organization.id} className="array-item">
          <div className="array-item-header">
            <span className="array-item-title">组织 {index + 1}</span>
            <button
              className="btn-remove"
              onClick={() => removeOrganization(index)}
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="form-group">
            <label>组织名称</label>
            <input
              type="text"
              value={organization.organization}
              onChange={(e) => updateOrganization(index, 'organization', e.target.value)}
              placeholder="请输入组织名称"
            />
          </div>
          
          <div className="form-group">
            <label>担任职位</label>
            <input
              type="text"
              value={organization.position}
              onChange={(e) => updateOrganization(index, 'position', e.target.value)}
              placeholder="请输入担任职位"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>开始时间</label>
              <input
                type="text"
                value={organization.startDate}
                onChange={(e) => updateOrganization(index, 'startDate', e.target.value)}
                placeholder="如：2023年01月"
              />
            </div>
            <div className="form-group">
              <label>结束时间</label>
              <input
                type="text"
                value={organization.endDate}
                onChange={(e) => updateOrganization(index, 'endDate', e.target.value)}
                placeholder="如：2023年12月"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>地点</label>
            <input
              type="text"
              value={organization.location}
              onChange={(e) => updateOrganization(index, 'location', e.target.value)}
              placeholder="请输入地点"
            />
          </div>
          
          <div className="form-group">
            <label>工作职责</label>
            {organization.responsibilities.map((responsibility, respIndex) => (
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
      
      <button className="btn-add" onClick={addOrganization}>
        <Plus size={16} />
        添加组织经历
      </button>
    </div>
  );
};

export default OrganizationExperienceEditor;
