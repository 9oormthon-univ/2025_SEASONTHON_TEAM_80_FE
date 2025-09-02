import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SearchInput } from "@/components/ui/search-input";

const meta = {
  title: "components/input/search-input",
  component: SearchInput,
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
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: "BTS",
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
  },
};

export const WithLongValue: Story = {
  args: {
    value: "긴 검색어 예시입니다 - 아티스트명이나 곡명",
  },
};
