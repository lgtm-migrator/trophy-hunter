import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Combat = (props: Omit<FilterProps, 'title'>) => {
  const color = props.selected && !props.disabled ? '#FF9330' : '#77777A';
  const secondaryColor =
    props.selected && !props.disabled ? '#D6873E' : '#636365';

  return (
    <Filter title="Combat" {...props}>
      <svg
        width="92"
        height="92"
        viewBox="0 0 92 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 1L1 12.7692V81.3077L10 91H82L91 81.3077V12.7692L82 1H10Z"
          stroke={color}
        />
        <Path
          d="M41.9216 45.3694L37.622 49.669L34.8983 46.9454L39.1979 42.6458L39.1893 41.0831L62.3968 17.8756L67.3923 16.9656L66.6918 22.1706L43.4843 45.3781L41.9216 45.3694Z"
          fill={color}
        />
        <Path
          d="M41.9216 45.3694L37.622 49.669L36.1554 48.2024L40.455 43.9028L67.3923 16.9656L66.6918 22.1706L43.4843 45.3781L41.9216 45.3694Z"
          fill={secondaryColor}
        />
        <Path
          d="M33.4375 46.417L37.3486 47.2199L34.3441 50.2245L28.0587 43.9391L26.7032 43.7232L29.5523 40.8741L29.5091 42.4886L33.4375 46.417Z"
          fill="#3F3E43"
        />
        <Path
          d="M38.1515 51.131L37.3486 47.2199L34.3441 50.2245L40.6295 56.5099L40.8453 57.8654L43.6944 55.0162L42.0799 55.0594L38.1515 51.131Z"
          fill="#46454B"
        />
        <Path
          d="M24.5992 59.0255L25.6992 60.1255L27.3655 60.0305L28.3497 59.0462L28.3923 57.3276L27.3448 56.28L25.6261 56.3226L24.6418 57.3068L24.5992 59.0255Z"
          fill={color}
        />
        <Path
          d="M25.1754 59.6017L25.6992 60.1255L27.3655 60.0305L28.3497 59.0462L28.3923 57.3276L27.9209 56.8561L25.1754 59.6017Z"
          fill={secondaryColor}
        />
        <Path
          d="M28.7067 57.6417L35.2856 51.0628L33.6095 49.3867L27.0306 55.9656L28.7067 57.6417Z"
          fill="#3F3E43"
        />
        <Path
          d="M51.0033 45.3696L55.3029 49.6692L58.0266 46.9455L53.727 42.6459L53.7357 41.0832L30.5282 17.8757L25.5327 16.9657L26.2332 22.1707L49.4406 45.3782L51.0033 45.3696Z"
          fill={color}
        />
        <Path
          d="M51.0033 45.3696L55.3029 49.6692L56.7695 48.2026L52.4699 43.903L25.5327 16.9657L26.2332 22.1707L49.4406 45.3782L51.0033 45.3696Z"
          fill={secondaryColor}
        />
        <Path
          d="M59.4875 46.4169L55.5764 47.2199L58.5809 50.2244L64.8663 43.939L66.2218 43.7232L63.3727 40.8741L63.4158 42.4886L59.4875 46.4169Z"
          fill="#3F3E43"
        />
        <Path
          d="M54.7734 51.131L55.5764 47.2199L58.5809 50.2244L52.2955 56.5098L52.0797 57.8653L49.2305 55.0162L50.845 55.0594L54.7734 51.131Z"
          fill="#46454B"
        />
        <Path
          d="M68.3257 59.0255L67.2257 60.1255L65.5594 60.0305L64.5752 59.0462L64.5326 57.3276L65.5802 56.28L67.2988 56.3226L68.2831 57.3068L68.3257 59.0255Z"
          fill={color}
        />
        <Path
          d="M67.7495 59.6017L67.2257 60.1255L65.5594 60.0305L64.5752 59.0462L64.5326 57.3276L65.004 56.8561L67.7495 59.6017Z"
          fill={secondaryColor}
        />
        <Path
          d="M64.2182 57.6417L57.6393 51.0628L59.3154 49.3867L65.8943 55.9656L64.2182 57.6417Z"
          fill="#3F3E43"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 43.0562 19.2921)"
          fill={color}
        />
      </svg>
    </Filter>
  );
};

export default Combat;
