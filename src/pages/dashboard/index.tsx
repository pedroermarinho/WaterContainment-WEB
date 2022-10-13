import React, {useEffect, useState} from 'react'
import {Row} from 'antd'
import 'flowbite'
import 'antd/dist/antd.css'
import './estilo.css'
import {ISensor} from '../../core/interface'
import CardChart from '../../components/CardChart'
import api from '../../core/services/api'
import Progress from '../../components/Progress'
import moment from "moment";

interface IData {
    date: string
    value: number
    name: string
}


const Dashboard: React.FC = () => {
    const [data, setData] = useState<ISensor[]>([])
    const [hourData, setHourData] = useState<IData[]>([])
    const [timeData, setTimeData] = useState<IData[]>([])
    const [dateHourData, setDateHourData] = useState<IData[]>([])
    const [dateData, setDateData] = useState<IData[]>([])

    const formatData = (data: ISensor[]) => {
        setHourData([])
        setTimeData([])
        setDateHourData([])
        setDateData([])

        data.forEach((element) => {
            setHourData((prev) => [
                ...prev,
                {
                    date: moment(element.createdAt).format('HH'),
                    value: element.litrosMin,
                    name: 'Por hora',
                },
            ])
            setTimeData((prev) => [
                ...prev,
                {
                    date: moment(element.createdAt).format('HH:mm:ss'),
                    value: element.litrosMin,
                    name: 'Por hora e minuto',
                },
            ])
            setDateData((prev) => [
                ...prev,
                {
                    date: moment(element.createdAt).format('DD/MM'),
                    value: element.litrosMin,
                    name: 'Por dia',
                },
            ])
            setDateHourData((prev) => [
                ...prev,
                {
                    date: moment(element.createdAt).format('DD/MM HH'),
                    value: element.litrosMin,
                    name: 'Por dia e hora',
                },
            ])

        })
    }

    const getData = (): void => {
        api.get<ISensor[]>(`sensor`).then((response) => {
            setData(response.data)
        })
    }

    useEffect(() => {
        setInterval(getData, 7000)
    }, [])

    useEffect(() => {
        formatData(data)
    }, [data])

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
                                                      value={hourData[hourData.length - 1]?.value ?? 0}
                                                      minProgress={20} mediumProgress={30}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Row justify="space-evenly">


                </Row>

                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full ">
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={hourData}
                                title={'Por hora'}
                                loading={false}
                            />
                        </h3>
                    </div>
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={timeData}
                                title={'Por hora e minuto'}
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
                                data={dateData}
                                title={'Por dia'}
                                loading={false}
                            />
                        </h3>
                    </div>
                    <div
                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6 ">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            <CardChart
                                data={dateHourData}
                                title={'Por dia e hora'}
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
