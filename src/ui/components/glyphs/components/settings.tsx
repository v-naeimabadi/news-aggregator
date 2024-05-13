import { forwardRef, ReactElement, SVGProps, LegacyRef } from "react";
import styled from "styled-components";

function SettingsBase(
  props: SVGProps<SVGSVGElement>,
  ref: LegacyRef<SVGSVGElement>,
): ReactElement {
  return (
    <svg width="26px" height="26px" viewBox="0 0 26 26" ref={ref} {...props}>
      <g>
        <g transform="translate(-848, -158)">
          <g transform="translate(850, 160)">
            <path d="M14.2419238,0 L14.2431082,2.72507216 L14.2875702,2.74248513 C14.3674037,2.77411427 14.446603,2.8068449 14.5251383,2.84066962 L14.5536481,2.85311875 L16.4806841,0.924533255 L21.0718425,5.51569163 L19.1443875,7.44306904 L19.1727037,7.50873795 C19.1959638,7.56357271 19.2187043,7.61870376 19.2409257,7.67412854 L19.2719319,7.75281984 L22,7.7560052 L21.9984026,14.2449587 L19.2735818,14.2448897 L19.2599841,14.2800016 C19.2286392,14.3597773 19.1961357,14.4390493 19.1624928,14.517778 L19.1467547,14.5539949 L21.0731572,16.4813328 L16.4842924,21.0685619 L14.5563023,19.1446625 L14.4783752,19.178156 C14.4232627,19.2015246 14.367963,19.2243118 14.3124818,19.2465125 L14.2480579,19.2718483 L14.2508781,21.9959664 L7.75435327,21.9995608 L7.75555763,19.2737851 L7.68302912,19.2451876 C7.62738951,19.2228995 7.57198027,19.2000539 7.51681013,19.1766556 L7.4432961,19.1449495 L5.51866351,21.0725068 L0.927276997,16.4811203 L2.8537045,14.5546405 L2.82522422,14.4887945 C2.80180362,14.4338216 2.77890964,14.3785541 2.75654588,14.3230029 L2.7254427,14.2446745 L0.0015973978,14.2447166 L0,7.75565226 L2.72716433,7.75281984 L2.74484701,7.70767715 C2.77639466,7.62796838 2.80902466,7.54891756 2.84273586,7.47054427 L2.85470878,7.44314077 L0.925246766,5.51367976 L5.5185854,0.929543755 L7.44343957,2.8540513 L7.46722366,2.84377493 C7.54546092,2.8101649 7.62447743,2.77757409 7.70426598,2.74599413 L7.75534242,2.72600471 L7.75415783,0.00199732913 L14.2419238,0 Z M12.3059103,1.93735247 L9.69182297,1.93821329 L9.69289111,4.13367733 L9.00527107,4.34227388 C8.53621841,4.48456578 8.10302633,4.66249292 7.70662375,4.87715603 L7.07151045,5.22108769 L5.51728883,3.66709337 L3.66567054,5.51498146 L5.22243661,7.07176531 L4.87802623,7.70707745 C4.66107211,8.10727905 4.48314912,8.53941754 4.34533643,8.99881449 L4.1385211,9.68823095 L1.93722087,9.69044815 L1.93793822,12.3078353 L4.1327639,12.3078774 L4.34096356,12.995754 C4.47894518,13.4516352 4.65912176,13.8870439 4.87792328,14.2928894 L5.22003808,14.9274635 L3.66631615,16.4810782 L5.51757577,18.3323378 L7.06706974,16.7806299 L7.70113365,17.1199164 C8.11535274,17.3415644 8.55109679,17.5214589 9.00131208,17.6558367 L9.69308793,17.8623142 L9.69203818,20.0616483 L12.3120078,20.0601419 L12.3097723,17.857539 L13.0048884,17.6524469 C13.4464979,17.5221512 13.8788919,17.3434411 14.2974088,17.11972 L14.9301412,16.7814886 L16.4830986,18.3311183 L18.3340713,16.4807195 L16.7827269,14.9285879 L17.1228124,14.2948046 C17.3418902,13.8865314 17.5201738,13.4522128 17.6519683,13.0035811 L17.856274,12.3081195 L20.0619471,12.3080505 L20.0626645,9.69059162 L17.8635889,9.68811251 L17.655638,9.00105796 C17.5167137,8.54206195 17.3383119,8.10881734 17.1201677,7.70200966 L16.7802738,7.06815604 L18.3327084,5.51562707 L16.4812335,3.66415224 L14.9249891,5.22175903 L14.2892293,4.87665862 C13.8881539,4.65894861 13.454844,4.48019353 12.9973873,4.34327459 L12.3069793,4.13663226 L12.3059103,1.93735247 Z M11.0000054,5.47983299 C14.0735285,5.47983299 16.5188912,7.96051951 16.5202147,11.000934 C16.521912,14.0441709 14.0446544,16.5206056 11.0000054,16.5206056 C10.6818516,16.5206056 10.3647133,16.4924887 10.0421886,16.4382663 L9.95508994,16.4223183 C7.35368976,15.9239055 5.47526524,13.6546472 5.47835288,10.998964 C5.47835288,9.52708567 6.05450662,8.13582661 7.09572677,7.09628274 C8.13878753,6.05461227 9.52636915,5.47983299 11.0000054,5.47983299 Z M11.0000054,7.41667221 C10.0398461,7.41667221 9.14444429,7.78757537 8.46427021,8.46684284 C7.78709689,9.14292598 7.41519411,10.0409713 7.41519411,11.0000924 C7.41318799,12.7259087 8.63047075,14.1965135 10.3200077,14.5201639 L10.3652928,14.5284589 L10.4288751,14.5387533 C10.6030271,14.565348 10.7716179,14.5802292 10.9377956,14.5832077 L11.0000054,14.5837664 C12.9749313,14.5837664 14.5844754,12.974757 14.5833751,11.0018957 C14.5825143,9.02436641 12.9977129,7.41667221 11.0000054,7.41667221 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const RefForwardingSettings = forwardRef(SettingsBase);

export const Settings = styled(RefForwardingSettings).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["width", "height", "color"].includes(prop) && defaultValidatorFn(prop),
})<{
  height: number;
  width: number;
  color: string;
}>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  & > * {
    fill: ${({ color }) => color} !important;
  }
`;
