import * as React from 'react';
import { pure } from "recompose";
import PropTypes from "prop-types";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
    Legend,
    Title, Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {ArgumentScale, EventTracker, Animation, ValueScale} from "@devexpress/dx-react-chart";
import {useEffect, useState} from "react";


const RegisteredBusinessChart = ({chartData}) => {

    const titleComponent = () => <div className="font-size-md mb-4 text-center w-100">Monthly chart of registered businesses</div>;

    const getCount = (month) => {
        const monthData = chartData.find(item => item.month == month);
        return (monthData && monthData.count) || 0;
    }

    const data = [
        { month: 'Jan', accounts: getCount('1') },
        { month: 'Feb', accounts: getCount('2')},
        { month: 'Mar', accounts: getCount('3')},
        { month: 'Apr', accounts: getCount('4')},
        { month: 'May', accounts: getCount('5')},
        { month: 'Jun', accounts: getCount('6') },
        { month: 'Jul', accounts: getCount('7') },
        { month: 'Aug', accounts: getCount('8') },
        { month: 'Sept', accounts: getCount('9') },
        { month: 'Oct', accounts: getCount('10') },
        { month: 'Nov', accounts: getCount('11') },
        { month: 'Dec', accounts: getCount('12') },
    ];

    return (
        <div className="border-main p-2">
            <Chart
                data={data}
            >
                <ValueScale  />
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                    valueField="accounts"
                    argumentField="month"
                />

                <EventTracker />
                <Tooltip />
                <Animation />

                <Title textComponent={titleComponent} />
            </Chart>
        </div>
    );
}

RegisteredBusinessChart.propTypes = {
    chartData: PropTypes.array
};

export default pure(RegisteredBusinessChart);
