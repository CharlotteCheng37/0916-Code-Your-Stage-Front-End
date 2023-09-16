import { useRef, useEffect, useState } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip
} from "chart.js";
import { useThemeProvider } from "../utils/ThemeContext";

// 导入图表颜色配置
import { chartColors } from "./ChartjsConfig";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

// 注册Chart.js组件
Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

// 定义组件，接受数据、宽度和高度作为props
function DoughnutChart({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  // 从chartColors对象中解构出有关提示框样式的属性
  const {
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "doughnut",
      data,
      options: {
        cutout: "80%",
        layout: {
          padding: 24
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleColor: darkMode
              ? tooltipTitleColor.dark
              : tooltipTitleColor.light,
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light
          }
        },
        interaction: {
          intersect: false,
          mode: "nearest"
        },
        animation: {
          duration: 500
        },
        maintainAspectRatio: false,
        resizeDelay: 200
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const button = document.createElement("button");
              button.classList.add(
                "btn-xs",
                "bg-white",
                "dark:bg-slate-800",
                "text-slate-500",
                "dark:text-slate-400",
                "border",
                "border-slate-200",
                "dark:border-slate-700",
                "shadow-md"
              );
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };
              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              // Label
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }
      ]
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height} />
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1" />
      </div>
    </div>
  );
}

export default DoughnutChart;