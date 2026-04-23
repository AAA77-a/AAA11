// 知识点数据
const skillData = {
    1: {
        title: "数据加载与查看",
        data: [
            { name: "张三", age: 25, city: "北京", salary: 8000 },
            { name: "李四", age: 30, city: "上海", salary: 12000 },
            { name: "王五", age: 35, city: "广州", salary: 15000 },
            { name: "赵六", age: 40, city: "深圳", salary: 20000 },
            { name: "钱七", age: 45, city: "杭州", salary: 18000 }
        ],
        trainCode: `# 导入 pandas
import pandas as pd

# 读取 CSV 文件（示例）
df = pd.read_csv('data.csv')

# 查看前 5 行
df.head()

# 查看数据信息
df.info()`,
        trainResult: `前 5 行：
   name  age city  salary
0   张三   25  北京    8000
1   李四   30  上海   12000
2   王五   35  广州   15000
3   赵六   40  深圳   20000
4   钱七   45  杭州   18000

数据信息：
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   name    5 non-null      object
 1   age     5 non-null      int64
 2   city    5 non-null      object
 3   salary  5 non-null      int64
dtypes: int64(2), object(2)
memory usage: 288.0+ bytes`,
        testTask: "写出查看数据前 3 行的代码",
        expectedCode: "df.head(3)"
    },
    2: {
        title: "数据筛选与索引",
        data: [
            { name: "张三", age: 25, city: "北京", salary: 8000 },
            { name: "李四", age: 30, city: "上海", salary: 12000 },
            { name: "王五", age: 35, city: "北京", salary: 15000 },
            { name: "赵六", age: 40, city: "深圳", salary: 20000 },
            { name: "钱七", age: 45, city: "北京", salary: 18000 }
        ],
        trainCode: `# 使用 loc 基于标签筛选
df.loc[df['age'] > 30]

# 使用 iloc 基于位置索引
df.iloc[0:3, 0:2]

# 组合条件筛选
df.loc[(df['age'] > 30) & (df['city'] == '北京')]`,
        trainResult: `年龄大于 30 的行：
   name  age city  salary
2   王五   35  北京   15000
3   赵六   40  深圳   20000
4   钱七   45  北京   18000

前 3 行的前 2 列：
   name  age
0   张三   25
1   李四   30
2   王五   35

年龄大于 30 且城市为北京的行：
   name  age city  salary
2   王五   35  北京   15000
4   钱七   45  北京   18000`,
        testTask: "选出年龄大于 30 且城市为北京的行",
        expectedCode: "df.loc[(df['age'] > 30) & (df['city'] == '北京')]"
    },
    3: {
        title: "处理缺失值",
        data: [
            { name: "张三", age: 25, city: "北京", salary: 8000 },
            { name: "李四", age: null, city: "上海", salary: 12000 },
            { name: "王五", age: 35, city: null, salary: null },
            { name: "赵六", age: 40, city: "深圳", salary: 20000 },
            { name: "钱七", age: null, city: "杭州", salary: 18000 }
        ],
        trainCode: `# 检查缺失值
df.isnull().sum()

# 删除含有缺失值的行
df.dropna()

# 用均值填充数值列
df['age'].fillna(df['age'].mean(), inplace=True)
df['salary'].fillna(df['salary'].mean(), inplace=True)

# 用众数填充类别列
df['city'].fillna(df['city'].mode()[0], inplace=True)`,
        trainResult: `缺失值统计：
age      2
city     1
salary   1
dtype: int64

填充后的结果：
   name        age city        salary
0   张三  25.000000  北京   8000.00000
1   李四  33.333333  上海  12000.0000
2   王五  35.000000  北京  14500.0000
3   赵六  40.000000  深圳  20000.0000
4   钱七  33.333333  杭州  18000.0000`,
        testTask: "用均值填充数值列的缺失值",
        expectedCode: `df['age'].fillna(df['age'].mean(), inplace=True)
df['salary'].fillna(df['salary'].mean(), inplace=True)
df`
    },
    4: {
        title: "数据分组与聚合",
        data: [
            { city: "北京", department: "技术", salary: 8000 },
            { city: "上海", department: "销售", salary: 12000 },
            { city: "北京", department: "技术", salary: 15000 },
            { city: "深圳", department: "销售", salary: 20000 },
            { city: "北京", department: "市场", salary: 18000 },
            { city: "上海", department: "技术", salary: 10000 },
            { city: "深圳", department: "市场", salary: 16000 }
        ],
        trainCode: `# 按城市分组计算平均工资
df.groupby('city')['salary'].mean()

# 按城市和部门分组计算总工资
df.groupby(['city', 'department'])['salary'].sum()

# 按城市分组计算多种统计量
df.groupby('city')['salary'].agg(['mean', 'sum', 'count'])`,
        trainResult: `按城市分组计算平均工资：
city
北京    13666.666667
上海    11000.000000
深圳    18000.000000
Name: salary, dtype: float64

按城市和部门分组计算总工资：
city  department
北京    技术         23000
      市场         18000
上海    技术         10000
      销售         12000
深圳    市场         16000
      销售         20000
Name: salary, dtype: int64

按城市分组计算多种统计量：
              mean    sum  count
city
北京    13666.666667  41000      3
上海    11000.000000  22000      2
深圳    18000.000000  36000      2`,
        testTask: "按城市分组计算平均工资",
        expectedCode: "df.groupby('city')['salary'].mean()"
    },
    5: {
        title: "数据合并与连接",
        data1: [
            { id: 1, name: "张三", department: "技术" },
            { id: 2, name: "李四", department: "销售" },
            { id: 3, name: "王五", department: "技术" },
            { id: 4, name: "赵六", department: "销售" },
            { id: 5, name: "钱七", department: "市场" }
        ],
        data2: [
            { id: 1, salary: 8000, city: "北京" },
            { id: 2, salary: 12000, city: "上海" },
            { id: 3, salary: 15000, city: "北京" },
            { id: 6, salary: 20000, city: "深圳" },
            { id: 7, salary: 18000, city: "杭州" }
        ],
        trainCode: `# 内连接
pd.merge(df1, df2, on='id', how='inner')

# 左连接
pd.merge(df1, df2, on='id', how='left')

# 右连接
pd.merge(df1, df2, on='id', how='right')

# 外连接
pd.merge(df1, df2, on='id', how='outer')

# 纵向连接
pd.concat([df1, df2], axis=0)`,
        trainResult: `内连接：
   id name department  salary city
0   1  张三         技术    8000  北京
1   2  李四         销售   12000  上海
2   3  王五         技术   15000  北京

左连接：
   id name department   salary  city
0   1  张三         技术   8000.0   北京
1   2  李四         销售  12000.0   上海
2   3  王五         技术  15000.0   北京
3   4  赵六         销售      NaN  NaN
4   5  钱七         市场      NaN  NaN

纵向连接：
   id name department   salary  city
0   1  张三         技术      NaN  NaN
1   2  李四         销售      NaN  NaN
2   3  王五         技术      NaN  NaN
3   4  赵六         销售      NaN  NaN
4   5  钱七         市场      NaN  NaN
0   1  NaN        NaN   8000.0   北京
1   2  NaN        NaN  12000.0   上海
2   3  NaN        NaN  15000.0   北京
3   6  NaN        NaN  20000.0   深圳
4   7  NaN        NaN  18000.0   杭州`,
        testTask: "对两个数据框进行内连接",
        expectedCode: "pd.merge(df1, df2, on='id', how='inner')"
    },
    6: {
        title: "新增与修改列",
        data: [
            { name: "张三", baseSalary: 8000, bonusRate: 0.1 },
            { name: "李四", baseSalary: 12000, bonusRate: 0.15 },
            { name: "王五", baseSalary: 15000, bonusRate: 0.2 },
            { name: "赵六", baseSalary: 20000, bonusRate: 0.25 },
            { name: "钱七", baseSalary: 18000, bonusRate: 0.2 }
        ],
        trainCode: `# 新增奖金列
df['bonus'] = df['baseSalary'] * df['bonusRate']

# 新增总工资列
df['totalSalary'] = df['baseSalary'] + df['bonus']

# 使用 apply 函数处理列
df['salaryLevel'] = df['totalSalary'].apply(lambda x: '高' if x > 20000 else '中' if x > 15000 else '低')`,
        trainResult: `   name  baseSalary  bonusRate   bonus  totalSalary salaryLevel
0   张三        8000        0.1   800.0       8800.0           低
1   李四       12000        0.15  1800.0      13800.0           低
2   王五       15000        0.2   3000.0      18000.0           中
3   赵六       20000        0.25  5000.0      25000.0           高
4   钱七       18000        0.2   3600.0      21600.0           高`,
        testTask: "计算总工资（基本工资 + 基本工资 * 奖金比例）并赋值给新列",
        expectedCode: `df['totalSalary'] = df['baseSalary'] + df['baseSalary'] * df['bonusRate']
df`
    },
    7: {
        title: "数据排序与排名",
        data: [
            { name: "张三", chinese: 85, math: 90, english: 88 },
            { name: "李四", chinese: 92, math: 85, english: 90 },
            { name: "王五", chinese: 78, math: 95, english: 85 },
            { name: "赵六", chinese: 95, math: 88, english: 92 },
            { name: "钱七", chinese: 88, math: 92, english: 86 }
        ],
        trainCode: `# 按语文成绩排序
df.sort_values('chinese', ascending=False)

# 按多列排序（先按数学，再按英语）
df.sort_values(['math', 'english'], ascending=[False, True])

# 计算语文成绩排名
df['chineseRank'] = df['chinese'].rank(ascending=False, method='dense')

# 计算总分并排名
df['total'] = df['chinese'] + df['math'] + df['english']
df['totalRank'] = df['total'].rank(ascending=False, method='dense')
df.sort_values('totalRank')`,
        trainResult: `   name  chinese  math  english  chineseRank  total  totalRank
3   赵六       95    88       92          1.0    275        1.0
1   李四       92    85       90          2.0    267        2.0
4   钱七       88    92       86          3.0    266        3.0
0   张三       85    90       88          4.0    263        4.0
2   王五       78    95       85          5.0    258        5.0`,
        testTask: "按数学成绩降序排序",
        expectedCode: "df.sort_values('math', ascending=False)"
    },
    8: {
        title: "字符串处理",
        data: [
            { name: "张三", email: "zhangsan@example.com", phone: "13812345678" },
            { name: "李四", email: "lisi@company.com", phone: "13987654321" },
            { name: "王五", email: "wangwu@gmail.com", phone: "13712345678" },
            { name: "赵六", email: "zhaoliu@test.org", phone: "13687654321" },
            { name: "钱七", email: "qianqi@domain.net", phone: "13512345678" }
        ],
        trainCode: `# 提取邮箱域名
df['emailDomain'] = df['email'].str.split('@').str[1]

# 邮箱转为小写
df['email'] = df['email'].str.lower()

# 检查邮箱是否包含特定字符
df[df['email'].str.contains('example')]

# 提取电话号码前三位
df['phonePrefix'] = df['phone'].str[:3]`,
        trainResult: `   name               email       phone emailDomain phonePrefix
0   张三  zhangsan@example.com  13812345678  example.com         138
1   李四      lisi@company.com  13987654321  company.com         139
2   王五       wangwu@gmail.com  13712345678    gmail.com         137
3   赵六        zhaoliu@test.org  13687654321     test.org         136
4   钱七      qianqi@domain.net  13512345678   domain.net         135`,
        testTask: "提取邮箱列的用户名部分",
        expectedCode: "df['email'].str.split('@').str[0]"
    },
    9: {
        title: "时间序列基础",
        data: [
            { date: "2023-01-01", sales: 1200, customers: 50 },
            { date: "2023-01-02", sales: 1500, customers: 60 },
            { date: "2023-01-03", sales: 1800, customers: 70 },
            { date: "2023-01-04", sales: 1300, customers: 55 },
            { date: "2023-01-05", sales: 1600, customers: 65 },
            { date: "2023-01-06", sales: 1900, customers: 75 },
            { date: "2023-01-07", sales: 2100, customers: 80 },
            { date: "2023-01-08", sales: 1700, customers: 68 },
            { date: "2023-01-09", sales: 1400, customers: 58 },
            { date: "2023-01-10", sales: 1600, customers: 65 }
        ],
        trainCode: `# 转换为日期时间类型
df['date'] = pd.to_datetime(df['date'])

# 提取年份、月份、日
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day

# 按月重采样计算总销售额
df.resample('M', on='date')['sales'].sum()

# 计算移动平均
df['salesMA'] = df['sales'].rolling(window=3).mean()`,
        trainResult: `   date   sales  customers  year  month  day      salesMA
0 2023-01-01   1200         50  2023      1    1          NaN
1 2023-01-02   1500         60  2023      1    2          NaN
2 2023-01-03   1800         70  2023      1    3  1500.000000
3 2023-01-04   1300         55  2023      1    4  1533.333333
4 2023-01-05   1600         65  2023      1    5  1566.666667
5 2023-01-06   1900         75  2023      1    6  1600.000000
6 2023-01-07   2100         80  2023      1    7  1866.666667
7 2023-01-08   1700         68  2023      1    8  1900.000000
8 2023-01-09   1400         58  2023      1    9  1733.333333
9 2023-01-10   1600         65  2023      1   10  1566.666667

按月重采样计算总销售额：
date
2023-01-31    16100
Freq: M, Name: sales, dtype: int64`,
        testTask: "计算每月销售总额",
        expectedCode: "df.resample('M', on='date')['sales'].sum()"
    },
    10: {
        title: "数据透视表",
        data: [
            { date: "2023-01-01", city: "北京", product: "A", sales: 1000, profit: 200 },
            { date: "2023-01-02", city: "上海", product: "B", sales: 1500, profit: 300 },
            { date: "2023-01-03", city: "广州", product: "A", sales: 1200, profit: 240 },
            { date: "2023-01-04", city: "深圳", product: "C", sales: 1800, profit: 360 },
            { date: "2023-01-05", city: "北京", product: "B", sales: 1600, profit: 320 },
            { date: "2023-01-06", city: "上海", product: "A", sales: 1300, profit: 260 },
            { date: "2023-01-07", city: "广州", product: "C", sales: 1900, profit: 380 },
            { date: "2023-01-08", city: "深圳", product: "B", sales: 1400, profit: 280 }
        ],
        trainCode: `# 基础数据透视表：按城市和产品计算平均销售额
pd.pivot_table(df, values='sales', index='city', columns='product', aggfunc='mean')

# 多值数据透视表：同时计算销售额和利润
pd.pivot_table(df, values=['sales', 'profit'], index='city', columns='product', aggfunc='mean')

# 多聚合函数数据透视表
pd.pivot_table(df, values='sales', index='city', columns='product', aggfunc=['mean', 'sum'])`,
        trainResult: `按城市和产品计算平均销售额：
product      A      B      C
city
北京     1000.0  1600.0    NaN
上海     1300.0  1500.0    NaN
广州     1200.0    NaN  1900.0
深圳       NaN  1400.0  1800.0

同时计算销售额和利润：
          sales                profit              
product      A      B      C      A      B      C
city                                              
北京     1000.0  1600.0    NaN  200.0  320.0    NaN
上海     1300.0  1500.0    NaN  260.0  300.0    NaN
广州     1200.0    NaN  1900.0  240.0    NaN  380.0
深圳       NaN  1400.0  1800.0    NaN  280.0  360.0`,
        testTask: "按城市和产品计算平均销售额",
        expectedCode: "pd.pivot_table(df, values='sales', index='city', columns='product', aggfunc='mean')"
    }
};