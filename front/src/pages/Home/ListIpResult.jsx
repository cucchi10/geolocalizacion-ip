import { List, Divider } from 'antd';

function ListIpResult({ ipInfo }) {
  const {
    ip, currentDate, country, isoCode, languages, currency, zoneTimes, distanceEstimated,
  } = ipInfo || {};

  const isValidData = !!ip;

  const data = [
    { label: 'IP', value: ip },
    { label: 'Fecha actual', value: currentDate },
    { label: 'País', value: country },
    { label: 'ISO Code', value: isoCode },
    { label: 'Idiomas', value: languages },
    { label: 'Moneda', value: currency },
    { label: 'Hora', value: zoneTimes },
    { label: 'Distancia a Buenos Aires', value: distanceEstimated },
  ];

  const renderIpInfo = () => (
    <>
      <Divider>Resultado de la IP: {ip}</Divider>
      <List
        bordered
        dataSource={data}
        renderItem={({ label, value }) => (
          <List.Item>
            <List.Item.Meta title={label} description={value} />
          </List.Item>
        )}
      />
    </>
  );

  return isValidData ? renderIpInfo() : null;
}

export default ListIpResult;
