export type DataSetKey = "salaries" | "population";

export interface DataEntry {
  label: string;
  value: number;
}

export interface HistoryEntry {
  dataSet: DataSetKey;
  viewType: ViewType;
}

export type ViewType = "table" | "bar" | "pie";

export const dataLabels: { [key in DataSetKey]: string } = {
  salaries: "Prosječne plaće po gradu",
  population: "Broj stanovnika po županiji",
};
