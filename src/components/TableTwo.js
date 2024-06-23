import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Text, Table } from '@mantine/core'
import "../App.css"

function TableTwo() {

    const [myData, setMyData] = useState([])

    useEffect(() => {
        axios.get('data.json').then((res) => {
            setMyData(res.data)
          })
    }, [])

    const calculateMaxMinProduction = (data) => {
        const yearData = {};
      
        data.forEach(item => {
          const year = item.Year.split(', ')[1];
          if (!yearData[year]) {
            yearData[year] = {
              maxProduction: { cropName: '', production: -Infinity },
              minProduction: { cropName: '', production: Infinity }
            };
          }
      
          const production = item["Crop Production (UOM:t(Tonnes))"];
      
          if (production > yearData[year].maxProduction.production) {
            yearData[year].maxProduction = { cropName: item["Crop Name"], production };
          }
      
          if (production < yearData[year].minProduction.production) {
            yearData[year].minProduction = { cropName: item["Crop Name"], production };
          }
        });
      
        return yearData;
      };
      
      // Calculate max and min production for each year
      const maxMinProductionData = calculateMaxMinProduction(myData);

  return (
    <div>
      <Text className='text'>
        Max and Min Production Crops for Each Year
      </Text>
      <Table className='table'>
        <thead>
          <tr>
            <th className='th'>Year</th>
            <th className='th'>Crop With Maximum Production In That Year</th>
            <th className='th'>Crop With Minimum Production In That Year</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(maxMinProductionData).map((year) => {
            const { maxProduction, minProduction } = maxMinProductionData[year];
            return (
              <tr key={year}>
                <td className='td'>{year}</td>
                <td className='td'>{maxProduction.cropName}</td>
                <td className='td'>{minProduction.cropName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default TableTwo;