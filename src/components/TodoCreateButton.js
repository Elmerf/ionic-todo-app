import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoCreateButton = () => {
  const { openTodoModal } = useContext(TodoContext);

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton onClick={openTodoModal}>
        <IonIcon icon={pencil}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default TodoCreateButton;
