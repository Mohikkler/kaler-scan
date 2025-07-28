import React from 'react';

interface KSCLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const KSCLogo: React.FC<KSCLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Diamond Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="w-full h-full bg-gradient-to-br from-medical-blue to-medical-blue-dark transform rotate-45 rounded-lg shadow-lg flex items-center justify-center">
          <div className="transform -rotate-45 text-white font-bold">
            <div className={`${textSizeClasses[size]} leading-none text-center`}>
              <div className="font-extrabold tracking-wider">KSC</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col">
        <div className="text-medical-blue font-bold text-2xl leading-none tracking-wide">
          Kaler
        </div>
        <div className="text-medical-red font-bold text-lg leading-none tracking-wider">
          SCAN CENTRE
        </div>
        <div className="text-medical-red font-bold text-sm leading-none tracking-wider">
          & DIGITAL X-RAY
        </div>
      </div>
    </div>
  );
};

export default KSCLogo;