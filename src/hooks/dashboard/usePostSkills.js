import axios from "axios";
import { useCookies } from "react-cookie";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["studentId"]);

  const postSkills = async (studentId, skills) => {
    try {
      const formattedSkills = Object.entries(skills).reduce((acc, [skill, value]) => {
        acc[skill] = value;
        return acc;
      }, {});

      await axios.post(`https://api.projectszero.tech/skills/${studentId}`, formattedSkills);
      setCookie("studentId", studentId);
      alert("送出成功");
    } catch (error) {
      console.error("请求失败：", error);
      alert("请求失败：" + error.response.data.error);
    }
  };

  return postSkills; // 返回 postSkills 函数
};

export default usePostSkills;
