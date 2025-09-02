import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackButton } from "@/components/ui/back-button";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Components/button/back-button",
  component: BackButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
