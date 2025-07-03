import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoListDisplay } from "./TodoListDisplay";

const sampleTodos = [
  {
    id: "todo1",
    text: "Visit the Eiffel Tower",
    completed: false,
  },
  {
    id: "todo2",
    text: "Explore the Louvre Museum",
    completed: false,
  },
];

describe("TodoListDisplay Component", () => {
  it("renders todos correctly in view mode", () => {
    render(<TodoListDisplay todos={sampleTodos} mode="view" />);

    expect(screen.getByText(/Visit the Eiffel/i)).toBeInTheDocument();

    expect(screen.getByText(/Explore the Louvre/i)).toBeInTheDocument();

    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(screen.queryByTestId("todo-edit")).toBeNull();
  });

  it("renders todos correctly in plan mode with toggling", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <TodoListDisplay todos={sampleTodos} mode="plan" onToggle={onToggle} />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(sampleTodos.length);
    expect(checkboxes[0]).not.toBeChecked();

    await user.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledWith("todo1");
  });

  it("renders todos correctly in edit mode and handles edit/delete", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const onChange = vi.fn();

    render(
      <TodoListDisplay
        todos={sampleTodos}
        mode="edit"
        onDelete={onDelete}
        onChange={onChange}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    expect(editButtons).toHaveLength(sampleTodos.length);

    const removeButtons = screen.getAllByTitle("Remove todo");
    expect(removeButtons).toHaveLength(sampleTodos.length);

    await user.click(editButtons[0]);

    const editInput = screen.getAllByTestId("todo-edit")[0];

    expect(editInput).toBeInTheDocument();

    expect(screen.queryByText(sampleTodos[0].text)).toBeNull();

    expect(editInput).toHaveValue(sampleTodos[0].text);
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(editInput, {
      target: { value: "Updated Todo" },
    });

    expect(onChange).toHaveBeenCalledWith("todo1", "Updated Todo");
  });
});
