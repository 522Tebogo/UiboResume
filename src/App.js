import React, { useState, useCallback, useEffect } from 'react';
import ResumePreview from './components/ResumePreview';
import SaveStatus from './components/SaveStatus';
import ThemeSelector from './components/ThemeSelector';
import PersonalInfoEditor from './components/PersonalInfoEditor';
import SectionManager from './components/SectionManager';
import SectionEditor from './components/SectionEditor';
import useAutoSave from './hooks/useAutoSave';
import useDataRecovery from './hooks/useDataRecovery';
import { initTheme } from './utils/themes';
import './App.css';

const initialResumeData = {
  personalInfo: {
    name: '陈媛媛Abbey',
    gender: '女',
    age: '25',
    phone: '188-8888-8888',
    email: 'abbey@wondercv.com',
    jobIntention: '前端开发工程师',
    github: 'https://github.com/username',
    avatar: ''
  },
  sections: [
    {
      id: 'summary',
      type: 'summary',
      title: '个人总结',
      visible: true,
      order: 1,
      data: '我是一名具有扎实学术背景和丰富研究经验的研究生。在学术研究方面，我具备良好的文献检索和分析能力，能够独立完成科研项目的设计和实施。在数据分析方面，我熟练掌握SPSS、SAS、R等统计软件，能够进行复杂的数据处理和统计分析。在团队协作方面，我具备良好的沟通能力和团队合作精神，能够与不同背景的同事有效合作。我热爱科研工作，希望在未来的职业生涯中继续在学术研究领域发展，为科学进步贡献自己的力量。'
    },
    {
      id: 'work',
      type: 'workExperience',
      title: '工作经历',
      visible: true,
      order: 2,
      data: [
        {
          id: 1,
          company: '超级公司',
          position: '科研助理 实验室',
          startDate: '2025年01月',
          endDate: '2025年12月',
          location: '北京',
          responsibilities: [
            '负责文献检索和资料整理，为研究项目提供理论支持',
            '协助进行数据收集和分析，确保数据的准确性和完整性',
            '参与实验设计和操作，记录实验数据和结果',
            '协助撰写研究报告和学术论文，参与学术讨论和交流',
            '维护实验室设备和环境，确保实验的顺利进行'
          ]
        }
      ]
    },
    {
      id: 'project',
      type: 'projectExperience',
      title: '项目经历',
      visible: true,
      order: 3,
      data: [
        {
          id: 1,
          title: 'XXX疾病的分子机制研究',
          role: '负责人',
          startDate: '2025年01月',
          endDate: '2025年12月',
          location: '北京',
          responsibilities: [
            '负责文献调研和资料收集，深入了解疾病研究现状',
            '设计研究方案和实验流程，制定详细的研究计划',
            '组织研究团队，协调各方资源，确保项目顺利进行',
            '进行实验操作和数据分析，记录和整理研究结果',
            '撰写研究报告和学术论文，参与学术交流和讨论',
            '与合作伙伴保持密切联系，协调研究进展'
          ]
        },
        {
          id: 2,
          title: 'YYY药物的临床疗效研究',
          role: '参与者',
          startDate: '2025年01月',
          endDate: '2025年12月',
          location: '北京',
          responsibilities: [
            '协助收集和整理临床数据，确保数据的完整性和准确性',
            '进行数据分析和统计分析，评估药物的疗效和安全性',
            '参与疗效和安全性评估，为研究结论提供数据支持',
            '协助撰写研究报告，参与学术讨论和交流',
            '与临床医生保持密切沟通，了解临床实践情况'
          ]
        }
      ]
    },
    {
      id: 'organization',
      type: 'organizationExperience',
      title: '社团和组织经历',
      visible: true,
      order: 4,
      data: [
        {
          id: 1,
          organization: '学生会',
          position: '学术部部长 学术部',
          startDate: '2025年01月',
          endDate: '2025年12月',
          location: '北京',
          responsibilities: [
            '负责学术部的日常运营和管理，制定部门工作计划',
            '组织和策划各类学术讲座和研讨会，提升学生学术水平',
            '协调各部门工作，促进学生会内部合作与交流',
            '负责学术活动的宣传和推广，扩大活动影响力',
            '维护学术部与学校各部门的良好关系'
          ]
        },
        {
          id: 2,
          organization: '科研协会',
          position: '会员 会员部',
          startDate: '2025年01月',
          endDate: '2025年12月',
          location: '北京',
          responsibilities: [
            '积极参与协会组织的各类学术活动和交流会议',
            '关注科研前沿动态，了解最新研究趋势和发展方向',
            '协助组织学术讲座和研讨会，促进学术交流',
            '参与协会项目的策划和实施，为协会发展贡献力量',
            '积极宣传协会活动，扩大协会影响力'
          ]
        }
      ]
    },
    {
      id: 'honors',
      type: 'honors',
      title: '荣誉奖项',
      visible: true,
      order: 5,
      data: [
        '国家奖学金',
        '优秀学生干部'
      ]
    },
    {
      id: 'skills',
      type: 'skills',
      title: '其他',
      visible: true,
      order: 6,
      data: {
        technical: [
          { name: 'SPSS', level: '精通' },
          { name: 'SAS', level: '熟练' },
          { name: 'R', level: '熟练' }
        ],
        languages: [
          'CET-4',
          'CET-6'
        ]
      }
    }
  ]
};

