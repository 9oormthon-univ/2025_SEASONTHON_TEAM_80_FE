import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { NavigationButton } from "@/components/ui/navigation-button";

const meta = {
  title: "components/button/navigation-button",
  component: NavigationButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
    active: {
      control: "boolean",
      description: "버튼 활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "네비게이션 버튼",
  },
};

export const Active: Story = {
  args: {
    children: "활성화된 버튼",
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    children: "비활성화된 버튼",
    active: false,
  },
};
