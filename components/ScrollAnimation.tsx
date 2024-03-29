"use client"
import React, { Suspense, useRef } from 'react'
import { AnimatePresence, isValidMotionProp, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { Box, Spacer, Text, chakra, shouldForwardProp } from '@chakra-ui/react'
import { wrap } from "@motionone/utils";
import {Noto_Serif_Old_Uyghur} from 'next/font/google';
import dynamic from 'next/dynamic';

const NotoFonts = Noto_Serif_Old_Uyghur({ subsets: ["latin"], weight: ["400"] });

export const FramerBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    // shouldForwardProp: isValidMotionProp,
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  
  export function ParallaxText({ children, baseVelocity = 100 }: any) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef<number>(1);

    // @ts-ignore
    useAnimationFrame((t,delta):any => {
      
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      // @ts-ignore
        let time = t
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */

    
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    
    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
      <Box className="parallax">
        <AnimatePresence >
        <FramerBox    key="modal" className="scroller" style={{ x }}>
          <Text mx="2" color={"black"} className={NotoFonts.className}>{children} </Text>
          <Text mx="2" color={"black"} className={NotoFonts.className}>{children} </Text>
          <Text mx="2" color={"black"} className={NotoFonts.className}>{children} </Text>
          <Text mx="2" color={"black"} className={NotoFonts.className}>{children} </Text>
          <Text mx="2" color={"black"} className={NotoFonts.className}>{children} </Text>
        </FramerBox>
        </AnimatePresence>
      </Box>
    );
  }


function ScrollAnimation() {
  return (
    <Box w={"full"} py="6" overflow={"hidden"}> 
          
        <ParallaxText baseVelocity={-2}>Molecular Dynamics | {"  "}</ParallaxText>
        <Spacer h={"2"}/>
        <ParallaxText baseVelocity={-3}>Medicinal Chemistry | {"  "}</ParallaxText>
        
    </Box>
  )
}

export default ScrollAnimation