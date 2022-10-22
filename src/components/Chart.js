import { Bar, Pie, Line } from "react-chartjs-2";
import {useState, useEffect } from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';


export const Chart = ({x_axis,y_axis,group_by,filter_by,order_by,limit,csv_file, chartLabel, ChartType}) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }]
    });

    useEffect(() => {
        axios.post('http://localhost:8000/data',{
            x_axis: x_axis,
            y_axis:  y_axis,
            group_by: group_by,
            filter_by: filter_by,
            order_by: order_by,  //cannot be the same as x_axis
            limit: limit,
            csv_file: csv_file,
           // cross_check_with: "You get the idea",
        }
        
        ).then((res) => {
            const return_data = res.data;
            const labels = return_data.map((item) => item.name);
            const datasets = [{
                label : return_data.map((item) => item.name),
                data: return_data.map((item) => item.value),
                backgroundColor: return_data.map((item) => item.backgroundColour),
                borderColor: return_data.map((item) => item.borderColour),
                borderWidth: 1,

            }]
            setChartData({labels, datasets});
        });
    }, []);

    const Chart = () => {
        if (ChartType === "HorizontalBar") {
            return <Bar data={chartData}  options={{indexAxis:'y', maxWidth:20}} />
        }
        else if (ChartType === "Bar") {
            return <Bar data={chartData} />
        }
        else if (ChartType === "Pie") {
            return <Pie data={chartData} />
        }
        else {
            return <Line data={chartData} />
        }
    }

    return (
      <div style={{ width: "300px" }} className="col-span-1">
        <h2>{chartLabel}</h2>
       {Chart()}
      </div>
    )
}