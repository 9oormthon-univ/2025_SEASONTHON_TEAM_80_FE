import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { NicknameInput } from "@/components/ui/nickname-input";

const meta = {
  title: "components/input/nickname-input",
  component: NicknameInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
    value: {
      control: "text",
      description: "입력 값",
    },
  },
  args: {
    onChange: fn(),
    onValidationChange: fn(),
  },
} satisfies Meta<typeof NicknameInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: "닉네임",
  },
};

export const WithLongValue: Story = {
  args: {
    value: "긴닉네임입니다",
  },
};
