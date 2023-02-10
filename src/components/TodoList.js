import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonRippleEffect,
  IonRow,
} from "@ionic/react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
  const { getTodos, openTodoModal } = useContext(TodoContext);

  return (
    <IonContent fullscreen className="ion-padding">
      {getTodos().map((todo, index) => (
        <IonCard
          id={todo.id}
          className="ion-activatable"
          style={{ position: "relative" }}
          key={todo.id}
          onClick={() => openTodoModal(todo.id)}
        >
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
            <p>{todo.note ? todo.note : "Tidak ada note"}</p>
            <IonGrid
              className="ion-no-padding"
              style={{ "--ion-grid-padding": "4px" }}
            >
              <IonRow className="ion-align-items-center ion-margin-top">
                <IonCol size="auto">Tags:</IonCol>
                {todo.tags.map((tag, index) => (
                  <IonCol size="auto" key={index}>
                    <IonChip>{tag}</IonChip>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
          <IonRippleEffect></IonRippleEffect>
        </IonCard>
      ))}
    </IonContent>
  );
};

export default TodoList;
