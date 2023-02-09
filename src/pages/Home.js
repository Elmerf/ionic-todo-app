import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import TodoCreateButton from "../components/TodoCreateButton";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";

import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>My Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <TodoList />
      <TodoCreateButton />
      <TodoModal />
    </IonPage>
  );
};

export default Home;
