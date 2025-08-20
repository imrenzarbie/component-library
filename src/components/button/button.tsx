import React from "react";
import styles from "./button.module.scss";

type ButtonVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
}

const Loader: React.FC<React.SVGProps<SVGSVGElement>> = ({
    className,
    ...props
}) => (
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
        className={className}
        {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "default",
            size = "default",
            isLoading = false,
            children,
            ...props
        },
        ref
    ) => {
        const combinedClassName = [
            styles.button,
            styles[variant],
            styles[size],
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <button
                className={combinedClassName}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}>
                {isLoading && <Loader className={styles.loader} />}
                <span
                    className={
                        isLoading ? styles.contentHidden : styles.contentVisible
                    }>
                    {children}
                </span>
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
