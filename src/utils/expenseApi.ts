const EXPENSE_API_ENDPOINT = "http://localhost:8080/api";

export async function getCategories(): Promise<Response> {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function signup(authData: {
  email: string;
  password: string;
}): Promise<Response> {
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

export async function login(authData: {
  email: string;
  password: string;
}): Promise<Response> {
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

export async function logout(): Promise<Response> {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response;
}
export async function fetchExpenses(): Promise<Response> {
  const response = await fetch(`${EXPENSE_API_ENDPOINT}/expenses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function createExpense(expenseData: {
  title: string;
  value: number;
  categoryId: number;
}): Promise<Response> {
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

export async function updateExpense(
  body: { title: string; value: number; categoryId: number },
  expenseId: number
) {
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

export async function deleteExpense(expenseId: number) {
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
