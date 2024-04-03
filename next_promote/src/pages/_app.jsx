import { motion } from 'framer-motion';

console.log(motion);

const MyComponent = () => (
  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
);

export default MyComponent;
