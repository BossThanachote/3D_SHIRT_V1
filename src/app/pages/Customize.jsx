"use client"
import React,{ useState,useEffect } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs,FilterTabs,DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker,ColorPicker,CustomButton, FilePicker } from '../components'
import { Tab } from '../components'
const Customize = () => {
    const snap = useSnapshot(state);

    const [file, setfile] = useState('')

    const [prompt,setprompt] = useState('')
    const [generatingImg,setGeneratingImg] = useState(false)

    const [activeEditorTab , setActiveEditorTab] = useState("");
    const [activeFilterTab , setActiveFilterTab] = useState(false);

    //show tab content depending on the activeTab
    const generateTabContent = () => {
        switch(activeEditorTab){
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker 
                    file={file}
                    setfile={setfile}
                    prompt={prompt}
                    />
            case "aipicker":
                return <AIPicker />
            default:
                return null;
        }
    }

    const handleDecals = (type, result) =>{

    }

    const readfile = (type) =>{
        reader(file)
            .then((reuslt) =>{
                handleDecals(type,result);
                setActiveEditorTab("");
            })
    }
    return (
    <AnimatePresence>
        {!snap.intro && (
            <>
                {/* สร้างแถบเมนูด้านซ้าย */}
                <motion.div
                    key="custom"
                    className='absolute top-0 left-0 z-10'
                    {...slideAnimation('left')}
                    >
                        <div className='flex items-center min-h-screen'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((tab =>
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                    handleClick={() => setActiveEditorTab(tab.name)}
                                />
                                ))}

                                {generateTabContent() }
                            </div>
                        </div>
                </motion.div>

                {/* สร้างปุ่มกลับไปหน้าหลัก */}
                <motion.div
                    className='absolute z-10 top-5 right-5'
                    {...fadeAnimation}
                    >
                        <CustomButton
                        type="filled"
                        title="Go Back"
                        handleClick={() => state.intro = true}                                
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                </motion.div>
                

                {/* สร้างแถบเมนูด้านล่าง */}
                <motion.div
                    className='filtertabs-container'
                    {...slideAnimation('up')}
                    >
                        {FilterTabs.map((tab =>
                            <Tab
                            key={tab.name}
                            tab={tab}
                            isFilterTab
                            isActiveTab=""
                            handleClick={() => {}}
                        />
                        ))}

                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default Customize