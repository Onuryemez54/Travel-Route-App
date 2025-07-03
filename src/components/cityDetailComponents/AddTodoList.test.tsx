import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { AddTodoList } from "./AddTodoList";
import { createTestStore } from "../../test/mocks/testStore";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderWithStore = (): ReturnType<typeof createTestStore> => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <AddTodoList />
      </BrowserRouter>
    </Provider>
  );

  return store;
};

describe("AddTodoList component", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = renderWithStore();
  });

  it("renders TodoForm", () => {
    const todoForm = screen.getByTestId("todo-form");
    expect(todoForm).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Add a new todo...");
    expect(input).toBeInTheDocument();
  });

  it("has correct currentCity and user in store", () => {
    const user = store.getState().auth.currentUser;
    expect(user).toBeDefined();
    expect(user?.id).toBe("12345");

    const currentCity = store.getState().cities.currentCity;
    expect(currentCity).toBeDefined();
    expect(currentCity?.id).toBe("3");

    expect(currentCity?.todoList).toHaveLength(2);

    const saveTodosButton = screen.getByRole("button", {
      name: "Save Todos",
    });
    expect(saveTodosButton).toBeInTheDocument();
  });

  it("adds a new todo on screen", async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    const newTodo = screen.getByText("New Todo");
    expect(newTodo).toBeInTheDocument();
  });

  it("delete a todo on screen", async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getAllByTitle("Remove todo")[2];
    user.click(deleteButton);

    const newTodo = screen.queryByText("New Todo");

    await waitFor(() => {
      expect(newTodo).not.toBeInTheDocument();
    });
  });
});
