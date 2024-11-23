/// <reference types="react" />
import { SpringConfig } from '@react-spring/web';
import { PropertyAccessor } from '@nivo/core';
import { BoxPlotCommonProps, BoxPlotDatum, BoxPlotSummary, ComputedBoxPlotSummary, DataProps, LegendData } from './types';
import { LegendProps } from '@nivo/legends';
export declare const useLevels: <RawDatum extends BoxPlotDatum>(levels: string[] | null, data: RawDatum[], by: PropertyAccessor<RawDatum, string> | null) => string[] | null;
export declare const useBoxPlot: <RawDatum extends BoxPlotDatum>({ data, value, groupBy, groups, subGroupBy, subGroups, quantiles, width, height, layout, minValue, maxValue, valueScale, indexScale, padding, innerPadding, colorBy, colors, opacity, activeOpacity, inactiveOpacity, borderColor, medianColor, whiskerColor, legendLabel, tooltipLabel, valueFormat, legends, }: {
    data: RawDatum[];
    width: number;
    height: number;
} & Pick<BoxPlotCommonProps<RawDatum>, "legends" | "layout" | "padding" | "innerPadding" | "groupBy" | "subGroupBy" | "groups" | "subGroups" | "value" | "quantiles" | "maxValue" | "minValue" | "opacity" | "activeOpacity" | "inactiveOpacity" | "valueScale" | "indexScale" | "borderColor" | "medianColor" | "whiskerColor" | "valueFormat" | "legendLabel" | "tooltipLabel" | "colorBy" | "colors">) => {
    boxPlots: ComputedBoxPlotSummary[];
    xScale: import("@nivo/scales").ScaleLog | import("@nivo/scales").ScaleSymlog | import("@nivo/scales").ScaleBand<string> | import("@nivo/scales").ScaleLinear<number> | import("@nivo/scales").ScaleTime<Date | import("d3-scale").NumberValue> | import("@nivo/scales").ScalePoint<import("@nivo/scales").ScaleValue> | import("@nivo/scales").ScaleBand<import("@nivo/scales").ScaleValue>;
    yScale: import("@nivo/scales").ScaleLog | import("@nivo/scales").ScaleSymlog | import("@nivo/scales").ScaleBand<string> | import("@nivo/scales").ScaleLinear<number> | import("@nivo/scales").ScaleTime<Date | import("d3-scale").NumberValue> | import("@nivo/scales").ScalePoint<import("@nivo/scales").ScaleValue> | import("@nivo/scales").ScaleBand<import("@nivo/scales").ScaleValue>;
    getTooltipLabel: (datum: BoxPlotSummary) => string;
    formatValue: (value: number) => string;
    getColor: import("@nivo/colors").OrdinalColorScale<BoxPlotSummary>;
    getBorderColor: import("@nivo/colors").InheritedColorConfigCustomFunction<ComputedBoxPlotSummary> | ((d: ComputedBoxPlotSummary) => any);
    getMedianColor: import("@nivo/colors").InheritedColorConfigCustomFunction<ComputedBoxPlotSummary> | ((d: ComputedBoxPlotSummary) => any);
    getWhiskerColor: import("@nivo/colors").InheritedColorConfigCustomFunction<ComputedBoxPlotSummary> | ((d: ComputedBoxPlotSummary) => any);
    legendsData: [LegendProps, LegendData[]][];
    activeItem: ComputedBoxPlotSummary | null;
    setActiveItem: import("react").Dispatch<import("react").SetStateAction<ComputedBoxPlotSummary | null>>;
};
export declare const useBoxPlotTransition: ({ boxPlots, getBorderColor, getMedianColor, getWhiskerColor, animate, springConfig, }: {
    boxPlots: ComputedBoxPlotSummary[];
    getBorderColor: (d: ComputedBoxPlotSummary) => string;
    getMedianColor: (d: ComputedBoxPlotSummary) => string;
    getWhiskerColor: (d: ComputedBoxPlotSummary) => string;
    animate: boolean;
    springConfig: SpringConfig;
}) => import("@react-spring/core").TransitionFn<ComputedBoxPlotSummary, {
    opacity: number;
    borderColor: string;
    medianColor: string;
    whiskerColor: string;
    color: string;
    transform: string;
    valueInterval: number;
    valueDistance0: number;
    valueDistance1: number;
    valueDistance3: number;
    valueDistance4: number;
}>;
//# sourceMappingURL=hooks.d.ts.map