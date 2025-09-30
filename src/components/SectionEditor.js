import React from 'react';
import SummaryEditor from './SummaryEditor';
import WorkExperienceEditor from './WorkExperienceEditor';
import ProjectExperienceEditor from './ProjectExperienceEditor';
import OrganizationExperienceEditor from './OrganizationExperienceEditor';
import HonorsEditor from './HonorsEditor';
import EducationExperienceEditor from './EducationExperienceEditor';

const SectionEditor = ({ section, onChange }) => {
  const renderEditor = () => {
    switch (section.type) {
      case 'summary':
        return (
          <SummaryEditor
            data={section.data}
            onChange={onChange}
          />
        );
      case 'workExperience':
        return (
          <WorkExperienceEditor
            data={section.data}
            onChange={onChange}
          />
        );
      case 'projectExperience':
        return (
          <ProjectExperienceEditor
            data={section.data}
            onChange={onChange}
          />
        );
      case 'organizationExperience':
        return (
          <OrganizationExperienceEditor
            data={section.data}
            onChange={onChange}
          />
        );
      case 'honors':
        return (
          <HonorsEditor
            data={section.data}
            onChange={onChange}
          />
        );
      case 'skills':
        return (
          <EducationExperienceEditor
            data={section.data}
            onChange={onChange}
          />
        );
      default:
        return <div>未知板块类型</div>;
    }
  };

  return (
    <div className="section-editor">
      <h3 className="section-title">{section.title}</h3>
      {renderEditor()}
    </div>
  );
};

export default SectionEditor;
