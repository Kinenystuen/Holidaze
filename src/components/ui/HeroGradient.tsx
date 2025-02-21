/**
 *
 * HeroGradient component.
 * - Renders a gradient background for the hero section.
 * @returns {JSX.Element} The HeroGradient component.
 */

const HeroGradient = () => {
  return (
    <div className="flex justify-center absolute inset-0 z-0 text-gray-300 dark:text-gray-600 opacity-40 dark:opacity-50">
      <svg
        width="1278"
        height="829"
        viewBox="0 0 1278 829"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
            <stop stop-color="#DA7EFB" stop-opacity="0.3" />
            <stop offset="0.415" stop-color="#B185D6" stop-opacity="0.117778" />
            <stop offset="0.675" stop-color="#9789BD" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stop-color="#9789BD" stop-opacity="0.3" />
            <stop offset="0.54" stop-color="#9789BD" stop-opacity="0.1" />
            <stop offset="1" stop-color="#9789BD" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stop-color="#9789BD" stop-opacity="0.2" />
            <stop offset="0.36" stop-color="#E4E0EE" stop-opacity="0.0772727" />
            <stop offset="0.66" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(639.25 414.5) rotate(90) scale(414 638.75)"
          >
            <stop stop-color="#DA7EFB" stop-opacity="0.3" />
            <stop offset="1" stop-color="#9789BD" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_4_53"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(453.91 504.094) rotate(90) scale(195.637 275.655)"
          >
            <stop stop-color="#DA7EFB" stop-opacity="0.2" />
            <stop offset="1" stop-color="#DA7EFB" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroGradient;
