# SmartSpend – Personal Finance Manager

A compact full-stack hackathon starter built with Next.js, Java Spring Boot and MySQL.

## Features
- Add and list income/expense transactions
- Delete transactions
- Dashboard totals: income, expenses and balance
- Set a monthly spending budget (currently held in browser state)
- Categorize transactions

## Requirements
- Java 17+
- Maven
- Node.js 18.18+
- MySQL 8+

## 1. Create the database
Open MySQL and run:
```sql
CREATE DATABASE smartspend;
```

## 2. Configure the backend
Open `backend/src/main/resources/application.properties` and replace `YOUR_MYSQL_PASSWORD` with your MySQL password.

From the `backend` folder, run:
```bash
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`.

## 3. Run the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`.

## API endpoints
- `GET /api/transactions` – list all transactions
- `POST /api/transactions` – add a transaction
- `PUT /api/transactions/{id}` – update a transaction
- `DELETE /api/transactions/{id}` – delete a transaction

POST/PUT JSON example:
```json
{
  "title": "Groceries",
  "amount": 1200,
  "type": "EXPENSE",
  "category": "Food",
  "date": "2026-10-31"
}
```

## Notes for the mock hackathon
- The budget input is currently frontend-only; it resets on refresh.
- Authentication and user-specific records are intentionally omitted to keep the project small.
- This is a learning/demo starter, not a production banking application.
