interface TableViewProps {
  data: { label: string; value: number }[];
}

export const TableView = ({ data }: TableViewProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-gray-800">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Naziv
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">
              Vrijednost
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="py-2 px-4 border-b border-gray-200">
                {item.label}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
