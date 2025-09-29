import React from 'react';
import { User, Image } from 'lucide-react';

const PersonalInfoEditor = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="editor-section">
      <h3 className="section-title">
        <User size={16} />
        个人信息
      </h3>
      
      <div className="form-group">
        <label>姓名</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="请输入姓名"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>性别</label>
          <select
            value={data.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="其他">其他</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>年龄</label>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="年龄"
            min="16"
            max="100"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>电话</label>
        <input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="请输入电话号码"
        />
      </div>
      
      <div className="form-group">
        <label>邮箱</label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="请输入邮箱地址"
        />
      </div>

      <div className="form-group">
        <label>求职意向</label>
        <input
          type="text"
          value={data.jobIntention || ''}
          onChange={(e) => handleChange('jobIntention', e.target.value)}
          placeholder="请输入求职意向"
        />
      </div>

      <div className="form-group">
        <label>GitHub (可选)</label>
        <input
          type="url"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="https://github.com/username"
        />
      </div>
      
      <div className="form-group">
        <label>头像</label>
        <div className="avatar-upload">
          {data.avatar && (
            <div className="avatar-preview">
              <img src={data.avatar} alt="头像预览" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            id="avatar-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar-upload" className="btn btn-secondary avatar-upload-btn">
            <Image size={16} />
            选择头像
          </label>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoEditor;
