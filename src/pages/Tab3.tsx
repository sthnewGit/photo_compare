import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CompareService from '../components/CompareService';
import TestService from '../components/TestService';
import { get } from "../services/localStorage";
import { phonePortraitOutline } from 'ionicons/icons';
import './Tab3.css';
import axios from 'axios';

const Tab3: React.FC<{ imagePath: string }> = props => {

  const [items, setItems] = React.useState([]);
  let theDeviceId = null;
  let deviceID: string = '';
  let photo = null;
  let photobase64: string = '';

  const getPhotoComparison = async () => {
    theDeviceId = await get("personDeviceId");
    deviceID = theDeviceId.value;
    alert(deviceID);
    photo = await get("selectedPhoto");
    photobase64 = photo.value;
    callwebservice();
  }


  const callwebservice = async () => {
    const postData = {
      imageValue: photobase64,
      deviceId: deviceID
    }
  
    const config = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }
    let API_URL = 'http://18.204.37.91:32600/photo/identify/';
    axios.post(API_URL, postData, config)
      .then(response => {
        setItems(response.data);
      })
      .catch(err => {
        alert(JSON.stringify(err));
        // console.warn(err);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Let's compare photo!{props.imagePath} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={() => getPhotoComparison()}>
          <IonIcon slot='start' icon={phonePortraitOutline}></IonIcon>
             Click to Recognize </IonButton>
        {items.map((item) => (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {item['name']}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{item['confidence']}</p>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
