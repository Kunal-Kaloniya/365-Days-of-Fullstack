// === Real-Time Data Visualization ===
// The challenge here isn't just showing a chart; it's efficiently pushing data from your Node.js backend to the frontend without overloading the browser.
// 
// === The Push-Stream Pattern ===
// 1. The Event Loop: When a new order is saved in MongoDB, your backend "emits" a socket event (e.g., new_sale).
// 2. The Data Payload: Instead of sending the entire dataset, you send only the new data point { x: '10:05', y: 450 }.
// 3. Chart.js Integration: On the frontend, you take this new point and "push" it into the chart's data array. If the array gets too long, you "shift" (remove) the oldest point to keep the UI smooth.
// 
// 
// MICROLAB
// Create a live "Traffic Monitor" chart that updates every time a request hits your API.
import { Line } from 'react-chartjs-2';
import { socket } from './socket';

export default function RealTimeChart() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [...] });

    useEffect(() => {
        socket.on('update_metrics', (newDataPoint) => {
            setChartData(prev => {
                const newLabels = [...prev.labels, newDataPoint.time].slice(-10); // Keep last 10
                const newData = [...prev.datasets[0].data, newDataPoint.value].slice(-10);

                return {
                    ...prev,
                    labels: newLabels,
                    datasets: [{ ...prev.datasets[0], data: newData }]
                };
            });
        });
        return () => socket.off('update_metrics');
    }, []);

    return <Line data={chartData} options={{ animation: { duration: 0 } }} />;
}