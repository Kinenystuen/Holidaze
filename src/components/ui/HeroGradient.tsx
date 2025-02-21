import React from "react";

/**
 * HeroGradient component.
 * - Renders a gradient background for the hero section.
 * @returns {JSX.Element} The HeroGradient component.
 */
const HeroGradient: React.FC = () => {
  return (
    <div className="flex mt-[-4rem] md:mt-[-0rem] justify-center absolute inset-0 z-0 text-gray-300 dark:text-gray-600 opacity-40 dark:opacity-10">
      <svg
        width="1278"
        height="829"
        viewBox="0 0 1278 829"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0.5 0.5H1267.66L1272 828.5L0.5 818V0.5Z"
          fill="url(#paint0_radial_4_53)"
        />
        <path
          d="M0.5 0.5H1278L1254 818H0.5L32 50L0.5 0.5Z"
          fill="url(#paint1_radial_4_53)"
        />
        <path
          d="M0.5 0.5H1278L1267.66 817.827L0.5 818V0.5Z"
          fill="url(#paint2_radial_4_53)"
        />
        <path
          d="M0.5 0.5H1278L1267.66 817.827L0.5 818V0.5Z"
          fill="url(#paint3_radial_4_53)"
        />
        <path
          d="M0.5 0.5H1267.66L1278 818H0.5V0.5Z"
          fill="url(#paint4_radial_4_53)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stopColor="#DA7EFB" stopOpacity="0.3" />
            <stop offset="0.415" stopColor="#B185D6" stopOpacity="0.117778" />
            <stop offset="0.675" stopColor="#9789BD" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stopColor="#9789BD" stopOpacity="0.3" />
            <stop offset="0.54" stopColor="#9789BD" stopOpacity="0.1" />
            <stop offset="1" stopColor="#9789BD" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stopColor="#9789BD" stopOpacity="0.2" />
            <stop offset="0.36" stopColor="#E4E0EE" stopOpacity="0.0772727" />
            <stop offset="0.66" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stopColor="#DA7EFB" stopOpacity="0.3" />
            <stop offset="1" stopColor="#9789BD" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(453.91 504.094) rotate(90) scale(195.637 275.655)"
          >
            <stop stopColor="#DA7EFB" stopOpacity="0.2" />
            <stop offset="1" stopColor="#DA7EFB" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroGradient;
