import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Import utilities
import { useCookies } from "react-cookie";
import { tailwindConfig } from "../../utils/Utils";
import useSkills from "../../hooks/dashboard/useSkills"; // 匯入 useSkills
// import { skills } from "../../data/mockData";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Skills() {
  const [cookies] = useCookies(["studentId"]);
  const { studentId } = cookies;
  //const studentId = "B11000000";
  const skills = useSkills(studentId);

  //const { labels, values } = skills;
  const chartData = {
    labels: Object.keys(skills), // 使用技能評分信息中的技能名稱作為標籤
    datasets: [
      {
        label: "能力值",
        data: Object.values(skills), // 使用技能評分信息中的評分值
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">  
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Skills
        </h2>
      </header>
      {studentId ? (
        <div className="flex align-center flex-col px-28">
          <div className="text-center my-4">學號：{studentId}</div>
          <Radar data={chartData} />
        </div>
      ) : (
        <div className="pt-20 text-center">尚未輸入數值，請先送出右方表單</div>
      )}
    </div>
  );
}

export default Skills;
