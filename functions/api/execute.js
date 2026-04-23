export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const data = await request.json();
    const code = data.code;
    const skillId = data.skill_id;
    
    // 模拟代码执行结果
    const result = executeCode(code, skillId);
    
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      output: error.message
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

function executeCode(code, skillId) {
  // 模拟代码执行结果
  // 这里只是简单的模拟，实际生产环境中应该使用安全的代码执行环境
  
  // 处理不同技能的代码执行
  if (skillId === 1) {
    // 数据加载与查看
    if (code.includes('df.head()')) {
      return {
        status: "success",
        output: "   name  age city  salary\n0   张三   25  北京    8000\n1   李四   30  上海   12000\n2   王五   35  广州   15000\n3   赵六   40  深圳   20000\n4   钱七   45  杭州   18000"
      };
    } else if (code.includes('df.info()')) {
      return {
        status: "success",
        output: "<class 'pandas.core.frame.DataFrame'>\nRangeIndex: 5 entries, 0 to 4\nData columns (total 4 columns):\n #   Column  Non-Null Count  Dtype\n---  ------  --------------  -----\n 0   name    5 non-null      object\n 1   age     5 non-null      int64\n 2   city    5 non-null      object\n 3   salary  5 non-null      int64\ndtypes: int64(2), object(2)\nmemory usage: 288.0+ bytes"
      };
    }
  } else if (skillId === 2) {
    // 数据筛选与索引
    if (code.includes('df.loc[df[\'age\'] > 30]')) {
      return {
        status: "success",
        output: "   name  age city  salary\n2   王五   35  北京   15000\n3   赵六   40  深圳   20000\n4   钱七   45  北京   18000"
      };
    } else if (code.includes('df.iloc[0:3, 0:2]')) {
      return {
        status: "success",
        output: "   name  age\n0   张三   25\n1   李四   30\n2   王五   35"
      };
    }
  } else if (skillId === 3) {
    // 处理缺失值
    if (code.includes('df.isnull().sum()')) {
      return {
        status: "success",
        output: "age      2\ncity     1\nsalary   1\ndtype: int64"
      };
    }
  } else if (skillId === 4) {
    // 数据分组与聚合
    if (code.includes('df.groupby(\'city\')[\'salary\'].mean()')) {
      return {
        status: "success",
        output: "city\n北京    13666.666667\n上海    11000.000000\n深圳    18000.000000\nName: salary, dtype: float64"
      };
    }
  } else if (skillId === 5) {
    // 数据合并与连接
    if (code.includes('pd.merge(df1, df2, on=\'id\', how=\'inner\')')) {
      return {
        status: "success",
        output: "   id name department  salary city\n0   1  张三         技术    8000  北京\n1   2  李四         销售   12000  上海\n2   3  王五         技术   15000  北京"
      };
    }
  } else if (skillId === 6) {
    // 新增与修改列
    if (code.includes('df[\'bonus\'] = df[\'baseSalary\'] * df[\'bonusRate\']')) {
      return {
        status: "success",
        output: "   name  baseSalary  bonusRate   bonus\n0   张三        8000        0.1   800.0\n1   李四       12000        0.15  1800.0\n2   王五       15000        0.2   3000.0\n3   赵六       20000        0.25  5000.0\n4   钱七       18000        0.2   3600.0"
      };
    }
  } else if (skillId === 7) {
    // 数据排序与排名
    if (code.includes('df.sort_values(\'math\', ascending=False)')) {
      return {
        status: "success",
        output: "   name  chinese  math  english\n2   王五       78    95       85\n4   钱七       88    92       86\n0   张三       85    90       88\n3   赵六       95    88       92\n1   李四       92    85       90"
      };
    }
  } else if (skillId === 8) {
    // 字符串处理
    if (code.includes('df[\'email\'].str.split(\'@\').str[0]')) {
      return {
        status: "success",
        output: "0    zhangsan\n1        lisi\n2      wangwu\n3     zhaoliu\n4      qianqi\nName: email, dtype: object"
      };
    }
  } else if (skillId === 9) {
    // 时间序列基础
    if (code.includes('df.resample(\'M\', on=\'date\')[\'sales\'].sum()')) {
      return {
        status: "success",
        output: "date\n2023-01-31    16100\nFreq: M, Name: sales, dtype: int64"
      };
    }
  } else if (skillId === 10) {
    // 数据透视表
    if (code.includes('pd.pivot_table(df, values=\'sales\', index=\'city\', columns=\'product\', aggfunc=\'mean\')')) {
      return {
        status: "success",
        output: "product      A      B      C\ncity\n北京     1000.0  1600.0    NaN\n上海     1300.0  1500.0    NaN\n广州     1200.0    NaN  1900.0\n深圳       NaN  1400.0  1800.0"
      };
    }
  }
  
  // 默认返回
  return {
    status: "success",
    output: "代码执行成功！\n" + code
  };
}