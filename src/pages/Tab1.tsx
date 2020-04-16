import React, {useState, useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonIcon, IonButton, IonInput, IonGrid, IonRow, IonCol, IonCard, IonCardContent} from '@ionic/react';
import { phonePortraitOutline } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { set, get } from "../services/localStorage";
import './Tab1.css';

const { Device, Whitelist } = Plugins;

const Tab1: React.FC = () => {
  const [deviceID, setDeviceID] = useState<string>();

  const obtainDeviceID = async () => {
    const info = await Device.getInfo();
    const uuid = info.uuid;
    setDeviceID(uuid);
    set("personDeviceId", uuid);
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Get device ID</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Get device ID</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
              A device ID (device identification) is a distinctive number associated with a smartphone or similar handheld device. This can be used to identify each user.
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
             <IonButton onClick={() => obtainDeviceID()}> 
             <IonIcon slot='start' icon={phonePortraitOutline}></IonIcon>
             Click to Obtain </IonButton>
            </IonCol>
          </IonRow>
          {deviceID && (<IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <h2>{deviceID}</h2>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>)}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;