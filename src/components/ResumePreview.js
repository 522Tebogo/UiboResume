import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import './ResumePreview.css';

const ResumePreview = ({ resumeData }) => {
  const resumeRef = useRef(null);

  const renderSectionContent = (section) => {
    switch (section.type) {
      case 'summary':
        return <p className="summary-text">{section.data}</p>;
      
      case 'workExperience':
        return section.data && section.data.length > 0 ? section.data.map((work, index) => (
          <div key={work.id || index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title">
                <h3 className="company-name">{work.company}</h3>
                <div className="position">{work.position}</div>
              </div>
              <div className="experience-meta">
                <span className="date">{work.startDate}-{work.endDate}</span>
                <span className="location">{work.location}</span>
              </div>
            </div>
            {work.responsibilities && work.responsibilities.length > 0 && (
              <ul className="responsibilities">
                {work.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            )}
          </div>
        )) : <div>暂无工作经历</div>;
      
      case 'projectExperience':
        return section.data && section.data.length > 0 ? section.data.map((project, index) => (
          <div key={project.id || index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title">
                <h3 className="project-name">{project.title}</h3>
                <div className="role">{project.role}</div>
              </div>
              <div className="experience-meta">
                <span className="date">{project.startDate}-{project.endDate}</span>
                <span className="location">{project.location}</span>
              </div>
            </div>
            {project.responsibilities && project.responsibilities.length > 0 && (
              <ul className="responsibilities">
                {project.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            )}
          </div>
        )) : <div>暂无项目经历</div>;
      
      case 'organizationExperience':
        return section.data.map((org, index) => (
          <div key={org.id || index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title">
                <h3 className="organization-name">{org.organization}</h3>
                <div className="position">{org.position}</div>
              </div>
              <div className="experience-meta">
                <span className="date">{org.startDate}-{org.endDate}</span>
                <span className="location">{org.location}</span>
              </div>
            </div>
            {org.responsibilities && org.responsibilities.length > 0 && (
              <ul className="responsibilities">
                {org.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            )}
          </div>
        ));
      
      case 'honors':
        return (
          <div className="honors-list">
            {section.data.map((honor, index) => (
              <div key={index} className="honor-item">{honor}</div>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div>
            {section.data.technical && section.data.technical.length > 0 && (
              <div className="skills-group">
                <div className="skills-label">技能:</div>
                <ul className="skills-list">
                  {section.data.technical.map((skill, index) => (
                    <li key={index}>{skill.name}({skill.level})</li>
                  ))}
                </ul>
              </div>
            )}
            {section.data.languages && section.data.languages.length > 0 && (
              <div className="skills-group">
                <div className="skills-label">语言:</div>
                <ul className="skills-list">
                  {section.data.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      default:
        return <div>未知板块类型</div>;
    }
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('resume.pdf');
  };

  return (
    <div className="resume-preview">
      <div className="preview-controls">
        <button className="btn btn-primary" onClick={downloadPDF}>
          <Download size={16} />
          下载PDF
        </button>
      </div>
      
      <div className="resume" ref={resumeRef}>
        {/* 头部信息 */}
        <div className="resume-header">
          <div className="header-info">
            <h1 className="name">{resumeData.personalInfo.name}</h1>
            <div className="personal-details">
              {resumeData.personalInfo.gender && (
                <span className="detail-item">性别: {resumeData.personalInfo.gender}</span>
              )}
              {resumeData.personalInfo.age && (
                <span className="detail-item">年龄: {resumeData.personalInfo.age}</span>
              )}
            </div>
            <div className="contact-info">
              {resumeData.personalInfo.phone} | {resumeData.personalInfo.email}
            </div>
            {resumeData.personalInfo.jobIntention && (
              <div className="job-intention">
                求职意向: {resumeData.personalInfo.jobIntention}
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="github-link">
                GitHub: <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                  {resumeData.personalInfo.github}
                </a>
              </div>
            )}
          </div>
          {resumeData.personalInfo.avatar && (
            <div className="avatar">
              <img src={resumeData.personalInfo.avatar} alt="头像" />
            </div>
          )}
        </div>

        {/* 动态板块渲染 */}
        {resumeData.sections
          .filter(section => section.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            // 确保每个板块都有内容才渲染
            if (!section.data || (Array.isArray(section.data) && section.data.length === 0)) {
              return null;
            }
            
            return (
              <div key={section.id} className="section">
                <h2 className="section-title">{section.title}</h2>
                <div className="section-content">
                  {renderSectionContent(section)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ResumePreview;
