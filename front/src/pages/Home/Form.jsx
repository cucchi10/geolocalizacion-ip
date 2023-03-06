/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';

const { Title } = Typography;

function FormIp({
  isLoading, searchIp
}) {
  const [ip, setIp] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleIpChange = (event) => {
    const { value } = event.target;
    setIp(value);
    setIsButtonDisabled(!value);
  };

  const handleButtonClick = () => {
    searchIp(ip)
  };

  useEffect(()=>{
    if(!isLoading){
      handleIpChange({target: { value: ''}})
    }
  },[isLoading])

  return (
    <Form style={{ margin: '5rem' }} name="form" className="ip-form">
      <Title level={4}>Ingrese una IP</Title>
      <Form.Item
        style={{ margin: '1rem' }}
        label="IP"
        name="ip"
        value={ip}
        onChange={handleIpChange}
        rules={[
          {
            required: true,
            message: 'No es una IP valida!',
            pattern:
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
              || /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/
              || /^(?!255\.255\.255\.255$)$/
              || /^(?!0\.0\.0\.0$)$/,
          },
        ]}
      >
        <Input style={{ maxWidth: '500px' }} placeholder="Escriba una IP"/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          style={{ marginLeft: '1rem' }}
          loading={isLoading}
          type="primary"
          htmlType="submit"
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          Localizar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormIp;
