import React from "react";

interface Value {
  title: string;
  attributes: { name: string; value: number; unit: "m" | "kg" }[];
}

interface DashboardState {
  values: Value[];
  selectedValue?: Value;
}

export class Dashboard extends React.Component<{}, DashboardState> {
  state = { values: [], selectedValue: undefined } as DashboardState;
  async componentDidMount() {
    const res = await fetch("./data.json");
    const data = await res.json();
    this.setState({ values: data, selectedValue: data[0] });
  }

  render() {
    return this.state.selectedValue ? (
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
    ) : (
      <></>
    );
  }
}
