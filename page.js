"use client";

import { useEffect, useState } from "react";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`;
const money = n => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function Home() {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(25000);
  const [form, setForm] = useState({
    title: "", amount: "", type: "EXPENSE", category: "Food",
    date: new Date().toISOString().slice(0, 10)
  });

  async function load() {
    const res = await fetch(API);
    setItems(await res.json());
  }
  useEffect(() => { load().catch(() => alert("Start Spring Boot and MySQL first.")); }, []);

  const income = items.filter(x => x.type === "INCOME").reduce((s, x) => s + Number(x.amount), 0);
  const expenses = items.filter(x => x.type === "EXPENSE").reduce((s, x) => s + Number(x.amount), 0);

  async function add(e) {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) })
    });
    if (!res.ok) return alert("Could not save transaction");
    setForm({ ...form, title: "", amount: "" });
    load();
  }

  async function remove(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  }

  return <main className="wrap">
    <header><div><p className="tag">PERSONAL FINANCE</p><h1>SmartSpend</h1>
      <p className="muted">Know where your money goes.</p></div>
      <span className="pill">My dashboard</span></header>

    <section className="cards">
      <article><p>Total income</p><h2 className="green">{money(income)}</h2></article>
      <article><p>Total expenses</p><h2 className="red">{money(expenses)}</h2></article>
      <article><p>Available balance</p><h2>{money(income - expenses)}</h2></article>
    </section>

    <section className="budget">
      <div><p className="muted">Monthly spending budget</p><h2>{money(expenses)} <small>/ {money(budget)}</small></h2></div>
      <label>Set budget <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))}/></label>
      <div className="bar"><div style={{width: `${Math.min(expenses / Math.max(budget, 1) * 100, 100)}%`}} /></div>
      <p className="muted">{budget > 0 ? Math.round(expenses / budget * 100) : 0}% of budget used</p>
    </section>

    <section className="panel">
      <h2>Add transaction</h2>
      <form onSubmit={add}>
        <input placeholder="Description" required value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}/>
        <input type="number" min="1" step="0.01" placeholder="Amount" required value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}/>
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="EXPENSE">Expense</option><option value="INCOME">Income</option>
        </select>
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {["Food", "Travel", "Shopping", "Bills", "Salary", "Other"].map(c => <option key={c}>{c}</option>)}
        </select>
        <input type="date" required value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}/>
        <button>Add transaction</button>
      </form>
    </section>

    <section className="panel">
      <div className="row"><h2>Recent transactions</h2><span className="muted">{items.length} records</span></div>
      {items.length === 0 ? <p className="muted">No transactions yet. Add your first one above.</p> :
        <div className="table">
          {items.slice().sort((a,b) => b.date.localeCompare(a.date)).map(x =>
            <div className="item" key={x.id}>
              <div><b>{x.title}</b><p className="muted">{x.category} · {x.date}</p></div>
              <strong className={x.type === "INCOME" ? "green" : "red"}>
                {x.type === "INCOME" ? "+" : "-"}{money(x.amount)}
              </strong>
              <button className="delete" onClick={() => remove(x.id)}>Delete</button>
            </div>)}
        </div>}
    </section>
    <footer>SmartSpend · Built with Next.js, Spring Boot and MySQL</footer>
  </main>;
}
