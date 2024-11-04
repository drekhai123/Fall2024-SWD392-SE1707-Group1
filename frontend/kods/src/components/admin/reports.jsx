import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const StatisticsReport = () => {
  // Sample statistics data
  const statisticsData = [
    {
      title: 'Total Sales',
      value: 1200,
      change: 30,
      trend: 'up',
    },
    {
      title: 'Total Customers',
      value: 800,
      change: -10,
      trend: 'down',
    },
    {
      title: 'Total Orders',
      value: 600,
      change: 50,
      trend: 'up',
    },
    {
      title: 'Total Revenue',
      value: 15000,
      change: 200,
      trend: 'up',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2>Statistics Report</h2>
      <Row gutter={16}>
        {statisticsData.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.trend === 'up' ? '#3f8600' : '#cf1322' }}
                prefix={stat.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix={stat.trend === 'up' ? `+${stat.change}` : `${stat.change}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatisticsReport;