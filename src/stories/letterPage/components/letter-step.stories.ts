import type { Meta, StoryObj } from "@storybook/react-vite";
import LetterStep from "@/pages/letterPage/components/letter-step";

const meta = {
  title: "letterPage/components/letter-step",
  component: LetterStep,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    step: {
      control: "select",
      options: [1, 2],
      description: "단계 번호 (1: 노래 선정, 2: 편지 작성)",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
} satisfies Meta<typeof LetterStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    step: 1,
  },
};

export const Step2: Story = {
  args: {
    step: 2,
  },
};
