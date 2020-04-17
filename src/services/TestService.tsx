import axios from 'axios';
import { Component } from 'react';
import React from 'react';
import { IonHeader, IonApp, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/react';
import { get } from "./localStorage";

class TestService extends Component {
  API_KEY = '211122adf9bf45d5a828f77121bd4498';
  API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`

  state = {
    items: []
  }

  componentDidMount() {
    axios.get(this.API_URL).then(response => response.data)
    .then((data) => {
      this.setState({ items: data.articles })
      console.log(this.state.items)
     }).catch(err => {
        alert(JSON.stringify(err));
        // console.warn(err);
      });
  }
  render() {
    return (
      <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>News App v1.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {this.state.items.map((item) => (
                <IonCard>
                  <img src={item['urlToImage']}/>
                <IonCardHeader>

                <IonCardTitle>
                {item['title']}

                </IonCardTitle>
                 <IonCardSubtitle>
                    {item['author']}
                  </IonCardSubtitle>

                </IonCardHeader>
                <IonCardContent>
                  <p>{item['content']}</p>
                  <IonButton href={item['url']}> Read</IonButton>
                </IonCardContent>
                </IonCard>

      ))}

      </IonContent>
    </IonApp>

    );
  }
}

export default TestService;