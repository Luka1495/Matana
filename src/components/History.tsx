import type { HistoryEntry, DataSetKey } from "../types";
import { dataLabels } from "../types";
interface HistoryProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
}

export const History = ({ history, onSelect }: HistoryProps) => {
  if (history.length === 0) {
    return <p className="text-gray-500">Nema spremljene povijesti.</p>;
  }

  return (
    <ul className="space-y-2">
      {history.map((entry, index) => (
        <li
          key={index}
          onClick={() => onSelect(entry)}
          className="bg-white p-3 rounded-md shadow hover:bg-blue-50 transition cursor-pointer"
        >
          {dataLabels[entry.dataSet as DataSetKey]} ({entry.viewType})
        </li>
      ))}
    </ul>
  );
};
