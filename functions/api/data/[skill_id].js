export async function onRequestGet(context) {
  const { params } = context;
  const skillId = parseInt(params.skill_id);
  
  try {
    const data = generateSampleData(skillId);
    
    if (skillId === 5) {
      return new Response(JSON.stringify({
        status: "success",
        data1: data.data1,
        data2: data.data2
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        status: "success",
        data: data
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      message: error.message
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

function generateSampleData(skillId) {
  if (skillId === 1) {
    return [
      { name: "张三", age: 25, city: "北京", salary: 8000 },
      { name: "李四", age: 30, city: "上海", salary: 12000 },
      { name: "王五", age: 35, city: "广州", salary: 15000 },
      { name: "赵六", age: 40, city: "深圳", salary: 20000 },
      { name: "钱七", age: 45, city: "杭州", salary: 18000 }
    ];
  } else if (skillId === 2) {
    return [
      { name: "张三", age: 25, city: "北京", salary: 8000 },
      { name: "李四", age: 30, city: "上海", salary: 12000 },
      { name: "王五", age: 35, city: "北京", salary: 15000 },
      { name: "赵六", age: 40, city: "深圳", salary: 20000 },
      { name: "钱七", age: 45, city: "北京", salary: 18000 }
    ];
  } else if (skillId === 3) {
    return [
      { name: "张三", age: 25, city: "北京", salary: 8000 },
      { name: "李四", age: null, city: "上海", salary: 12000 },
      { name: "王五", age: 35, city: null, salary: null },
      { name: "赵六", age: 40, city: "深圳", salary: 20000 },
      { name: "钱七", age: null, city: "杭州", salary: 18000 }
    ];
  } else if (skillId === 4) {
    return [
      { city: "北京", department: "技术", salary: 8000 },
      { city: "上海", department: "销售", salary: 12000 },
      { city: "北京", department: "技术", salary: 15000 },
      { city: "深圳", department: "销售", salary: 20000 },
      { city: "北京", department: "市场", salary: 18000 },
      { city: "上海", department: "技术", salary: 10000 },
      { city: "深圳", department: "市场", salary: 16000 }
    ];
  } else if (skillId === 5) {
    return {
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
      ]
    };
  } else if (skillId === 6) {
    return [
      { name: "张三", baseSalary: 8000, bonusRate: 0.1 },
      { name: "李四", baseSalary: 12000, bonusRate: 0.15 },
      { name: "王五", baseSalary: 15000, bonusRate: 0.2 },
      { name: "赵六", baseSalary: 20000, bonusRate: 0.25 },
      { name: "钱七", baseSalary: 18000, bonusRate: 0.2 }
    ];
  } else if (skillId === 7) {
    return [
      { name: "张三", chinese: 85, math: 90, english: 88 },
      { name: "李四", chinese: 92, math: 85, english: 90 },
      { name: "王五", chinese: 78, math: 95, english: 85 },
      { name: "赵六", chinese: 95, math: 88, english: 92 },
      { name: "钱七", chinese: 88, math: 92, english: 86 }
    ];
  } else if (skillId === 8) {
    return [
      { name: "张三", email: "zhangsan@example.com", phone: "13812345678" },
      { name: "李四", email: "lisi@company.com", phone: "13987654321" },
      { name: "王五", email: "wangwu@gmail.com", phone: "13712345678" },
      { name: "赵六", email: "zhaoliu@test.org", phone: "13687654321" },
      { name: "钱七", email: "qianqi@domain.net", phone: "13512345678" }
    ];
  } else if (skillId === 9) {
    return [
      { date: "2023-01-01", sales: 1200, customers: 50 },
      { date: "2023-01-02", sales: 1500, customers: 60 },
      { date: "2023-01-03", sales: 1800, customers: 70 },
      { date: "2023-01-04", sales: 1300, customers: 55 },
      { date: "2023-01-05", sales: 1600, customers: 65 },
      { date: "2023-01-06", sales: 1400, customers: 58 },
      { date: "2023-01-07", sales: 1700, customers: 68 },
      { date: "2023-01-08", sales: 1900, customers: 75 },
      { date: "2023-01-09", sales: 1250, customers: 52 },
      { date: "2023-01-10", sales: 1650, customers: 66 }
    ];
  } else if (skillId === 10) {
    return [
      { date: "2023-01-01", city: "北京", product: "A", sales: 1000, profit: 200 },
      { date: "2023-01-02", city: "上海", product: "B", sales: 1500, profit: 300 },
      { date: "2023-01-03", city: "广州", product: "A", sales: 1200, profit: 240 },
      { date: "2023-01-04", city: "深圳", product: "C", sales: 1800, profit: 360 },
      { date: "2023-01-05", city: "北京", product: "B", sales: 1600, profit: 320 },
      { date: "2023-01-06", city: "上海", product: "A", sales: 1300, profit: 260 },
      { date: "2023-01-07", city: "广州", product: "C", sales: 1900, profit: 380 },
      { date: "2023-01-08", city: "深圳", product: "B", sales: 1400, profit: 280 }
    ];
  }
  return [];
}