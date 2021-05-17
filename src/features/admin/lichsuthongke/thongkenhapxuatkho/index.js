import {
    CCard,
    CCardBody,
    CCardHeader, CCol,
    CRow
} from '@coreui/react';
import {
    CChartPie
} from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';
import pxkApi from 'src/api/pxkAPI';
import FullPageLoader from 'src/views/fullpageloading';

function ChartReport() {

    const [percentPNK, setPercentPNK] = useState(0);
    const [percentPXK, setPercentPXK] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDataReport = async () => {
        setIsLoading(true);
        try {
            await pxkApi.report()
                .then(response => {
                    setPercentPNK(response.percentPNK);
                    setPercentPXK(response.percentPXK);
                    setIsLoading(false);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDataReport();
    }, [])

    return (
        <>
            {isLoading ? <FullPageLoader /> :
                <CRow>
                    <CCol sm="12" xl="12">
                        <CCard>
                            <CCardHeader>
                                Thống kê nhập xuất kho
                    </CCardHeader>
                            <CCardBody>
                                <CChartPie
                                    datasets={[
                                        {
                                            backgroundColor: [
                                                '#41B883',
                                                '#E46651'
                                            ],
                                            data: [percentPNK, percentPXK]
                                        }
                                    ]}
                                    labels={['Nhập kho', 'Xuất kho']}
                                    options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            }

        </>
    );
}

export default ChartReport;