import React from 'react';

const TestApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        UIBO简历 - 测试页面
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          width: '400px', 
          backgroundColor: '#f8f9fa', 
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h2>编辑器区域</h2>
          <p>这里应该显示简历编辑器</p>
        </div>
        
        <div style={{ 
          flex: 1, 
          backgroundColor: 'white', 
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h2>预览区域</h2>
          <p>这里应该显示简历预览</p>
        </div>
      </div>
      
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <p>保存状态区域</p>
      </div>
    </div>
  );
};

export default TestApp;
