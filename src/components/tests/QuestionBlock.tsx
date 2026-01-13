/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export type QuestionType = "single" | "multiple" | "text";

export type Question = {
  id: number;
  testId: number;
  type: QuestionType;
  text: string;
  options?: string[];
  score: number;
  shuffle?: boolean;
};

const Box = styled.article`
  border: 1px solid #e9edf5;
  border-radius: 12px;
  background: #fff;
  padding: 16px;
`;

type Props = { index: number; question: Question };

// заглушка: только заголовок и тип (без вариантов)
export default function QuestionBlock({ index, question }: Props) {
  return (
    <Box>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        Вопрос {index + 1}
      </div>
      <div style={{ marginBottom: 6 }}>{question.text}</div>
      <div style={{ fontSize: 12, color: "#667085" }}>
        Тип: {question.type}
      </div>
    </Box>
  );
}
