import { useRef } from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    // สร้างเงางับ
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      // ฉากเงา
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      color={0xffffff} 
    >
      {/* สร้างแสงสุ่มๆ */}
      <RandomizedLight 
        amount={4}
        radius={9}
        // ความเข้ม
        intensity={2.05}
        //fade แสงต้น -> ปลาย
        ambient={20.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5,5,-9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop