import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { Card, Elevation, Callout, Intent } from '@blueprintjs/core';

export default function HomePage() {
  const { t } = useTranslation();
  const logoStyle = { height: '60px', margin: '20px' };

  return (
    <>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '20px' }}>
            <Card interactive elevation={Elevation.TWO} className="bp3-running-text">
              <h1 style={{ marginTop: 0 }}>{t('home.welcome.title')}</h1>
              <Trans i18nKey="home.welcome.message" />
            </Card>
          </div>
          <div style={{ flex: 1, padding: '20px' }}>
            <Callout title={t('home.warning.title')} intent={Intent.PRIMARY}>
              <Trans i18nKey="home.warning.message" />
            </Callout>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            marginTop: 30
          }}
        >
          <img style={logoStyle} src="assets/logos/gabon.png" alt="Parcs Gabon" />
          <img style={logoStyle} src="assets/logos/iret.png" alt="IRET" />
          <img style={logoStyle} src="assets/logos/panthera.png" alt="Panthera" />
          <img style={logoStyle} src="assets/logos/stirling.png" alt="University of Stirling" />
          <div style={{ ...logoStyle, textAlign: 'center' }}>
            <img
              style={{ height: '47px', display: 'block', margin: 'auto' }}
              src="assets/logos/ue.png"
              alt="European Union"
            />
            <span style={{ fontSize: '13px' }}>ECOFAC6</span>
          </div>
          <img
            style={logoStyle}
            src="assets/logos/appsilon.png"
            alt="Appsilon - technology partner"
          />
        </div>
      </div>
    </>
  );
}
