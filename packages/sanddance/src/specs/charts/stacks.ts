// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { Band, BandProps } from '../layouts/band';
import { defaultBins, maxbins, minBarBandWidth } from '../defaults';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Stack, StackProps } from '../layouts/stack';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const axisScales: AxisScales = {
        x: { title: specColumns.x && specColumns.x.name },
        y: { title: specColumns.y && specColumns.y.name }
    };
    const hBandProps: BandProps = {
        excludeEncodingRuleMap: true,
        orientation: 'horizontal',
        groupby: {
            column: specColumns.y,
            defaultBins,
            maxbinsSignalName: SignalNames.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true,
        parentHeight: 'hBandParentHeight',
    };
    const vBandProps: BandProps = {
        excludeEncodingRuleMap: true,
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins,
            maxbinsSignalName: SignalNames.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins
        },
        minBandWidth: minBarBandWidth,
        showAxes: true,
        parentHeight: 'vBandParentHeight'
    };
    const stackProps: StackProps = {
        sort: specColumns.sort,
        parentHeight: vBandProps.parentHeight
    };
    return {
        axisScales,
        customZScale: true,
        layouts: [
            {
                layoutClass: Band,
                props: vBandProps
            },
            {
                layoutClass: Band,
                props: hBandProps
            },
            {
                layoutClass: Stack,
                props: stackProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.XBins]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    signals: [SignalNames.YBins]
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [SignalNames.FacetBins]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [SignalNames.FacetVBins]
                }
            ]
        }
    };
}
