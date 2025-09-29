import React from 'react';
import PersonalInfoEditor from './PersonalInfoEditor';
import SectionManager from './SectionManager';
import SectionEditor from './SectionEditor';
import './ResumeEditor.css';

const ResumeEditor = ({ 
  resumeData, 
  updateResumeData, 
  updateSection, 
  addSection, 
  removeSection, 
  reorderSections 
}) => {
  return (
    <div className="editor-panel">
      <h2 className="editor-title">简历编辑器</h2>
      
      <PersonalInfoEditor
        data={resumeData.personalInfo}
        onChange={(data) => updateResumeData('personalInfo', data)}
      />
      
      <SectionManager
        sections={resumeData.sections}
        updateSection={updateSection}
        addSection={addSection}
        removeSection={removeSection}
        reorderSections={reorderSections}
      />
      
      {resumeData.sections
        .filter(section => section.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => (
          <SectionEditor
            key={section.id}
            section={section}
            onChange={(data) => updateResumeData(section.id, data)}
          />
        ))}
    </div>
  );
};

export default ResumeEditor;
