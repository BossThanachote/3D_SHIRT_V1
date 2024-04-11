"use client"
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';

import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

//state for colorPick , FilePick
  const [activeEditorTab, setActiveEditorTab] = useState("");
//state for Activate Tab bottom
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

//ฟัวก์ชั่นอ่านไฟล์และปรับแต่งลายเสื้อ
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  // โชว์ Tab เนื้อหา
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      default:
        return null;
    }
  }
// ฟังก์ชั่นกำหนดลายเสื้อ
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }
// จัดการสถานะ TabFilter
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
    }


// ฟังก์ชั่น Toggle
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }


  return (
    //แสดงผลหน้า Customize
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* เมนู pickcolor , filepicker */}
          <motion.div
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}//slide ออก
          >
            {/* จัดเมนู pickcolor , filepicker ไว้กลาง*/}
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container">
                {EditorTabs.map((tab) => (
                  <Tab 
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* ปุ่ม Go Back ไปหน้า Main */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          
          {/* Tab เปิดปิด logo , full */}
          <motion.div
            className='filtertabs-container'
            {...slideAnimation("down")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                // css
                isFilterTab
                // css สถานะปุ่ม        
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer


// 