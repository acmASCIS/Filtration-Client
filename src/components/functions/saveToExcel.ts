import XLSX from 'sheetjs-style';

export const saveToExcel = (data: any, fileName: string) => {
    const transformedData = Object.entries(data).map(([handle, points]) => {
        return {
            handle,
            points
        }
    }
    )
    
      const ws = XLSX.utils.json_to_sheet(transformedData);
    
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      XLSX.writeFile(wb, `${fileName}.xlsx`);
}
