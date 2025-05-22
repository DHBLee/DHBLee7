export const styleLines = [
  { text: 'OPACITY-25', style: '!opacity-25', defaultStyle: 'top-0 1440:top-[2rem] left-0', tooltip: 'Sets element quality to 25%'},
  { text: 'BRIGHTNESS-150', style: 'brightness-150', defaultStyle: 'top-[1rem] md:top-[3rem] right-0', tooltip: 'Increases brigthness by 50% (CSS filter effect)'},
  { text: 'ABSOLUTE', style: 'absolute', defaultStyle:'top-[2rem] md:top-[4rem] 1024:top-[7rem] left-[1rem]', tooltip: 'Positions element absolutely relative to nearest positioned ancestor'},
  { text: 'ELEMENT.STYLE.DISPLAY = "NONE"', style: 'hidden', defaultStyle:'top-[3.5rem] md:top-[7.5rem] 1024:top-[9rem] right-[0.5rem]', tooltip: 'Completely hides the element (removes from document flow)'},
  { text: 'BACKGROUND-COLOR: #FFFFFF', style: 'bg-white', defaultStyle:'top-[5rem] md:top-[10rem] 1024:top-[13rem] left-0', tooltip: 'Sets background color to pure white (#FFFFFF)'},
  { text: 'FLEX FLEX-COL', style: 'flex flex-col', defaultStyle:'top-[7rem] md:top-[14rem] 1024:top-[19rem] left-[1rem]', tooltip: 'Creates flex container with vertical item alignment'},
  { text: 'TRACKING-[-2PX]', style: 'tracking-[-2px]', defaultStyle:'top-[9rem] md:top-[17rem] 1024:top-[24rem] right-[0.5rem]', tooltip: 'Decreases letter spacing by 2px (negative tracking)'},
  { text: 'TEXT-SLATE-800', style: 'text-slate-800', defaultStyle:'bottom-[2.5rem] md:bottom-[6.5rem] 1024:bottom-[10rem] 1440:bottom-[14rem] left-[1rem]', tooltip: 'Sets text color to dark slate (hex #1e293b)'},
  { text: 'UNDERLINE', style: 'underline', defaultStyle:'bottom-[0.8rem] md:bottom-[1.8rem] 1024:bottom-[3rem] left-[-0.6rem] 1440:left-[-2rem] rotate-90', tooltip: 'Adds text underline (CSS text-decoration)'},
  { text: 'ROTATE-180', style: 'rotate-180', defaultStyle:'bottom-[0.5rem] md:bottom-[4.5rem] 1024:bottom-[7rem] right-[0.5rem]', tooltip:'Rotates element 180 degrees (CSS transform)'},
]

export const overlyingStyles = [
  "underline",
  "brightness-150",
  "tracking-[-2px]",
  "bg-white",
  "text-slate-800",
  "!opacity-25",
  "rotate-180",
]

export const parentContainerStyles = [
  "flex flex-col"
]

export  function getAppliedClasses(line, activeStyles) {
    if (!activeStyles) return line.defaultStyle;

    const isOverlayStyle = overlyingStyles.some(style => activeStyles.includes(style));

    return isOverlayStyle
      ? `${line.defaultStyle} ${activeStyles.join(' ')}`
      : activeStyles.join(' ');
};

export const getParentContainerClasses = (activeStyles) => {
  return activeStyles && parentContainerStyles.some(style => 
    activeStyles.join(' ') === style
  ) ? activeStyles.join(' ') : '';
};
