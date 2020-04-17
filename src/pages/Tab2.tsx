import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close, eye } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import { set } from "../services/localStorage";
import { isPlatform } from '@ionic/react';
import { useFilesystem } from '@ionic/react-hooks/filesystem';

const Tab2: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const { readFile } = useFilesystem();

  const submitPhoto = async (photo:Photo) => {
    let photoSelBase64;
    //save image to local storage
    if (isPlatform('hybrid')) {
      
      // photoSelBase64 = await base64FromPath(photo.filepath!);
      const file = await readFile({
        path: photo.filepath!
      });
      photoSelBase64 = file.data;
    } else {
      photoSelBase64 = photo.base64;
    }
    set("selectedPhoto", photoSelBase64);

    //TODO: navigate to tab 3
    // return 
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          },
          {
            text: 'Select',
            role: 'destructive',
            icon: eye,
            handler: () => {
              if (photoToDelete) {
                submitPhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }
          ,{
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};

export default Tab2;