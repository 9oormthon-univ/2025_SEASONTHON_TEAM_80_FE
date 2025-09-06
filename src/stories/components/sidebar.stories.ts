import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "@/components/ui/sidebar";

const meta = {
  title: "Components/sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
