import type { Meta, StoryObj } from "@storybook/react-vite";
import { SendAlert } from "@/pages/letterPage/components/send-alert";

const meta = {
  title: "letterPage/components/send-alert",
  component: SendAlert,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달의 열림/닫힘 상태",
    },
    onClose: {
      action: "onClose",
      description: "취소 버튼 클릭 시 호출되는 함수",
    },
    onConfirm: {
      action: "onConfirm",
      description: "확인 버튼 클릭 시 호출되는 함수",
    },
  },
} satisfies Meta<typeof SendAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
  },
};
