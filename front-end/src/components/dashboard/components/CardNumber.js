import React from 'react';
import { Card, Icon, Row, Col } from "antd";
import CountUp from 'react-countup'

export const CardNumber = ({ icon, color, title, number, countUp }) => (
  <Card style={{ padding: '32px', 'marginBottom': '24px', cursor: 'pointer' }} bordered={false} bodyStyle={{ padding: 10 }}>

    <Row gutter={48} type="flex" justify="space-around">
      <Col span={12}>
        <Icon style={{ fontSize: '54px', float: 'left', color: `${color}` }} type={icon} />
      </Col>
      <Col span={12} >
        <div>
          <p style={{ lineHeight: '16px', 'fontSize': '16px', 'marginBottom': '8px', 'height': '16px', 'whiteSpace': 'nowrap' }}>{title || 'No title'}</p>
          <p style={{ lineHeight: '32px', 'fontSize': '24px', 'marginBottom': '0', 'height': '32px', textOverflow: 'ellipsis', 'overflow': 'hidden' }}>
            {/* <CountUp
                            start={0}
                            end={number}
                            duration={2.75}
                            useEasing
                            useGrouping
                            separator=","
                            {...countUp || {}}

                        /> */}
          </p>
        </div>


      </Col>
    </Row>

  </Card>
);
