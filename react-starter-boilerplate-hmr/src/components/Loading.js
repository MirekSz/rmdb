import React from 'react';
import ReactDelayRender from 'react-delay-render';

const Loading = () => <div class="fa-3x  d-flex justify-content-center"><i class="fas fa-spinner fa-spin"></i></div>;

export default ReactDelayRender({ delay: 300 })(Loading);
