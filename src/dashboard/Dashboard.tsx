import React from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, ChartData } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

interface Value {
  title: string;
  attributes: { name: string; value: number; unit: "m" | "kg" }[];
}

interface DashboardState {
  values: Value[];
  selectedValue?: Value;
  chartData?: ChartData<"bar">;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export class Dashboard extends React.Component<{}, DashboardState> {
  state = {
    values: [],
    selectedValue: undefined,
    chartData: undefined,
  } as DashboardState;

  async componentDidMount() {
    const res = await fetch("./data.json");
    const data = await res.json();
    this.setState({ values: data });
    this.selectValue(data[0]);
  }

  selectValue(value: Value) {
    this.setState({
      selectedValue: value,
      chartData: {
        labels: value.attributes.map((attribute) => attribute.name),
        datasets: [
          {
            data: value.attributes.map((attribute) => attribute.value),
            backgroundColor: "rgb(0, 185, 255)",
          },
        ],
      },
    });
  }

  render() {
    return this.state.selectedValue ? (
      <>
        <section>
          <h2>{this.state.selectedValue.title}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectedValue.attributes.map((attribute, i) => (
                <tr key={i}>
                  <td>{attribute.name}</td>
                  <td>
                    {attribute.value}({attribute.unit})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={this.state.chartData!}
          ></Bar>
        </section>
      </>
    ) : (
      <></>
    );
  }
}
