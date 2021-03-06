import React from 'react';
import DinoScript from './DinoScript';
import DinoStyle from './DinoStyle';
import Resources from './Resources';

class ChromeDinoComponent extends React.Component {
  componentDidMount() {
    this.appendDinoScript();

    this.appendRunnerScript();
  }

  appendDinoScript() {
    const dinoScriptContainer = document.createElement('script');
    dinoScriptContainer.appendChild(document.createTextNode(DinoScript));
    this.startDiv.appendChild(dinoScriptContainer);
  }

  appendRunnerScript() {
    const runnerScriptContainer = document.createElement('script');
    runnerScriptContainer.appendChild(document.createTextNode('new Runner(\'.interstitial-wrapper\');'));

    this.endDiv.appendChild(runnerScriptContainer);
  }


  render() {
    return (
      <div ref={(el) => { this.startDiv = el; }}>
        <style>{DinoStyle}</style>
        <div id="main-frame-error" className="interstitial-wrapper">
          <Resources />
          <div ref={(el) => { this.endDiv = el; }} />
        </div>
      </div>
    );
  }
}

export default ChromeDinoComponent;
