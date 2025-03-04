import {AnimatePresence, motion} from "framer-motion";

const AnimationWrapper = ({ children, initial = { opacity: 0 }, animate = { opacity: 1 }, transition = { duration: 1 }, keyValue, clasName }) => {
    return(
        <AnimatePresence>
            <motion.div
                key={keyValue}
                initial={initial}
                animate={animate}
                transition={transition}
                className={clasName}
            >
                { children }
            </motion.div>
        </AnimatePresence>
    );
}

export default AnimationWrapper;
