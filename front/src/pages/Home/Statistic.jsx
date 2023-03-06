// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  Button, Descriptions, Spin, Typography, Form,
} from 'antd';

const { Text, Title } = Typography;

function Statistic({ isLoading, statistics, onRefresh }) {
  const handleRefresh = () => {
    onRefresh();
  };

  const data = [
    { label: 'Mínima distancia a Bs. As.', value: statistics?.min_distance },
    { label: 'Lugar de la consulta', value: statistics?.min_locale },
    { label: 'Máxima distancia a Bs. As.', value: statistics?.max_distance },
    { label: 'Lugar de la consulta', value: statistics?.max_locale },
    { label: 'Distancia promedio a Bs. As.', value: statistics?.average_distance },
  ];

  return (
    <Form style={{ margin: '5rem' }}>
      <Spin spinning={isLoading} tip="Loading" size="large">
        <Title level={4}>Estadísticas</Title>
        {!statistics || (!Object.keys(statistics).length && (
          <div className="empty-service">
            <Text>
              No hay datos a mostrar!
            </Text>
          </div>
        ))}
        {statistics && (Object.keys(statistics).length && (
          <>
            <Descriptions
              bordered
              column={1}
            >
              {data.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Descriptions.Item key={index} label={item.label}>
                  {item.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
            <br />
            <Button
              loading={isLoading}
              type="primary"
              onClick={handleRefresh}
              block
            >
              Refrescar
            </Button>
          </>
        ))}
      </Spin>
    </Form>
  );
}

export default Statistic;
