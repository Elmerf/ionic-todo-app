import { useContext, useState } from "react";
import TodoModalView from "./TodoModal.View";
import { format, utcToZonedTime } from "date-fns-tz";
import request from "../../lib/request";
import { TodoContext } from "../../context/TodoContext";

const timeWithOffset = (value) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let date;

  if (value) {
    date = new Date(value);
  } else {
    date = new Date();
  }

  const dateISO = date.toISOString();

  const zonedTime = utcToZonedTime(dateISO, userTimeZone);

  return format(zonedTime, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: userTimeZone,
  });
};

const TodoModal = () => {
  const { closeTodoModal, setRefetch } = useContext(TodoContext);

  const [showDeadline, setShowDeadline] = useState(false);
  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);
  const [tags, setTags] = useState([]);
  const [deadline, setDeadline] = useState(null);

  const resetInputs = () => {
    setShowDeadline(false);
    setTitle(null);
    setNote(null);
    setTags([]);
    setDeadline(null);
  };

  const handleShowDeadline = (value) => setShowDeadline(value);
  const handleChangeTitle = (value) => setTitle(value);
  const handleChangeNote = (value) => setNote(value);
  const handleChangeTags = (value) => {
    const valueSplitted = value
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val);

    setTags(valueSplitted);
  };
  const handleChangeDeadline = (value) => setDeadline(timeWithOffset(value));

  const handleSaveTodo = () => {
    request("/todos", {
      method: "POST",
      data: JSON.stringify({
        title,
        note,
        tags,
        deadline,
        is_done: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    }).finally(() => {
      closeTodoModal();
      setRefetch(true);
    });
  };

  return (
    <TodoModalView
      deadline={deadline}
      showDeadline={showDeadline}
      onShowDeadline={handleShowDeadline}
      onChangeTitle={handleChangeTitle}
      onChangeNote={handleChangeNote}
      onChangeTags={handleChangeTags}
      onChangeDeadline={handleChangeDeadline}
      onSaveTodo={handleSaveTodo}
      resetInputs={resetInputs}
    />
  );
};

export default TodoModal;
