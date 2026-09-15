import React from 'react';
import { useLogos } from '../../context/LogoContext';
import { CustomLogoData } from '../../lib/logoStorage';
import { SR_GROUP_LOGO_DATA_URL } from '../../assets/images/srGroupLogoBase64';
import { NEW_SR_INFRA_LOGO_DATA_URL } from '../../assets/images/newSrInfraLogoBase64';
import { SUHEL_ENGINEERING_LOGO_DATA_URL } from '../../assets/images/suhelEngineeringLogoBase64';
import { SR_POWER_SOLUTION_LOGO_DATA_URL } from '../../assets/images/srPowerSolutionLogoBase64';

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightMode?: boolean; // Default is dark background optimized
}

function useCustomLogoSafe(companyId: string): CustomLogoData | null {
  try {
    const { getCustomLogo } = useLogos();
    return getCustomLogo(companyId);
  } catch (e) {
    return null;
  }
}

interface RenderCustomLogoProps {
  customLogo: CustomLogoData;
  companyName: string;
  tagline: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  showText: boolean;
  lightMode: boolean;
  className: string;
  textColor: string;
  subtextColor: string;
}

const RenderCustomLogoImage: React.FC<RenderCustomLogoProps> = ({
  customLogo,
  companyName,
  tagline,
  size,
  showText,
  lightMode,
  className,
  textColor,
  subtextColor,
}) => {
  const sizeMap = {
    sm: 'h-9 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-24 sm:h-28 w-auto',
  };

  const isWhiteBg = customLogo.bgStyle === 'white';
  const isDarkBg = customLogo.bgStyle === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 shrink-0 flex-shrink-0 ${className}`}>
      <div
        className={`relative flex items-center justify-center overflow-hidden transition-all ${sizeMap[size]} shrink-0 ${
          isWhiteBg
            ? 'bg-white p-1 rounded-xl border border-slate-200 shadow-sm'
            : isDarkBg
            ? 'bg-slate-950 p-1 rounded-xl border border-slate-800'
            : ''
        }`}
      >
        <img
          src={customLogo.dataUrl}
          alt={`${companyName} Logo`}
          className="h-full w-auto max-h-full object-contain"
          style={{
            maxHeight: '100%',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col shrink-0 min-w-0">
          <span className={`font-black font-mono tracking-tight leading-none text-lg sm:text-2xl whitespace-nowrap ${textColor}`}>
            {companyName}
          </span>
          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-widest whitespace-nowrap ${subtextColor} mt-1`}>
            {tagline}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * SR GROUP Official Logo
 */
