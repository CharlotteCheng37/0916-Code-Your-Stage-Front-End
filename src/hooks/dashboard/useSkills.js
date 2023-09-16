import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const useSkills = (studentId) => {
  const [skills, setSkills] = useState({
    UIUX: 0,
    backend: 0,
    "business analysis": 0,
    "design thinking": 0,
    frontend: 0
  });
  const [, setCookie] = useCookies(["studentId"]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        // 先檢查瀏覽器 cookie 中是否存在學號
        if (!studentId) {
          const storedStudentId = localStorage.getItem("studentId");
          if (storedStudentId) {
            studentId = storedStudentId;
          }
        }

        // 如果有學號，則發送 GET 請求獲取技能信息
        if (studentId) {
          const response = await axios.get(`https://api.projectszero.tech/skills/${studentId}`);
          const data = response.data;
          setSkills(data);

          // 將學號保存到 cookie 和本地存儲中
          setCookie("studentId", studentId);
          localStorage.setItem("studentId", studentId);
        }
      } catch (error) {
        console.error("獲取技能信息失敗：", error);
      }
    };

    // 調用獲取技能信息的函數
    getSkills();
  }, [studentId, setCookie]);

  return skills;
};

export default useSkills;
