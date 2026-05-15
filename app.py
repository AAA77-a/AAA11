from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import io
import sys
import base64
from contextlib import redirect_stdout

app = Flask(__name__)
CORS(app, origins=["https://aaa11-eep.pages.dev", "http://localhost:8080", "http://127.0.0.1:8080"])

def generate_sample_data(skill_id):
    if skill_id == 1:
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, 30, 35, 40, 45],
            "city": ["北京", "上海", "北京", "深圳", "北京"],
            "salary": [8000, 12000, 15000, 20000, 18000]
        }
    elif skill_id == 2:
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, 30, 35, 40, 45],
            "city": ["北京", "上海", "北京", "深圳", "北京"],
            "salary": [8000, 12000, 15000, 20000, 18000]
        }
    elif skill_id == 3:
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "age": [25, np.nan, 35, 40, np.nan],
            "city": ["北京", "上海", np.nan, "深圳", "杭州"],
            "salary": [8000, 12000, np.nan, 20000, 18000]
        }
    elif skill_id == 4:
        data = {
            "city": ["北京", "上海", "北京", "深圳", "北京", "上海", "深圳"],
            "department": ["技术", "销售", "技术", "销售", "市场", "技术", "市场"],
            "salary": [8000, 12000, 15000, 20000, 18000, 10000, 16000]
        }
    elif skill_id == 5:
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
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "salary": [8000, 12000, 15000, 20000, 18000],
            "department": ["技术", "销售", "技术", "销售", "市场"]
        }
    elif skill_id == 7:
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "chinese": [85, 92, 78, 95, 88],
            "math": [90, 85, 95, 88, 92],
            "english": [88, 90, 85, 92, 86]
        }
    elif skill_id == 8:
        data = {
            "name": ["张三", "李四", "王五", "赵六", "钱七"],
            "email": ["zhangsan@example.com", "lisi@company.com", "wangwu@gmail.com", "zhaoliu@test.org", "qianqi@domain.net"],
            "phone": ["13812345678", "13987654321", "13712345678", "13687654321", "13512345678"]
        }
    elif skill_id == 9:
        dates = pd.date_range('2023-01-01', periods=10, freq='D')
        data = {
            "date": dates,
            "sales": [1200, 1500, 1800, 1300, 1600, 2000, 1700, 1400, 1900, 2100],
            "customers": [50, 60, 70, 55, 65, 80, 72, 58, 75, 85]
        }
    elif skill_id == 10:
        data = {
            "city": ["北京", "上海", "广州", "深圳", "北京", "上海", "广州", "深圳"],
            "product": ["A", "B", "A", "C", "B", "A", "C", "B"],
            "sales": [1000, 1500, 1200, 1800, 1600, 1300, 1900, 1400],
            "profit": [200, 300, 240, 360, 320, 260, 380, 280]
        }
    else:
        data = {
            "name": ["张三", "李四", "王五"],
            "value": [1, 2, 3]
        }
    return pd.DataFrame(data)

def execute_code(code, skill_id):
    try:
        local_vars = {}
        
        exec("import pandas as pd", local_vars)
        exec("import numpy as np", local_vars)
        exec("import matplotlib.pyplot as plt", local_vars)
        exec("import matplotlib", local_vars)
        local_vars['matplotlib'].use('Agg')
        
        if skill_id == 5:
            df1, df2 = generate_sample_data(skill_id)
            local_vars['df1'] = df1
            local_vars['df2'] = df2
        else:
            df = generate_sample_data(skill_id)
            local_vars['df'] = df
        
        f = io.StringIO()
        with redirect_stdout(f):
            exec(code, local_vars)
        
        output = f.getvalue()
        
        if 'plt' in local_vars:
            fig = local_vars['plt'].gcf()
            if fig.get_axes():
                buf = io.BytesIO()
                fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
                buf.seek(0)
                img_base64 = base64.b64encode(buf.read()).decode('utf-8')
                local_vars['plt'].close('all')
                return {
                    "status": "success",
                    "output": output if output else "图表已生成",
                    "image": img_base64
                }
        
        last_line = code.strip().split('\n')[-1]
        if not last_line.strip().startswith('#') and last_line.strip():
            try:
                result = eval(last_line, local_vars)
                if result is not None:
                    if isinstance(result, (pd.DataFrame, pd.Series)):
                        output += "\n" + result.to_string()
                    else:
                        output += "\n" + str(result)
            except:
                pass
        
        return {
            "status": "success",
            "output": output if output else "代码执行成功（无输出）"
        }
    except Exception as e:
        return {
            "status": "error",
            "output": str(e)
        }

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
    app.run(debug=True, host='0.0.0.0', port=8080)