function App() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [, setCurrentTheme] = useState(null);

  // 初始化主题
  useEffect(() => {
    const theme = initTheme();
    setCurrentTheme(theme);
  }, []);

  // 数据恢复
  const handleDataLoaded = useCallback((loadedData) => {
    setResumeData(loadedData);
    console.log('✅ 简历数据已恢复');
  }, []);

  const {
    exportData,
    importData
  } = useDataRecovery(initialResumeData, handleDataLoaded);

  // 自动保存
  const handleSave = useCallback((data) => {
    setLastSaved(new Date().toISOString());
    setSaveError(null);
    console.log('✅ 数据已自动保存');
  }, []);

  const handleSaveError = useCallback((error) => {
    setSaveError(error.message);
    console.error('❌ 自动保存失败:', error);
  }, []);

  useAutoSave(resumeData, {
    enabled: true,
    onSave: handleSave,
    onError: handleSaveError
  });

  const updateResumeData = (section, data) => {
    if (section === 'personalInfo') {
      setResumeData(prev => ({
        ...prev,
        personalInfo: data
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        sections: prev.sections.map(s => 
          s.id === section ? { ...s, data } : s
        )
      }));
    }
  };

  const updateSection = (sectionId, updates) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId ? { ...s, ...updates } : s
      )
    }));
  };

  const addSection = (type, title) => {
    const newSection = {
      id: `section_${Date.now()}`,
      type,
      title,
      visible: true,
      order: Math.max(...resumeData.sections.map(s => s.order)) + 1,
      data: getDefaultDataForType(type)
    };
    
    setResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const removeSection = (sectionId) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const reorderSections = (fromIndex, toIndex) => {
    setResumeData(prev => {
      const newSections = [...prev.sections];
      const [movedSection] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, movedSection);
      
      // 更新order
      newSections.forEach((section, index) => {
        section.order = index + 1;
      });
      
      return {
        ...prev,
        sections: newSections
      };
    });
  };

  const getDefaultDataForType = (type) => {
    switch (type) {
      case 'summary':
        return '';
      case 'workExperience':
      case 'projectExperience':
      case 'organizationExperience':
        return [];
      case 'honors':
        return [];
      case 'skills':
        return { technical: [], languages: [] };
      default:
        return '';
    }
  };

  // 处理数据导入
  const handleImport = async (file) => {
    try {
      const importedData = await importData(file);
      setResumeData(importedData);
      console.log('✅ 数据导入成功');
    } catch (error) {
      console.error('❌ 数据导入失败:', error);
      alert('数据导入失败: ' + error.message);
    }
  };

  return (
    <div className="app">
        <SaveStatus
          lastSaved={lastSaved}
          hasError={!!saveError}
          onExport={exportData}
          onImport={handleImport}
        />
      
      <div className="main-content">
        <div className="editor-panel">
          <div className="editor-header">
            <h2 className="editor-title">简历编辑器</h2>
            <ThemeSelector onThemeChange={setCurrentTheme} />
          </div>
          
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
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}

export default App;
