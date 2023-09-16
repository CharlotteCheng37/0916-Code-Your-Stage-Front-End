import DoughnutChart from "../../charts/DoughnutChart";
// import { academyStats } from "../../data/mockData";
import useAcademystats from "../../hooks/dashboard/useAcademystats"; // API

function Academy() {
  const { labels, values } = useAcademystats();
  // const { labels, values } = academyStats;

  if (!labels || !values) {
    // 如果数据尚未加载完成，则可以显示 loading 状态或其他信息
    return <p>Loading...</p>;
  }

  // 将部门映射到学院的映射表
  const labelMappings = [
    { labelsToCombine: ["心理所一般組", "數學系", "物理學系", "心理學系"], newLabel: "理學院"},
    { labelsToCombine: ["創新領域學士學位學程"], newLabel: "創新設計學院"},
    { labelsToCombine: ["電機工程學系", "資訊工程學系", "生醫電資所", "資訊工程研究所"], newLabel: "電機資訊學院"},
    { labelsToCombine: ["生物機電工程學系"], newLabel: "生物資源暨農學院"},
    { labelsToCombine: ["經濟學系", "經濟系"], newLabel: "社會科學院"},
    { labelsToCombine: ["科際整合法律學研究所"], newLabel: "法律學院"},
    { labelsToCombine: ["材料科學與工程學系", "工程科學及海洋工程學系", "醫學工程學系"], newLabel: "工學院"},
    { labelsToCombine: ["工商管理學系 科技管理組", "工商管理學系", "會計學系", "國際企業學系", "資訊管理學系"], newLabel: "管理學院"},
    { labelsToCombine: ["物理治療學系"], newLabel: "醫學院"},
    { labelsToCombine: ["戲劇學系", "外國語文學系 / 圖書資訊學系", "歷史學系", "外國語文學系/社會學系"], newLabel: "文學院"}
  ];

  // 创建一个部门到学院的映射表
  const departmentToAcademyMapping = {};

  labelMappings.forEach((mapping) => {
    mapping.labelsToCombine.forEach((label) => {
      departmentToAcademyMapping[label] = mapping.newLabel;
    });
  });

  // 基于学院进行数据聚合
  const academyData = {};
  labels.forEach((department, index) => {
    const academy = departmentToAcademyMapping[department];
    academyData[academy] = (academyData[academy] || 0) + values[index];
  });

   // 准备图表数据
   const academyLabels = Object.keys(academyData);
   const academyValues = academyLabels.map((academy) => academyData[academy]);
 
  // 生成隨機色碼的函式
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const chartData = {
    labels: academyLabels,
    datasets: [
      {
        label: "Distribution of colleges",
        data: academyValues,
        backgroundColor: academyValues.map(() => getRandomColor()),
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Distribution of colleges
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {academyLabels && <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default Academy;
