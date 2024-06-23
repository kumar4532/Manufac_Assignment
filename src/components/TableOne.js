import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Text, Table} from '@mantine/core'
import "../App.css"

function TableOne() {

    const [myData, setMyData] = useState([])

    useEffect(() => {
        axios.get('data.json').then((res) => {
            setMyData(res.data)
          })
    }, [])

    const calculateAverageYields = (data) => {
        const cropData = {};
        data.forEach(item => {
          const year = parseInt(item.Year.split(', ')[1], 10);
          if (year >= 1950 && year <= 2020) {
            if (!cropData[item["Crop Name"]]) {
              cropData[item["Crop Name"]] = {
                totalYield: 0,
                count: 0
              };
            }
            cropData[item["Crop Name"]].totalYield += item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
            cropData[item["Crop Name"]].count += 1;
          }
        });
      
        const averageYields = Object.keys(cropData).map(cropName => ({
          cropName,
          averageYield: cropData[cropName].totalYield / cropData[cropName].count
        }));
      
        return averageYields;
    };

    const averageYields = calculateAverageYields(myData);

    const calculateAverageCultivationArea = (data) => {
        const cropData = {}

        data.forEach((item) => {
            const year = parseInt(item.Year.split(", ")[1], 10);

            if (year >= 1950 && year <= 2020) {
                if (!cropData[item["Crop Name"]]) {
                    cropData[item["Crop Name"]] = {
                        totalCultivationArea: 0,
                        count: 0
                    }
                }
                cropData[item["Crop Name"]].totalCultivationArea += item["Area Under Cultivation (UOM:Ha(Hectares))"];
                cropData[item["Crop Name"]].count += 1;
            }
        })

        const averageCultivation = Object.keys(cropData).map(cropName => ({
            cropName,
            averageCultivate: cropData[cropName].totalCultivationArea / cropData[cropName].count
        }));
        
        return averageCultivation;
    }

    const averageCultivation = calculateAverageCultivationArea(myData);


    const mergeAverages = (yields, cultivation) => {
        const mergedData = yields.map(yieldItem => {
          const cultivationItem = cultivation.find(item => item.cropName === yieldItem.cropName);
          return {
            cropName: yieldItem.cropName,
            averageYield: yieldItem.averageYield,
            averageCultivation: cultivationItem.averageCultivate
          };
        });
        return mergedData;
      };
      
      // Merge the average data
    const mergedAverages = mergeAverages(averageYields, averageCultivation);

  return (
    <>
    <div>
      <Text className='text'>
        Average Yield for Crops (1950-2020) and Average Cultivation Area of the Crop between (1950-2020)
      </Text>
      <Table className='table'>
        <thead>
          <tr>
            <th className="th">Crop Name</th>
            <th className="th">Average Yield (Kg/Ha)</th>
            <th className="th">Average Cultivation Area (Hectares)</th>
          </tr>
        </thead>
        <tbody>
        {mergedAverages.map((item) => (
            <tr key={item.cropName}>
              <td className="td">{item.cropName}</td>
              <td className="td">{item.averageYield.toFixed(3)}</td>
              <td className="td">{item.averageCultivation.toFixed(3)}</td>
            </tr>
        ))}
        </tbody>
      </Table>
    </div>
    </>
  )
}

export default TableOne;