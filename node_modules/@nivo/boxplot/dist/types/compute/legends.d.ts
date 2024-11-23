import { BoxPlotDatum, BoxPlotCommonProps, ComputedBoxPlotSummary, LegendData } from '../types';
export declare const getLegendData: <RawDatum extends BoxPlotDatum>({ boxPlots, dataFrom, legendLabel, }: {
    boxPlots: ComputedBoxPlotSummary[];
    dataFrom: "group" | "subGroup";
    legendLabel: import("@nivo/core").PropertyAccessor<import("../types").BoxPlotSummary, string> | undefined;
}) => LegendData[];
//# sourceMappingURL=legends.d.ts.map