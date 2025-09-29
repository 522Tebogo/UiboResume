import React from 'react';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';

const ProjectExperienceEditor = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: ['']
    };
    onChange([...data, newProject]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateResponsibility = (projIndex, respIndex, value) => {
    const updated = [...data];
    updated[projIndex].responsibilities[respIndex] = value;
    onChange(updated);
  };

  const addResponsibility = (projIndex) => {
    const updated = [...data];
    updated[projIndex].responsibilities.push('');
    onChange(updated);
  };

  const removeResponsibility = (projIndex, respIndex) => {
    const updated = [...data];
    updated[projIndex].responsibilities.splice(respIndex, 1);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <FolderOpen size={16} />
        项目经历
      </h3>
      
      {data.map((project, index) => (
        <div key={project.id} className="array-item">
          <div className="array-item-header">
            <span className="array-item-title">项目 {index + 1}</span>
            <button
              className="btn-remove"
              onClick={() => removeProject(index)}
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="form-group">
            <label>项目名称</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(index, 'title', e.target.value)}
              placeholder="请输入项目名称"
            />
          </div>
          
          <div className="form-group">
            <label>担任角色</label>
            <input
              type="text"
              value={project.role}
              onChange={(e) => updateProject(index, 'role', e.target.value)}
              placeholder="如：负责人、参与者"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>开始时间</label>
              <input
                type="text"
                value={project.startDate}
                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                placeholder="如：2023年01月"
              />
            </div>
            <div className="form-group">
              <label>结束时间</label>
              <input
                type="text"
                value={project.endDate}
                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                placeholder="如：2023年12月"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>项目地点</label>
            <input
              type="text"
              value={project.location}
              onChange={(e) => updateProject(index, 'location', e.target.value)}
              placeholder="请输入项目地点"
            />
          </div>
          
          <div className="form-group">
            <label>项目职责</label>
            {project.responsibilities.map((responsibility, respIndex) => (
              <div key={respIndex} className="responsibility-item">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                  placeholder="请输入项目职责"
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
      
      <button className="btn-add" onClick={addProject}>
        <Plus size={16} />
        添加项目经历
      </button>
    </div>
  );
};

export default ProjectExperienceEditor;
