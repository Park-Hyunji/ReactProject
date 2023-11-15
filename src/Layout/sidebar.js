import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import TimeTable from '../timetable/TimeTable';
import Quiz from '../Quiz';
import YouTube from '../Youtube';
import TodoList from '../todoList/TodoList';

const { Content, Sider } = Layout;

function getItem(label, key, icon, onClick) {
  return {
    key,
    icon,
    label,
    onClick,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Main');

  useEffect(() => {
    // Update localStorage when selectedOption changes
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    // Reset selectedOption to 'Option 1' when the component mounts
    setSelectedOption('Main');
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const items = [
    getItem('Main', '1', <PieChartOutlined />, () => handleOptionClick('Main')),
    getItem('Video', '2', <DesktopOutlined />, () => handleOptionClick('Video')),
    getItem('Notice', 'sub1', <UserOutlined />, () => handleOptionClick('Notice')),
    getItem('Team', 'sub2', <TeamOutlined />, () => handleOptionClick('Team')),
    getItem('Files', '9', <FileOutlined />, () => handleOptionClick('Files')),
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 'Main':
        return (
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'#cfe1ff' }}>
            <TimeTable />
            <div style={{ marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
              <Quiz style={{ marginRight: '10px' }} />            
              </div>    
              <div style={{ marginLeft: '200px', marginBottom: '450px', display: 'flex', alignItems: 'center' }}>
              <TodoList />
              </div>
</div>

        );
      case 'Video':
        return <YouTube />;
      case 'Notice':
        return <div>User Content</div>;
      case 'Team':
        return <div>Team Content</div>;
      case 'Files':
        return <TodoList />;
      default:
        return null;
    }
  };
  
  
  

  return (
    <Layout style={{ minHeight: '50vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        width={150}
      >
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => item.onClick(item.label)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

