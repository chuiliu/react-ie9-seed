import React from 'react';
import './About.less';
import icon from '@/img/location.png';
import cat from '@/img/cat.jpg';

export default (props) => (
  <div>
    <img src={cat} alt="" width="120" />
    {/* <img src={icon} alt=""/> */}
    <h2>About page</h2>
  </div>
);

