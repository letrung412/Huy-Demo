import {Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  BarController, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend} 
from "chart.js";
import { convertDataChart} from './convertDataChart';

ChartJS.register(CategoryScale, BarController, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


export const BarChart = (props) => {
  const { data, type } = props; 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "THỐNG KÊ",
      },
      tooltip: {
        callbacks: {
          title: function (type) {
            return type === "total" ? "Tổng tiền: " : "Số lượng đơn hàng: ";
          }
        }
      },
    },
  };  
  if (type === "amount") {
    options.indexAxis = "y"
  }
  const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const dataChart = {
    labels,
    datasets: convertDataChart(data, type)
  };
  return <div>
    <Bar style={{margin:"0 60px 40px 60px"}} options={options} data={dataChart} />
  </div>;
}
