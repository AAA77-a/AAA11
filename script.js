// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化显示第一个知识点
    loadSkill(1);
    
    // 知识点切换事件
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            const skillId = parseInt(this.dataset.skill);
            loadSkill(skillId);
            
            // 更新活跃状态
            document.querySelectorAll('.skill-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 模式切换事件
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchMode(mode);
            
            // 更新活跃状态
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 测试模式按钮事件
    document.getElementById('run-btn').addEventListener('click', runTest);
    document.getElementById('reset-btn').addEventListener('click', resetTest);
    document.getElementById('hint-btn').addEventListener('click', showHint);
});

// 加载知识点
function loadSkill(skillId) {
    const skill = skillData[skillId];
    if (!skill) return;
    
    // 更新标题
    document.getElementById('skill-title').textContent = `知识点 ${skillId}：${skill.title}`;
    
    // 渲染训练模式内容
    renderTrainMode(skill, skillId);
    
    // 渲染测试模式内容
    renderTestMode(skill, skillId);
    
    // 默认显示训练模式
    switchMode('train');
}

// 渲染训练模式
function renderTrainMode(skill, skillId) {
    // 渲染数据表格
    const trainDataElement = document.getElementById('train-data');
    if (skillId === 5) {
        // 特殊处理数据合并与连接
        trainDataElement.innerHTML = `
            <h4>数据框 1：</h4>
            ${renderTable(skill.data1)}
            <h4 style="margin-top: 20px;">数据框 2：</h4>
            ${renderTable(skill.data2)}
        `;
    } else {
        trainDataElement.innerHTML = renderTable(skill.data);
    }
    
    // 渲染代码示例
    document.getElementById('train-code').textContent = skill.trainCode;
    
    // 渲染运行结果
    document.getElementById('train-result').textContent = skill.trainResult;
}

// 渲染测试模式
function renderTestMode(skill, skillId) {
    // 渲染数据表格
    const testDataElement = document.getElementById('test-data');
    if (skillId === 5) {
        // 特殊处理数据合并与连接
        testDataElement.innerHTML = `
            <h4>数据框 1：</h4>
            ${renderTable(skill.data1)}
            <h4 style="margin-top: 20px;">数据框 2：</h4>
            ${renderTable(skill.data2)}
        `;
    } else {
        testDataElement.innerHTML = renderTable(skill.data);
    }
    
    // 渲染测试任务
    document.getElementById('test-task').textContent = skill.testTask;
    
    // 清空代码输入框
    document.getElementById('code-input').value = '';
    
    // 清空测试结果
    document.getElementById('test-result').innerHTML = '';
    document.getElementById('test-result').className = 'test-result';
}

// 切换模式
function switchMode(mode) {
    const trainContent = document.querySelector('.train-content');
    const testContent = document.querySelector('.test-content');
    
    if (mode === 'train') {
        trainContent.style.display = 'block';
        testContent.style.display = 'none';
    } else {
        trainContent.style.display = 'none';
        testContent.style.display = 'block';
    }
}

// 渲染表格
function renderTable(data) {
    if (!data || data.length === 0) return '<p>无数据</p>';
    
    const headers = Object.keys(data[0]);
    let tableHtml = '<table>';
    
    // 表头
    tableHtml += '<thead><tr>';
    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead>';
    
    // 表体
    tableHtml += '<tbody>';
    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            const value = row[header] === null ? 'NaN' : row[header];
            tableHtml += `<td>${value}</td>`;
        });
        tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
    
    return tableHtml;
}

// 运行测试
function runTest() {
    const skillId = parseInt(document.querySelector('.skill-item.active').dataset.skill);
    const skill = skillData[skillId];
    const userCode = document.getElementById('code-input').value;
    const testResultElement = document.getElementById('test-result');
    
    if (!userCode.trim()) {
        testResultElement.className = 'test-result error';
        testResultElement.textContent = '❌ 请输入代码！';
        return;
    }
    
    // 简单的代码验证（实际环境中应该使用更安全的方法）
    const expectedCode = skill.expectedCode;
    const normalizedUserCode = userCode.trim().replace(/\s+/g, ' ');
    const normalizedExpectedCode = expectedCode.trim().replace(/\s+/g, ' ');
    
    // 模拟代码执行结果验证
    if (normalizedUserCode.includes(normalizedExpectedCode)) {
        testResultElement.className = 'test-result success';
        testResultElement.textContent = '✅ 测试成功！结果正确';
    } else {
        testResultElement.className = 'test-result error';
        testResultElement.textContent = '❌ 测试失败！结果与预期不符';
    }
}

// 重置测试
function resetTest() {
    document.getElementById('code-input').value = '';
    const testResultElement = document.getElementById('test-result');
    testResultElement.innerHTML = '';
    testResultElement.className = 'test-result';
}

// 显示提示
function showHint() {
    const skillId = parseInt(document.querySelector('.skill-item.active').dataset.skill);
    const skill = skillData[skillId];
    const testResultElement = document.getElementById('test-result');
    
    testResultElement.className = 'test-result';
    testResultElement.innerHTML = `<p>提示：使用 Pandas 相关函数完成任务</p><p>示例：${skill.expectedCode.split('\n')[0]}</p>`;
}