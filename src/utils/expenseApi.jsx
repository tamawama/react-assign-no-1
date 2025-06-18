const EXPENSE_API_ENDPOINT = "http://localhost:8080/api";

export async function getCategories() {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function signup(authData) {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  return response;
}

export async function login(authData) {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  return response;
}

export async function logout() {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response;
}
export async function fetchExpenses() {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/expenses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function getExpense(expenseId) {}

export async function createExpense(expenseData) {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/expenses`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  return response;
}

export async function updateExpense({ body, expenseId }) {
  const response = await fetch(
    `${EXPENSE_API_ENDPOINT}/expenses/${expenseId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return response;
}

export async function deleteExpense(expenseId) {
  const response = await fetch(
    `${EXPENSE_API_ENDPOINT}/expenses/${expenseId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
