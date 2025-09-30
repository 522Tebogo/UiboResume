import React, { useState } from 'react';
import { Plus, Trash2, Edit3, GripVertical, Eye, EyeOff } from 'lucide-react';

const SectionManager = ({ 
  sections, 
  updateSection, 
  addSection, 
  removeSection, 
  reorderSections 
}) => {
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionType, setNewSectionType] = useState('summary');
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const sectionTypes = [
    { value: 'summary', label: '个人总结' },
    { value: 'workExperience', label: '工作经历' },
    { value: 'projectExperience', label: '项目经历' },
    { value: 'organizationExperience', label: '社团经历' },
    { value: 'honors', label: '荣誉奖项' },
    { value: 'skills', label: '教育经历' }
  ];

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      addSection(newSectionType, newSectionTitle.trim());
      setNewSectionTitle('');
    }
  };

  const handleEditTitle = (sectionId, newTitle) => {
    updateSection(sectionId, { title: newTitle });
    setEditingSection(null);
  };

  const handleToggleVisibility = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    updateSection(sectionId, { visible: !section.visible });
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      reorderSections(dragIndex, dropIndex);
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="section-manager">
      <h3 className="section-title">
        <GripVertical size={16} />
        板块管理
      </h3>

      {/* 添加新板块 */}
      <div className="add-section-form">
        <div className="form-row">
          <div className="form-group">
            <label>板块类型</label>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value)}
            >
              {sectionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>板块标题</label>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="请输入板块标题"
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleAddSection}>
          <Plus size={16} />
          添加板块
        </button>
      </div>

      {/* 板块列表 */}
      <div className="sections-list">
        {sortedSections.map((section, index) => (
          <div
            key={section.id}
            className={`section-item ${!section.visible ? 'hidden' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className="section-item-header">
              <div className="section-item-info">
                <div className="section-item-title">
                  {editingSection === section.id ? (
                    <input
                      type="text"
                      defaultValue={section.title}
                      onBlur={(e) => handleEditTitle(section.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleEditTitle(section.id, e.target.value);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span>{section.title}</span>
                  )}
                </div>
                <div className="section-item-type">
                  {sectionTypes.find(t => t.value === section.type)?.label}
                </div>
              </div>
              
              <div className="section-item-actions">
                <button
                  className="btn-icon"
                  onClick={() => setEditingSection(section.id)}
                  title="编辑标题"
                >
                  <Edit3 size={14} />
                </button>
                
                <button
                  className="btn-icon"
                  onClick={() => handleToggleVisibility(section.id)}
                  title={section.visible ? '隐藏板块' : '显示板块'}
                >
                  {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                
                <button
                  className="btn-icon btn-danger"
                  onClick={() => removeSection(section.id)}
                  title="删除板块"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="section-item-content">
              <div className="drag-handle">
                <GripVertical size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedSections.length === 0 && (
        <div className="empty-state">
          <p>暂无板块，请添加第一个板块</p>
        </div>
      )}
    </div>
  );
};

export default SectionManager;
