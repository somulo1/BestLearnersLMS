import { ScaleBand, ScaleBandSpec, ScaleLinearSpec, ScaleLogSpec, ScaleSymlogSpec, ScaleTimeSpec } from '@nivo/scales';
import { BoxPlotSummary, ComputedBoxPlotSummary } from '../types';
export declare const generateBoxPlots: ({ data, layout, groups, subGroups, formatValue, minValue, maxValue, width, height, padding, innerPadding, valueScale: valueScaleConfig, indexScale: indexScaleConfig, getTooltipLabel, }: {
    data: BoxPlotSummary[];
    layout: string;
    groups: string[] | null;
    subGroups: string[] | null;
    formatValue: (value: number) => string;
    minValue: 'auto' | number;
    maxValue: 'auto' | number;
    width: number;
    height: number;
    padding: number;
    innerPadding: number;
    valueScale: ScaleLinearSpec | ScaleLogSpec | ScaleSymlogSpec | ScaleTimeSpec;
    indexScale: ScaleBandSpec;
    getTooltipLabel: (datum: BoxPlotSummary) => string;
}) => {
    xScale: import("@nivo/scales").ScaleLog | import("@nivo/scales").ScaleSymlog | ScaleBand<string> | import("@nivo/scales").ScaleLinear<number> | import("@nivo/scales").ScaleTime<Date | import("d3-scale").NumberValue> | import("@nivo/scales").ScalePoint<import("@nivo/scales").ScaleValue> | ScaleBand<import("@nivo/scales").ScaleValue>;
    yScale: import("@nivo/scales").ScaleLog | import("@nivo/scales").ScaleSymlog | ScaleBand<string> | import("@nivo/scales").ScaleLinear<number> | import("@nivo/scales").ScaleTime<Date | import("d3-scale").NumberValue> | import("@nivo/scales").ScalePoint<import("@nivo/scales").ScaleValue> | ScaleBand<import("@nivo/scales").ScaleValue>;
    boxPlots: ComputedBoxPlotSummary[];
};
//# sourceMappingURL=generation.d.ts.map