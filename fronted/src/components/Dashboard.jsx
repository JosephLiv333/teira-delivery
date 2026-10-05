import React from 'react';

export default function Dashboard({ stats }) {
  const cards = [
    { label: 'Total Delivery', count: stats?.total || 0, color: 'bg-blue-600' },
    { label: 'Pendientes', count: stats?.pendientes || 0, color: 'bg-amber-500' },
    { label: 'Entregados', count: stats?.entregados || 0, color: 'bg-emerald-600' },
    { label: 'Cancelados', count: stats?.cancelados || 0, color: 'bg-rose-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`${card.color} text-white rounded-xl p-4 shadow-sm`}>
          <p className="text-xs uppercase font-semibold tracking-wider opacity-90">{card.label}</p>
          <p className="text-3xl font-extrabold mt-1">{card.count}</p>
        </div>
      ))}
    </div>
  );
}