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

            {/* 项目背景 */}
            {project.background && (
              <div className="project-block">
                <div className="block-label">项目背景</div>
                <p className="project-background">{project.background}</p>
              </div>
            )}

            {/* 项目职责 */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="project-block">
                <div className="block-label">项目职责</div>
                <ul className="responsibilities">
                  {project.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 技术栈/功能（两点） */}
            {project.techPoints && project.techPoints.filter(Boolean).length > 0 && (
              <div className="project-block">
                <div className="block-label">技术栈/功能</div>
                <ul className="responsibilities">
                  {project.techPoints.slice(0, 2).filter(Boolean).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
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
        // 用于显示教育经历
        return section.data && section.data.length > 0 ? section.data.map((edu, index) => (
          <div key={edu.id || index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title">
                <h3 className="company-name">{edu.school}</h3>
                <div className="position">{edu.degree}{edu.major ? ` · ${edu.major}` : ''}</div>
              </div>
              <div className="experience-meta">
                <span className="date">{edu.startDate}-{edu.endDate}</span>
                <span className="location">{edu.location}</span>
              </div>
            </div>
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="responsibilities">
                {edu.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        )) : <div>暂无教育经历</div>;
      
      default:
        return <div>未知板块类型</div>;
    }
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    // 展开滚动区域，按实际尺寸渲染
    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    const canvas = await html2canvas(element, {
      // 使用较高 DPI 获取更清晰的导出效果
      scale: Math.max(2, window.devicePixelRatio || 1),
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    // 还原样式
    element.style.overflow = originalOverflow;
    element.style.height = originalHeight;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 以页面宽度为基准，等比缩放图片，保证版式与预览一致
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yOffset = 0;
    let remaining = imgHeight;

    // 首页
    pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
    remaining -= pageHeight;

    // 分页追加（通过上移 y 值避免横向缩放差异）
    while (remaining > 0) {
      yOffset = remaining - imgHeight; // 负值，向上偏移
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
      remaining -= pageHeight;
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
              <img
                src={resumeData.personalInfo.avatar}
                alt="头像"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // 如果跨域失败仍可正常显示于页面，但导出受限
                  e.currentTarget.crossOrigin = null;
                }}
              />
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
