from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import io
import sys
from contextlib import redirect_stdout

app = Flask(__name__)

# 生成示例数据的函数
def generate_sample_data(skill_id):
    if skill_id == 1:
        # 数据加载与查看
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, 30, 35, 40, 45],
            "city": ["北京", "上海", "广州", "深圳", "杭州"],
            "salary": [8000, 12000, 15000, 20000, 18000]
        }
    elif skill_id == 2:
        # 数据筛选与索引
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, 30, 35, 40, 45],
            "city": ["北京", "上海", "北京", "深圳", "北京"],
            "salary": [8000, 12000, 15000, 20000, 18000]
        }
    elif skill_id == 3:
        # 处理缺失值
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, np.nan, 35, 40, np.nan],
            "city": ["北京", "上海", np.nan, "深圳", "杭州"],
            "salary": [8000, 12000, np.nan, 20000, 18000]
        }
    elif skill_id == 4:
        # 数据分组与聚合
        data = {
            "city": ["北京", "上海", "北京", "深圳", "北京", "上海", "深圳"],
            "department": ["技术", "销售", "技术", "销售", "市场", "技术", "市场"],
            "salary": [8000, 12000, 15000, 20000, 18000, 10000, 16000]
        }
    elif skill_id == 5:
        # 数据合并与连接
        data1 = {
            "id": [1, 2, 3, 4, 5],
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "department": ["技术", "销售", "技术", "销售", "市场"]
        }
        data2 = {
            "id": [1, 2, 3, 6, 7],
            "salary": [8000, 12000, 15000, 20000, 18000],
            "city": ["北京", "上海", "北京", "深圳", "杭州"]
        }
        return pd.DataFrame(data1), pd.DataFrame(data2)
    elif skill_id == 6:
        # 新增与修改列
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "baseSalary": [8000, 12000, 15000, 20000, 18000],
            "bonusRate": [0.1, 0.15, 0.2, 0.25, 0.2]
        }
    elif skill_id == 7:
        # 数据排序与排名
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "chinese": [85, 92, 78, 95, 88],
            "math": [90, 85, 95, 88, 92],
            "english": [88, 90, 85, 92, 86]
        }
    elif skill_id == 8:
        # 字符串处理
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "email": ["zhangsan@example.com", "lisi@company.com", "wangwu@gmail.com", "zhaoliu@test.org", "qianqi@domain.net"],
            "phone": ["13812345678", "13987654321", "13712345678", "13687654321", "13512345678"]
        }
    elif skill_id == 9:
        # 时间序列基础
        dates = pd.date_range('2023-01-01', periods=10, freq='D')
        data = {
            "date": dates,
            "sales": np.random.randint(1000, 2200, size=10),
            "customers": np.random.randint(50, 85, size=10)
        }
    elif skill_id == 10:
        # 数据透视表
        data = {
            "date": pd.date_range('2023-01-01', periods=8, freq='D'),
            "city": ["北京", "上海", "广州", "深圳", "北京", "上海", "广州", "深圳"],
            "product": ["A", "B", "A", "C", "B", "A", "C", "B"],
            "sales": [1000, 1500, 1200, 1800, 1600, 1300, 1900, 1400],
            "profit": [200, 300, 240, 360, 320, 260, 380, 280]
        }
    return pd.DataFrame(data)

# 执行代码的函数
def execute_code(code, skill_id):
    try:
        # 准备执行环境
        local_vars = {}
        # 导入必要的库
        exec("import pandas as pd", local_vars)
        exec("import numpy as np", local_vars)
        
        # 生成示例数据
        if skill_id == 5:
            df1, df2 = generate_sample_data(skill_id)
            local_vars['df1'] = df1
            local_vars['df2'] = df2
        else:
            df = generate_sample_data(skill_id)
            local_vars['df'] = df
        
        # 捕获标准输出
        f = io.StringIO()
        with redirect_stdout(f):
            # 执行用户代码
            exec(code, local_vars)
        
        # 获取输出
        output = f.getvalue()
        
        # 获取最后一个表达式的结果
        last_line = code.strip().split('\n')[-1]
        if not last_line.strip().startswith('#') and last_line.strip():
            try:
                result = eval(last_line, local_vars)
                if isinstance(result, (pd.DataFrame, pd.Series)):
                    output += "\n" + result.to_string()
                else:
                    output += "\n" + str(result)
            except:
                pass
        
        return {
            "status": "success",
            "output": output
        }
    except Exception as e:
        return {
            "status": "error",
            "output": str(e)
        }

# 路由
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/execute', methods=['POST'])
def execute():
    data = request.json
    code = data.get('code', '')
    skill_id = data.get('skill_id', 1)
    result = execute_code(code, skill_id)
    return jsonify(result)

@app.route('/api/data/<int:skill_id>')
def get_data(skill_id):
    try:
        if skill_id == 5:
            df1, df2 = generate_sample_data(skill_id)
            return jsonify({
                "status": "success",
                "data1": df1.to_dict('records'),
                "data2": df2.to_dict('records')
            })
        else:
            df = generate_sample_data(skill_id)
            return jsonify({
                "status": "success",
                "data": df.to_dict('records')
            })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)