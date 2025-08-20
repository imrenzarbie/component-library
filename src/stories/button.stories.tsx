// Button.stories.tsx

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button/button";


// A simple placeholder icon component for the stories (mimicking lucide-react)
const Mail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

// Meta configuration for the storybook
const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "destructive",
                "outline",
                "secondary",
                "ghost",
                "link",
            ],
            description: "The visual style of the button.",
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
            description: "The size of the button.",
        },
        isLoading: {
            control: "boolean",
            description: "Shows a loading spinner and disables the button.",
        },
        disabled: {
            control: "boolean",
            description: "Disables the button.",
        },
        children: {
            control: "text",
            description: "The content of the button.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base story that all other stories inherit from
export const Default: Story = {
    args: {
        variant: "default",
        size: "default",
        children: "Button",
        isLoading: false,
        disabled: false,
    },
};

export const Secondary: Story = {
    args: {
        ...Default.args,
        variant: "secondary",
        children: "Secondary",
    },
};

export const Destructive: Story = {
    args: {
        ...Default.args,
        variant: "destructive",
        children: "Destructive",
    },
};

export const Outline: Story = {
    args: {
        ...Default.args,
        variant: "outline",
        children: "Outline",
    },
};

export const Ghost: Story = {
    args: {
        ...Default.args,
        variant: "ghost",
        children: "Ghost",
    },
};

export const Link: Story = {
    args: {
        ...Default.args,
        variant: "link",
        children: "Link",
    },
};

export const Icon: Story = {
    args: {
        variant: "outline",
        size: "icon",
        "aria-label": "Mail", // Important for accessibility
        children: <Mail style={{ height: "1.2rem", width: "1.2rem" }} />,
    },
};

export const WithIcon: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <Mail
                    style={{
                        marginRight: "8px",
                        height: "1.2rem",
                        width: "1.2rem",
                    }}
                />
                Login with Email
            </>
        ),
    },
};

export const Loading: Story = {
    args: {
        ...Default.args,
        isLoading: true,
        children: "Loading...",
    },
};

export const LoadingWithIcon: Story = {
    name: "Loading with Icon",
    args: {
        ...Default.args,
        isLoading: true,
        children: (
            <>
                <Mail
                    style={{
                        marginRight: "8px",
                        height: "1.2rem",
                        width: "1.2rem",
                    }}
                />
                Please wait
            </>
        ),
    },
};
