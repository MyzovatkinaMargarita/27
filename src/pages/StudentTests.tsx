/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import StudentHeader from "../../components/student/StudentHeader";
import QuestionBlock, { type Question } from "../../components/tests/QuestionBlock";

const Layout = styled.div`
  display: grid; grid-template-columns: 1fr 260px; gap: 20px;
  margin: 24px 0;
`;

const TimerBox = styled.aside`
  height: 120px; border: 1px solid #e9edf5; border-radius: 12px;
  display: grid; place-items: center; background: #fff;
  font-size: 34px; font-weight: 800; color: #1b5de0;
`;

const Stack = styled.div`
  display: grid; gap: 14px;
`;
export default function TestRunPage() {
  const { id } = useParams();
  const testId = Number(id);

  const [all, setAll] = useState<Question[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/questions.json")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data: Question[]) => {
        if (!Array.isArray(data)) throw new Error("Неверный формат JSON");
        setAll(data);
        setState("ready");
      })
      .catch(e => {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
        setState("error");
      });
  }, []);

   const questions = useMemo(
    () => all.filter(q => q.testId === testId),
    [all, testId]
  );


