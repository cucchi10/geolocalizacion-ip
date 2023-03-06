// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
  Layout, Typography, notification, Row, Col,
} from 'antd';
import NavBar from '../../components/NavBar';
import FormIp from './Form';
import ListIpResult from './ListIpResult';
import Statistic from './Statistic';
import '../../utils/styles/Home.css';

import UseIpInfo from '../../services/UseIpInfo';
import useStatistic from '../../services/useStatistic';

const { Content } = Layout;
const { Title } = Typography;

function Home() {
  const [showNotification, NotificationProvider] = notification.useNotification();
  const notificationError = (message = 'Error al obtener datos') => {
    showNotification.error({ message });
  };

  const [ipInfo, setIpInfo] = useState();
  const [statistics, setStatistic] = useState();

  const { searchIp, isLoading: isLoadingIp } = UseIpInfo((data) => {
    setIpInfo(data);
  }, (error) => notificationError(error?.data));

  const { getStatistic, isLoading: isLoadingStatistic } = useStatistic((data) => {
    setStatistic(data);
  }, (error) => notificationError(error?.data));

  const loadData = () => {
    getStatistic();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout className="Layout">
      {NotificationProvider}
      <NavBar />
      <Content style={{ padding: '50px' }}>
        <Title level={3}>Geolocalización de IP</Title>
        <div className="card" style={{ minWidth: '500px' }}>
          <Row style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            <Col>
              <FormIp isLoading={isLoadingIp} searchIp={searchIp}/>
            </Col>
            <Col>
              <Statistic isLoading={isLoadingStatistic} statistics={statistics} onRefresh={loadData} />
            </Col>
          </Row>
          <ListIpResult ipInfo={ipInfo} />
        </div>
      </Content>
    </Layout>
  );
}

export default Home;
