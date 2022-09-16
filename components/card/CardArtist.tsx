import { FC } from "react";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";

export type Props = {
  name: string;
  onClick?: (params: any) => any;
};

const CardArtist: FC<Props> = ({ name, onClick }) => {
  return (
    <motion.div
      whileHover={
        onClick && {
          scale: 1.1,
          transition: { duration: 0.2 },
        }
      }
      whileTap={onClick && { scale: 0.9 }}
      style={onClick && { cursor: "pointer" }}
    >
      <Card onClick={onClick} imgSrc={`/groups/${name}.png`} imgAlt={name}>
        <h5 className="text-2xl text-center tracking-tight text-gray-900 dark:text-white font-mono">
          {name}
        </h5>
      </Card>
    </motion.div>
  );
};

export default CardArtist;
