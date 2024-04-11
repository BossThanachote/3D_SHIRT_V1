
import { useSnapshot } from 'valtio'
import Image from 'next/image';
import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);
//ปุ่ม Tab ล่าง กลม
  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : ''}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <Image 
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : ''}`}
      />
    </div>
  )
}

export default Tab
