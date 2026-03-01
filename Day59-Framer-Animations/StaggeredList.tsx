// === Declarative Animations ===
// Standard CSS transitions are fine for simple hovers, but for complex sequences (like a list where items slide in one by one),
// you need a powerful orchestration engine.
// 
// === The Animation Lifecycle ===
// 1. Initial: The state of the component before it mounts (e.g., opacity: 0, y: 20).
// 
// 2. Animate: The target state once it's on screen (e.g., opacity: 1, y: 0).
// 
// 3. Exit: How it leaves the DOM (requires AnimatePresence).
// 
// 4. Layout Animations: Automatically animating a component's position when its size or the surrounding layout changes (the "Magic Motion" effect).


// MICROLAB
// Create a "Staggered List" where each product card slides in 0.1 seconds after the previous one, creating a professional "waterfall" effect.
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 // The "Magic" orchestration
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function ProductList({ products }) {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {products.map((p) => (
                <motion.div key={p.id} variants={itemVariants} className="p-4 border-b">
                    {p.name}
                </motion.div>
            ))}
        </motion.div>
    );
}