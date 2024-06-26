import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

//  แปลงไฟล์ภาพ  
import state from '../store';
const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    // ประมวณผลรูปภาพเก็บใส่ตัวแปร
    const logoTexture = useTexture(snap.logoDecal) 
    const fullTexture = useTexture(snap.fullDecal)

    useFrame((state, delta) => easing.dampC(materials.lambert1.color,
    snap.color,0.25,delta));
 
    
  return (
    <group
        >
        {/* กำหนด component สร้างวัตถุ 3D */}
        <mesh
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            
          >
            {/* กำหนดลายเสื้อ full */}
            {snap.isFullTexture && (
                <Decal 
                    position={[0,0,0]}
                    rotation={[0,0,0]}
                    scale={1}
                    map={fullTexture}
                />
            )}
            {/* กำหนดลายเสื้อ Logo */}
            {snap.isLogoTexture && (
                <Decal
                    position={[0,0.04,0.15]}
                    rotation={[0,0,0]}
                    scale={0.15}
                    map={logoTexture}
                    
                />
            )}
        </mesh>
    </group>
  )
}

export default Shirt