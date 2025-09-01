import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Pagination } from "@/components/ui/pagination";

const meta = {
  title: "components/navigation/pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    initialPage: {
      control: { type: "number", min: 1 },
      description: "초기 페이지 번호",
    },
    totalPages: {
      control: { type: "number", min: 1, max: 20 },
      description: "전체 페이지 수",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
  args: { onPageChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePage: Story = {
  args: {
    initialPage: 1,
    totalPages: 1,
  },
};

export const TwoPages: Story = {
  args: {
    initialPage: 1,
    totalPages: 2,
  },
};

export const FivePages: Story = {
  args: {
    initialPage: 3,
    totalPages: 5,
  },
};

export const TenPages: Story = {
  args: {
    initialPage: 1,
    totalPages: 10,
  },
};

export const ManyPages: Story = {
  args: {
    initialPage: 7,
    totalPages: 15,
  },
};
