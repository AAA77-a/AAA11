# Pandas 实战训练营：十项核心技能

一个基于 Streamlit 的 Pandas 数据分析交互式学习网站，帮助初学者掌握 Pandas 的核心技能。

## 技术栈
- **前端框架**：Streamlit
- **数据处理**：Pandas
- **开发语言**：Python 3.8+

## 功能特点
- **十个核心知识点**：涵盖数据加载、筛选、处理缺失值、分组聚合等 Pandas 核心技能
- **两种学习模式**：训练模式（展示代码示例和运行结果）和测试模式（用户编写代码并验证）
- **交互式界面**：简洁清晰的布局，适合初学者学习
- **实时反馈**：测试模式下即时验证代码结果

## 安装与运行

### 1. 克隆项目
```bash
git clone <repository-url>
cd pandas-training-camp
```

### 2. 安装依赖
```bash
pip install -r requirements.txt
```

### 3. 启动应用
```bash
streamlit run app.py
```

### 4. 访问应用
打开浏览器，访问 `http://localhost:8501`

## 知识点列表
1. **数据加载与查看**：`pd.read_csv()`、`df.head()`、`df.info()`
2. **数据筛选与索引**：`loc`、`iloc`、条件筛选
3. **处理缺失值**：`isnull()`、`dropna()`、`fillna()`
4. **数据分组与聚合**：`groupby()`、`mean()`、`sum()`、`count()`
5. **数据合并与连接**：`pd.merge()`、`pd.concat()`
6. **新增与修改列**：列赋值、`apply()` 函数
7. **数据排序与排名**：`sort_values()`、`rank()`
8. **字符串处理**：`.str` 方法、正则表达式
9. **时间序列基础**：`pd.to_datetime()`、`resample()`
10. **数据透视表**：`pd.pivot_table()`

## 使用指南
1. 在左侧导航栏选择要学习的知识点
2. 在训练模式下查看代码示例和运行结果
3. 在测试模式下编写代码并点击"运行测试"按钮验证
4. 点击"重置"按钮清空代码输入框
5. 点击"显示提示"按钮获取帮助信息

## 注意事项
- 测试模式下的代码执行在安全沙箱环境中运行
- 仅支持 Pandas 和 NumPy 模块的导入
- 确保已安装 Python 3.8 或更高版本

## 贡献
欢迎提交 Issue 和 Pull Request 来改进这个项目！