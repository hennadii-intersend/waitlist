import React from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  icon?: React.ReactNode;
  text: string;
}

const Chip: React.FC<ChipProps> = ({ icon, text }) => {
  return (
    <div className={styles.chip}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Chip;
