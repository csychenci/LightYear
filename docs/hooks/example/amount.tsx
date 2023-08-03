import React, { ReactElement } from 'react';
const data = [
  {
    id: '1',
    name: 'Kennedy',
    job: 'Chief Mobility Orchestrator',
    city: 'North Alec',
  },
  {
    id: '2',
    name: 'Lucius',
    job: 'Internal Research Manager',
    city: 'Littleland',
  },
  {
    id: '3',
    name: 'Carlos',
    job: 'Lead Configuration Analyst',
    city: 'South Lillian',
  },
  {
    id: '4',
    name: 'Urban',
    job: 'Chief Operations Agent',
    city: 'Shieldshaven',
  },
  {
    id: '5',
    name: 'Katrine',
    job: 'Legacy Solutions Orchestrator',
    city: 'South Kyleigh',
  },
  {
    id: '6',
    name: 'Kennedi',
    job: 'Global Assurance Developer',
    city: 'East Jaunitaville',
  },
  {
    id: '7',
    name: 'Mariah',
    job: 'Forward Functionality Administrator',
    city: 'West Kody',
  },
  {
    id: '8',
    name: 'Danika',
    job: 'Forward Applications Developer',
    city: 'Lake Max',
  },
  {
    id: '9',
    name: 'Freeda',
    job: 'Legacy Tactics Officer',
    city: 'North Brandonview',
  },
  {
    id: '10',
    name: 'Lila',
    job: 'Future Research Coordinator',
    city: 'South Helenabury',
  },
];


const ListMore: React.FC<{
  renderItem: (item: object, index: number, data: any[]) => void,
  data: object[]
}> = ({
  renderItem,
  data
}) => {
    const elements = data.map((item: object, index: number) => renderItem(item, index, data));
    return <>
      {elements}
    </>
  }

export default () => {
  return <div className="user-list">
    <div
      style={{ display: 'grid', gridTemplateColumns: '80px 160px 280px', fontWeight: 'blod' }}
      className="user-list-row user-list-row-head"
    >
      <span style={{ border: '1px solid #eee', padding: '5px' }} className="user-name-cell">
        Name
      </span>
      <span style={{ border: '1px solid #eee', padding: '5px' }}>City</span>
      <span style={{ border: '1px solid #eee', padding: '5px' }}>Job Title</span>
    </div>
    <ListMore
      renderItem={(user:any, index) => {
        return (
          <div
            style={{ display: 'grid', gridTemplateColumns: '80px 160px 280px' }}
            key={index}
            className="user-list-row"
          >
            <span
              style={{ border: '1px solid #eee', padding: '5px' }}
              className="user-name-cell"
            >
              {user.name}
            </span>
            <span style={{ border: '1px solid #eee', padding: '5px' }}>{user.city}</span>
            <span style={{ border: '1px solid #eee', padding: '5px' }}>{user.job}</span>
          </div>
        );
      }}
      data={data}
    />
  </div>
}