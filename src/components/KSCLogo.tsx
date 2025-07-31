import React from 'react';
import './KSCLogo.css';

const KSCLogo = ({ size = 200 }) => {
  const strokeWidth = 8; // All lines have equal width
  
  return (
    <div className="ksc-logo" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* All 8 lines with equal width - grouped as parallel sets */}
        <g fill="none" stroke="#1e3a8a" strokeWidth={strokeWidth} strokeLinecap="square">
          
          {/* First set: 4 parallel diagonal lines (/ direction) */}
          <path d="M 25 75 L 125 25" />   {/* Line 1 */}
          <path d="M 25 125 L 75 75" />   {/* Line 2 */}
          <path d="M 125 175 L 175 125" /> {/* Line 3 */}
          <path d="M 75 175 L 175 75" />  {/* Line 4 */}
          
          {/* Second set: 4 parallel diagonal lines (\ direction) */}
          <path d="M 75 25 L 175 125" />  {/* Line 5 */}
          <path d="M 125 25 L 175 75" />  {/* Line 6 */}
          <path d="M 25 125 L 125 175" /> {/* Line 7 */}
          <path d="M 25 75 L 75 125" />   {/* Line 8 */}
          
        </g>
        
        {/* KSC Text */}
        <text 
          x="100" 
          y="110" 
          textAnchor="middle" 
          fontSize="24" 
          fontWeight="bold" 
          fontFamily="Arial, sans-serif" 
          fill="#dc2626"
        >
          KSC
        </text>
      </svg>
    </div>
  );
};

export default KSCLogo; 