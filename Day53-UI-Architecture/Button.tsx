// === UI Designs Systems with CVA ===
// When building a professional dashboard, you don't want to manually type "bg-blue-500 hover:bg-blue-600..." every time you need a button.
// You want a Button Component that handles variants.
// 
// === Type-Safe Variants ===
// 1. CVA (Class Vadtiance Authority): A library that allows you to define a "schema" for your CSS classes. You define the "base" styles and then "variants" (e.g., primary vs. secondary, small vs. large).
// 2. Tailwind Merge: A utility to ensure that if you pass a custom class to a component, it doesn't conflict with the default classes.
// 3. clsx: A tiny utility for constructing className strings conditionally.


// MICROLAB
// Create a "Full-Fledged" Button component using CVA that supports different styles and automatically handles "Loading" and "Disabled" states.
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// 1. Define the variants
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-blue-600 text-white hover:bg-blue-700",
                danger: "bg-red-600 text-white hover:bg-red-700",
                outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
            },
            size: {
                sm: "px-3 py-1.5 text-sm",
                md: "px-4 py-2 text-base",
                lg: "px-6 py-3 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

// 2. The Component
export default function Button({ className, variant, size, ...props }) {
    return (
        <button
            className={twMerge(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}