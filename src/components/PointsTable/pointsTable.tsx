import React from 'react';

export interface PointsTableProps {
    userPoints: { [handle: string]: number };
}

const PointsTable: React.FC<PointsTableProps> = ({ userPoints }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-light-blue-200">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Handle
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(userPoints).map(([handle, points]) => (
                        <tr key={handle}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{handle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointsTable;
