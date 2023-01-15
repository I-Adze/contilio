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
import styles from "./Dashboard.module.scss";

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
        labels: value.attributes.map(
          (attribute) => `${attribute.name} / ${attribute.unit}`
        ),
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
      <section className={styles.page}>
        <h2>{this.state.selectedValue.title}</h2>
        <section className={styles.displays}>
          <section className={styles.table}>
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
          <section className={styles.chart}>
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
        </section>
        <section>
          <input
            type="range"
            defaultValue={0}
            max={this.state.values.length - 1}
            onChange={(e) =>
              this.selectValue(this.state.values[parseInt(e.target.value)])
            }
          ></input>
        </section>
      </section>
    ) : (
      <></>
    );
  }
}
