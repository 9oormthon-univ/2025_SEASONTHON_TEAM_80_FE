import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { LinkShareButton } from "@/components/ui/link-share-button";

const meta = {
  title: "components/button/link-share-button",
  component: LinkShareButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof LinkShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomWidth: Story = {
  args: {
    className: "w-80",
  },
};
