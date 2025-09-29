// 测试项目设置
const fs = require('fs');
const path = require('path');

console.log('🔍 检查项目文件结构...\n');

const requiredFiles = [
  'package.json',
  'public/index.html',
  'src/index.js',
  'src/App.js',
  'src/components/ResumePreview.js',
  'src/components/ResumeEditor.js'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

console.log('\n📦 检查依赖包...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  console.log(`✅ 找到 ${dependencies.length} 个依赖包`);
  dependencies.forEach(dep => {
    console.log(`   - ${dep}`);
  });
} catch (error) {
  console.log('❌ 无法读取 package.json');
}

console.log('\n🎯 项目状态:');
if (allFilesExist) {
  console.log('✅ 所有必需文件都存在');
  console.log('✅ 项目结构完整');
  console.log('✅ 可以运行 npm start 启动项目');
} else {
  console.log('❌ 缺少一些文件');
}

console.log('\n📋 使用说明:');
console.log('1. 运行 npm install 安装依赖');
console.log('2. 运行 npm start 启动开发服务器');
console.log('3. 在浏览器中打开 http://localhost:3000');
console.log('4. 开始编辑您的简历！');