export const SRGroupLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  lightMode = false,
}) => {
  const customLogo = useCustomLogoSafe('sr-group');

  const textColor = lightMode ? 'text-slate-950' : 'text-white';
  const subtextColor = lightMode ? 'text-blue-600' : 'text-sky-400';

  if (customLogo) {
    return (
      <RenderCustomLogoImage
        customLogo={customLogo}
        companyName="SR GROUP"
        tagline="ENGINEERING & INFRASTRUCTURE"
        size={size}
        showText={showText}
        lightMode={lightMode}
        className={className}
        textColor={textColor}
        subtextColor={subtextColor}
      />
    );
  }

  // Sized to match the natural 1.55:1 aspect ratio of the official emblem & typography
  const badgeSizeMap = {
    sm: 'h-9 w-14 p-1 rounded-lg',
    md: 'h-12 sm:h-14 w-18 sm:w-22 p-1 rounded-xl',
    lg: 'h-16 sm:h-20 w-24 sm:w-32 p-1.5 rounded-2xl',
    xl: 'h-24 sm:h-28 w-36 sm:w-44 p-2 rounded-2xl',
  };

  const logoSrc = SR_GROUP_LOGO_DATA_URL || '/sr_group_logo.jpg';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 shrink-0 flex-shrink-0 select-none ${className}`}>
      {/* Permanent Crisp White Rounded Badge Container */}
      <div className={`bg-white border border-slate-200/50 shadow-md flex items-center justify-center shrink-0 flex-shrink-0 transition-transform overflow-hidden ${badgeSizeMap[size]}`}>
        <img
          src={logoSrc}
          alt="SR GROUP Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = SR_GROUP_LOGO_DATA_URL;
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col shrink-0 min-w-0">
          <span className={`font-black font-mono tracking-wider leading-none text-xl sm:text-2xl whitespace-nowrap ${textColor}`}>
            SR GROUP
          </span>
          <span className={`text-[9px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap ${subtextColor} mt-1`}>
            ENGINEERING & INFRASTRUCTURE
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * SUHEL ENGINEERING Official Logo
 */
export const SuhelEngineeringLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  lightMode = false,
}) => {
  const customLogo = useCustomLogoSafe('suhel-engineering');

  const textColor = lightMode ? 'text-slate-900' : 'text-white';
  const subtextColor = lightMode ? 'text-amber-600' : 'text-amber-400';

  if (customLogo) {
    return (
      <RenderCustomLogoImage
        customLogo={customLogo}
        companyName="SUHEL ENGINEERING"
        tagline="Process Plant & Piping Execution"
        size={size}
        showText={showText}
        lightMode={lightMode}
        className={className}
        textColor={textColor}
        subtextColor={subtextColor}
      />
    );
  }

  const badgeSizeMap = {
    sm: 'w-9 h-9 p-0.5 rounded-lg',
    md: 'w-12 h-12 sm:w-13 sm:h-13 p-1 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-2xl',
  };

  const logoSrc = SUHEL_ENGINEERING_LOGO_DATA_URL || '/suhel_engineering_logo.jpg';

  return (
    <div className={`inline-flex items-center gap-3.5 shrink-0 flex-shrink-0 select-none ${className}`}>
      {/* Permanent Crisp White Rounded Badge Container */}
      <div className={`bg-white border border-slate-200/40 shadow-sm flex items-center justify-center shrink-0 flex-shrink-0 transition-transform overflow-hidden ${badgeSizeMap[size]}`}>
        <img
          src={logoSrc}
          alt="SUHEL ENGINEERING Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = SUHEL_ENGINEERING_LOGO_DATA_URL;
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col shrink-0 min-w-0">
          <span className={`font-black font-mono tracking-tight leading-none text-lg sm:text-2xl whitespace-nowrap ${textColor}`}>
            SUHEL ENGINEERING
          </span>
          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-widest whitespace-nowrap ${subtextColor} mt-1`}>
            Process Plant & Piping Execution
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * NEW SR INFRA Official Logo
 */
export const NewSrInfraLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  lightMode = false,
}) => {
  const customLogo = useCustomLogoSafe('sr-infra');

  const textColor = lightMode ? 'text-slate-900' : 'text-white';
  const subtextColor = lightMode ? 'text-blue-600' : 'text-blue-400';

  if (customLogo) {
    return (
      <RenderCustomLogoImage
        customLogo={customLogo}
        companyName="NEW SR INFRA"
        tagline="Infrastructure & Structural Execution"
        size={size}
        showText={showText}
        lightMode={lightMode}
        className={className}
        textColor={textColor}
        subtextColor={subtextColor}
      />
    );
  }

  const badgeSizeMap = {
    sm: 'w-9 h-9 p-0.5 rounded-lg',
    md: 'w-12 h-12 sm:w-13 sm:h-13 p-1 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-2xl',
  };

  const logoSrc = NEW_SR_INFRA_LOGO_DATA_URL || '/new_sr_infra_logo.jpg';

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 flex-shrink-0 select-none ${className}`}>
      {/* Permanent Crisp White Rounded Badge Container */}
      <div className={`bg-white border border-slate-200/40 shadow-sm flex items-center justify-center shrink-0 flex-shrink-0 transition-transform overflow-hidden ${badgeSizeMap[size]}`}>
        <img
          src={logoSrc}
          alt="NEW SR INFRA Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = NEW_SR_INFRA_LOGO_DATA_URL;
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col shrink-0 min-w-0">
          <span className={`font-black font-mono tracking-tight leading-none text-lg sm:text-xl whitespace-nowrap ${textColor}`}>
            NEW SR INFRA
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${subtextColor}`}>
            Infrastructure & Structural
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * SR POWER SOLUTION Official Logo
 */
export const SrPowerSolutionLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  lightMode = false,
}) => {
  const customLogo = useCustomLogoSafe('sr-power-solution');

  const textColor = lightMode ? 'text-slate-900' : 'text-white';
  const subtextColor = lightMode ? 'text-emerald-500' : 'text-emerald-400';

  if (customLogo) {
    return (
      <RenderCustomLogoImage
        customLogo={customLogo}
        companyName="SR POWER SOLUTION"
        tagline="Electrical & Power Systems"
        size={size}
        showText={showText}
        lightMode={lightMode}
        className={className}
        textColor={textColor}
        subtextColor={subtextColor}
      />
    );
  }

  const badgeSizeMap = {
    sm: 'w-9 h-9 p-0.5 rounded-lg',
    md: 'w-12 h-12 sm:w-13 sm:h-13 p-1 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 p-1.5 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-2xl',
  };

  const logoSrc = SR_POWER_SOLUTION_LOGO_DATA_URL || '/sr_power_solution_logo.jpg';

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 flex-shrink-0 select-none ${className}`}>
      {/* Permanent Crisp White Rounded Badge Container */}
      <div className={`bg-white border border-slate-200/40 shadow-sm flex items-center justify-center shrink-0 flex-shrink-0 transition-transform overflow-hidden ${badgeSizeMap[size]}`}>
        <img
          src={logoSrc}
          alt="SR POWER SOLUTION Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = SR_POWER_SOLUTION_LOGO_DATA_URL;
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col shrink-0 min-w-0">
          <span className={`font-black font-mono tracking-tight leading-none text-lg sm:text-xl whitespace-nowrap ${textColor}`}>
            SR POWER SOLUTION
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${subtextColor}`}>
            Electrical & Power Systems
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Company Logo Router / Selector Component
 */
export const CompanyLogo: React.FC<{
  companyId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
  className?: string;
}> = ({ companyId, size = 'md', showText = true, lightMode = false, className = '' }) => {
  switch (companyId) {
    case 'suhel-engineering':
      return <SuhelEngineeringLogo size={size} showText={showText} lightMode={lightMode} className={className} />;
    case 'sr-infra':
      return <NewSrInfraLogo size={size} showText={showText} lightMode={lightMode} className={className} />;
    case 'sr-power-solution':
      return <SrPowerSolutionLogo size={size} showText={showText} lightMode={lightMode} className={className} />;
    case 'sr-group':
    default:
      return <SRGroupLogo size={size} showText={showText} lightMode={lightMode} className={className} />;
  }
};
