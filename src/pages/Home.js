import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import "./Home.css";

const Home = () => {
  const { getTodos } = useContext(TodoContext);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>My Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {getTodos() &&
          getTodos().map((todo) => (
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>
                  {todo.deadline
                    ? new Date(todo.deadline).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "long",
                      })
                    : "Tidak ada deadline"}
                </IonCardSubtitle>
                <IonCardTitle>{todo.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{todo.note ?? "Tidak ada note"}</p>
                <IonGrid
                  className="ion-no-padding"
                  style={{ "--ion-grid-padding": "4px" }}
                >
                  <IonRow className="ion-align-items-center ion-margin-top">
                    <IonCol size="auto">Tags:</IonCol>
                    {todo.tags.map((tag) => (
                      <IonCol size="auto">
                        <IonChip>{tag}</IonChip>
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
