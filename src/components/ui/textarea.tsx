import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className ?? ""}`}
      ref={ref}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";