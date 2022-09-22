import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="clearfix">
        <div className="spinner-border float-end" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
}

export default Loading;
