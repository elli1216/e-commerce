import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
