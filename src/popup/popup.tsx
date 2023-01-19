import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
//@ts-ignore
import logo from '../static/assets/Logo.png';
import './styles.css';

export const Popup = ({ data }: { data: any }) => {
  const [selected, setSelected] = useState(Array(data?.length).fill(0));

  const selectAll = () => {
    setSelected((s) => s.map((i) => 1));
  };

  const unselectAll = () => {
    setSelected((s) => s.map((i) => 0));
  };

  const handleSubmit = (e) => {
    const selectedResponse = data.map((item, index) => {
      if (selected[index]) return item.data.name;
    });

    alert(`Response: ${selectedResponse}`);
  };

  return (
    <>
      <header>
        <div className="flex">
          <img height={'60px'} src={logo} alt="VWO Logo" />
        </div>
      </header>
      <section>
        <div>
          <h1 className="heading">Campaign Lists</h1>
        </div>
        <div className="tabs">
          <button onClick={selectAll} className="tab">
            Select All
          </button>
          <button onClick={unselectAll} className="tab">
            Unselect All
          </button>
        </div>
        <div className="container">
          <ul id="campaign-list">
            {data &&
              data.length &&
              data.map((item, index) => {
                return (
                  <li key={index}>
                    <input
                      onClick={() =>
                        setSelected((d) => {
                          d[index] = !d[index];
                          return [...d];
                        })
                      }
                      checked={selected[index]}
                      type={'checkbox'}
                    />
                    <span>{item.data.name}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
      <footer>
        <button onClick={handleSubmit}>Export</button>
      </footer>
    </>
  );
};

const getDetailsFromUrl = (url) => {
  console.log(url);

  const matches = url.match(/\d+/g);
  console.log(matches);

  return { accoutId: matches[0], containerId: matches[1] };
};

const getData = async () => {
  const tabs = await chrome.tabs.query({ active: true });
  const { accoutId, containerId } = getDetailsFromUrl(tabs[0].url);
  console.log(accoutId, containerId);
  const response = await fetch(
    `https://optimize.google.com/api/accounts/${accoutId}/containers/${containerId}/experiments`
  );
  const data = await response.text();
  const parsedData = JSON.parse(data.slice(5))?.default?.experiment;

  const root = document.createElement('div');
  document.body.appendChild(root);
  render(<Popup data={parsedData} />, root);
};

getData();
