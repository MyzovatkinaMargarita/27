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
  // useParams -> testId: число из маршрута /student/test/:id
  const { id } = useParams();
  const testId = Number(id);

  const [all, setAll] = useState<Question[]>([]);
  // state: "loading" | "ready" | "error" — явные состояния UX
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

   // useMemo: фильтрация по testId один раз на изменения исходного массива
   const questions = useMemo(
    () => all.filter(q => q.testId === testId),
    [all, testId]
  );

if (Number.isNaN(testId)) {
    return (
      <section>
        <StudentHeader title="Тестирование" backTo="/student/tests" />
        <p>Неверный идентификатор теста.</p>
      </section>
    );
  }

  if (state === "loading") {
    return (
      <section>
        <StudentHeader title={XXXINLINECODEXXX3XXXINLINECODEXXX} backTo="/student/tests" />
        <p>Загрузка вопросов…</p>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section>
        <StudentHeader title={XXXINLINECODEXXX4XXXINLINECODEXXX} backTo="/student/tests" />
        <p style={{ color: "crimson" }}>{error}</p>
      </section>
    );
  }

  return (
    <>
      <StudentHeader title={XXXINLINECODEXXX5XXXINLINECODEXXX} backTo="/student/tests" />
      <Layout>
        <Stack>
          {questions.map((q, i) => (
      // QuestionBlock: пока заглушка; позже подставим рендер по типу single/multiple/text
            <QuestionBlock key={q.id} index={i} question={q} />
          ))}

          {/* кнопка "Отправить" — пока без логики */}
          <div style={{ marginTop: 8 }}>
            <button
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(180deg, #4f8cff, #3675f4)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Отправить
            </button>
          </div>
        </Stack>
        
        {/* правый бокс-таймер — заглушка */}
        <TimerBox>00:59</TimerBox>
      </Layout>
    </>
  );
}


