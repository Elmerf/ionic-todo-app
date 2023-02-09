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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoModalView = ({
  deadline,
  showDeadline,
  onShowDeadline,
  onChangeTitle,
  onChangeNote,
  onChangeTags,
  onChangeDeadline,
  onSaveTodo,
  resetInputs,
}) => {
  const { openModal, closeTodoModal } = useContext(TodoContext);

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
          <IonTitle>Add New Todo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            clearInput
            placeholder="Enter Todo Title"
            onIonChange={(e) => onChangeTitle(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Note</IonLabel>
          <IonInput
            clearInput
            placeholder="Enter Todo Note"
            onIonChange={(e) => onChangeNote(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tags</IonLabel>
          <IonInput
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
          <IonButton
            slot="end"
            fill="outline"
            expand="block"
            className="ion-no-margin"
            size="default"
            onClick={closeTodoModal}
          >
            Close
          </IonButton>
          <IonButton
            slot="end"
            expand="block"
            className="ion-margin-left"
            size="default"
            onClick={onSaveTodo}
          >
            Simpan
          </IonButton>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default TodoModalView;
