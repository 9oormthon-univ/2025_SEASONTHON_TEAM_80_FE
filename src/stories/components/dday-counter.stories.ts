import type { Meta, StoryObj } from "@storybook/react-vite";
import { DDayCounter } from "@/pages/loginPage/components/dday-counter";

const meta = {
  title: "Components/DDayCounter",
  component: DDayCounter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    days: {
      control: "number",
      description: "Storybook 예시를 위한 커스텀 일수 값",
    },
  },
} satisfies Meta<typeof DDayCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const OneDigit: Story = {
  args: {
    days: 5,
  },
};

export const TwoDigits: Story = {
  args: {
    days: 50,
  },
};

export const ThreeDigits: Story = {
  args: {
    days: 365,
  },
};
