import type { Meta } from "@storybook/react-vite";
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
type Story = Storyobj<typeof meta>;

export const Default: Story = {
  args: {},
};
