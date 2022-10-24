import {Line} from "@ant-design/plots";

interface IData {
    date: string,
    value: number,
    name: string
}

interface IProps {
    data: IData[],
    title: string,
    end?: string,
    loading: boolean
}

interface IConfig {
    data: any,
    xField: string,
    yField: string,
    slider?: any,
    seriesField: string,
    legend: Object,
    smooth?: boolean,
    animation?: Object,
    tooltip: Object,
    xAxis: Object,
    yAxis: Object,
}

const CardChart: React.FC<IProps> = ({data, title, loading,end}) => {

    const maxValue = () => {
        const valueMax: number = Math.max(...data.map((item) => item.value))
        return (valueMax * 1.01)
    }


    const minValue = () => {
        const valueMin: number = Math.min(...data.map((item) => item.value))
        return (valueMin - valueMin * 0.01)
    }

    const maxDate = () => {
        const dateMax: string = end ?? data[data.length - 1]?.date ?? '1'
        return dateMax
    }

    const config: IConfig = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'name',
        legend: {
            position: 'top'
        },
        smooth: true,
        // animation: {
        //     appear: {
        //         animation: 'path-in',
        //         duration: 5000,
        //     },
        // },
        tooltip: {
            title: (value: string) => `Data: ${value}`,
            formatter: (value: { name: string, value: number }) => ({
                name: value.name,
                value: value.value.toFixed(2)
            })
        },
        xAxis: {
            label: {
                formatter: (value: string) => `${value}`,
            },
        },
        yAxis: {
            max: maxValue(),
            min: minValue(),
            label: {
                formatter: (value: any) => `${Number(value).toFixed(2)}`,
            }
        },
        slider: {
            start: 0,
            end: maxDate(),

        },
    };

    return <>
        <h1>{title}</h1>
        <Line loading={loading} {...config}/>
    </>
}

export default CardChart