import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Row} from 'antd'
import 'flowbite'
import 'antd/dist/antd.css'
import './estilo.css'
import CardChart from '../../components/CardChart'
import api from '../../core/services/api'
import Progress from '../../components/Progress'
import {IYearView} from "../../core/interface/IYearView";
import {IMonthView} from "../../core/interface/IMonthView";
import {IHourView} from "../../core/interface/IHourView";
import {IHourAndMinuteView} from "../../core/interface/IHourAndMinuteView";
import {IDayOfWeekView} from "../../core/interface/IDayOfWeekView";
import {IDayOFMonthView} from "../../core/interface/IDayOFMonthView";
import {ISensor} from "../../core/interface";

interface IData {
    date: string
    value: number
    name: string
}


const Dashboard: React.FC = () => {

    const [yaerData, setYaerData] = useState<IData[]>([])
    const [monthData, setMonthData] = useState<IData[]>([])
    const [hourData, setHourData] = useState<IData[]>([])
    const [hourAndMinuteData, setHourAndMinuteData] = useState<IData[]>([])
    const [dayOfWeekData, setDayOfWeekData] = useState<IData[]>([])
    const [dayOfMonthData, setDayOfMonthData] = useState<IData[]>([])

    const [sensorData, setSensorData] = useState<IData[]>([])


    const getYearData = (): void => {
        api.get<IYearView[]>(`sensor/year`).then((response) => {
            setYaerData(response.data.map((item) => (
                {
                    date: item.year.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por ano'
                }
            )))
        })
    }

    const getMonthData = (): void => {
        api.get<IMonthView[]>(`sensor/month`).then((response) => {
            setMonthData(response.data.map((item) => (
                {
                    date: item.month.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por mês'
                }
            )))
        })
    }

    const getHourData = (): void => {
        api.get<IHourView[]>(`sensor/hour`).then((response) => {
            setHourData(response.data.map((item) => (
                {
                    date: item.hour.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por hora'
                }
            )))
        })
    }

    const getHourAndMinuteData = (): void => {
        api.get<IHourAndMinuteView[]>(`sensor/hourAndMinute`).then((response) => {
            setHourAndMinuteData(response.data.map((item) => (
                {
                    date: item.hour.toString() + ':' + item.minute.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por hora e minuto'
                }
            )))
        })
    }



    const getDayOfWeekData = (): void => {
        api.get<IDayOfWeekView[]>(`sensor/dayOfWeek`).then((response) => {
            setDayOfWeekData(response.data.map((item) => (
                {
                    date: item.dayOfWeek.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por dia da semana'
                }
            )))
        })
    }


    const getDayOfMonthData = (): void => {
        api.get<IDayOFMonthView[]>(`sensor/dayOfMonth`).then((response) => {
            setDayOfMonthData(response.data.map((item) => (
                {
                    date: item.dayOfMonth.toString(),
                    value: item.litrosMinAvg,
                    name: 'Por dia do mês'
                }
            )))
        })
    }

    const getSensorData = (): void => {
        api.get<ISensor[]>(`sensor`).then((response) => {
            setSensorData(response.data.map((item) => (
                {
                    date: item.id.toString(),
                    value: item.litrosMin,
                    name: 'Por sensor'
                }
            )))
        })
    }


    useEffect(() => {
        const interval =  setInterval(() => {
            getYearData()
            getMonthData()
            getHourData()
            getHourAndMinuteData()
            getDayOfWeekData()
            getDayOfMonthData()
            getSensorData()
        }, 30000)
        return () => clearInterval(interval);
    }, [])
    return (
        <section className="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0">
            <main className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
                <div
                    className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-gradient-to-r from-green-300 to-green-500 rounded-md	">
                    <div className="mx-auto container py-12 px-4">
                        <div className="w-full flex justify-center">
                            <div
                                className="w-full md:w-11/12 xl:w-10/12 bg-gradient-to-r from-emerald-500 to-emerald-700 md:py-4 md:px-4 px-3 py-2 xl:px-6 xl:py-8 rounded-md">
                                <div>
                                    <div className="flex flex-wrap items-center md:flex-row flex-col-reverse">
                                        <div
                                            className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                                            <div>
                                                <h1
                                                    role="heading"
                                                    className="text-xl md:text-2xl lg:text-4xl xl:text-4xl text-white font-black leading-6 lg:leading-10 md:text-left text-center"
                                                >
                                                    Bem vindo ao WATER CONTAINMENT
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="md:w-1/3 w-2/3">
                                            <Progress title="Ultimo fluxo registrado" max={60} min={0}
                                                      value={sensorData[sensorData.length - 1]?.value ?? 0}
                                                      minProgress={1} mediumProgress={10}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Row justify="space-evenly">
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-8 shadow-lg  lg:m-8 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={hourAndMinuteData}
                                title="Por hora e minuto"
                                loading={false}
                                end="23"
                            />
                        </h3>
                    </div>
                </Row>

                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full ">
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={hourData}
                                title="Por hora"
                                loading={false}
                            />
                        </h3>
                    </div>
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={monthData}
                                title="Por mês"
                                loading={false}
                            />
                        </h3>
                    </div>
                </div>
                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full ">
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={dayOfWeekData}
                                title="Por dia da semana"
                                loading={false}
                            />
                        </h3>
                    </div>
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={dayOfMonthData}
                                title="Por dia do mês"
                                loading={false}
                            />
                        </h3>
                    </div>
                </div>



            </main>
        </section>
    )
}

export default Dashboard
