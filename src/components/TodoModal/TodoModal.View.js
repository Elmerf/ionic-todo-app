import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoModalView = ({
  title,
  note,
  tags,
  deadline,
  showDeadline,
  onShowDeadline,
  onChangeTitle,
  onChangeNote,
  onChangeTags,
  onChangeDeadline,
  onSaveTodo,
  resetInputs,
  onDeleteTodo,
}) => {
  const { openModal, closeTodoModal, mode } = useContext(TodoContext);

  return (
    <IonModal
      isOpen={openModal}
      onWillDismiss={() => {
        closeTodoModal();
        resetInputs();
      }}
      initialBreakpoint={0.8}
      breakpoints={[0, 0.8]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{mode === "edit" ? "Edit Todo" : "Add New Todo"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            value={title}
            clearInput
            placeholder="Enter Todo Title"
            onIonChange={(e) => onChangeTitle(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Note</IonLabel>
          <IonInput
            value={note}
            clearInput
            placeholder="Enter Todo Note"
            onIonChange={(e) => onChangeNote(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tags</IonLabel>
          <IonInput
            value={tags.join(", ")}
            clearInput
            placeholder="Enter Tags (separated by coma)"
            onIonChange={(e) => onChangeTags(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Deadline</IonLabel>
          <IonCheckbox
            checked={showDeadline}
            onIonChange={(e) => onShowDeadline(e.detail.checked)}
          ></IonCheckbox>
        </IonItem>
        {showDeadline ? (
          <IonItem>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime"
                value={deadline ?? undefined}
                onIonChange={(e) => onChangeDeadline(e.detail.value)}
              ></IonDatetime>
            </IonModal>
          </IonItem>
        ) : null}
        <IonItem className="ion-padding-bottom">
          <IonRow slot="end">
            <IonButton
              fill="outline"
              expand="block"
              size="default"
              onClick={closeTodoModal}
            >
              Close
            </IonButton>
            {mode === "edit" ? (
              <IonButton
                expand="block"
                size="default"
                color="danger"
                onClick={onDeleteTodo}
              >
                Delete
              </IonButton>
            ) : null}
            <IonButton expand="block" size="default" onClick={onSaveTodo}>
              {mode === "edit" ? "Edit" : "Save"}
            </IonButton>
          </IonRow>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default TodoModalView;
